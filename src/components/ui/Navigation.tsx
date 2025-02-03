"use client";

import React, {
  ForwardRefExoticComponent,
  SVGProps,
  createContext,
  useContext,
  useRef,
} from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { Tag } from "./commons/Tag";
import { useSectionStore } from "./SectionProvider";
import { remToPx } from "@/utils/facades/frontendFacades/remToPx";

interface NavGroup {
  sectionName: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>;
  items: NavItems[];
}

interface NavItems {
  name: string;
  href: string;
}

const IsInsideMobileNavigationContext = createContext(false);

export function useIsInsideMobileNavigation() {
  return useContext(IsInsideMobileNavigationContext);
}

function useInitialValue<T>(value: T, condition = true) {
  let initialValue = useRef(value).current;
  return condition ? initialValue : value;
}

function NavLink({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
}: {
  href: string;
  children: React.ReactNode;
  tag?: string;
  active?: boolean;
  isAnchorLink?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "text-primary flex justify-between gap-2 py-1 pr-3 transition",
        isAnchorLink ? "pl-7" : "pl-4",
        active
          ? "text-zinc-900 dark:text-white"
          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </Link>
  );
}

function VisibleSectionHighlight({
  group,
}: {
  group: NavGroup;
  pathname: string;
}) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation(),
  );

  const pathName = usePathname();

  let isPresent = useIsPresent();
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: "_top" }, ...sections].findIndex(
      (section) => section.id === visibleSections[0],
    ),
  );
  let itemHeight = remToPx(2);
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight;
  let top =
    group.items.findIndex((link) => link.href === pathName) * itemHeight +
    firstVisibleSectionIndex * itemHeight;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="bg-zinc-800/2.5 dark:bg-white/2.5 absolute inset-x-0 top-0 will-change-transform"
      style={{ borderRadius: 8, height, top }}
    />
  );
}

function ActivePageMarker({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  let itemHeight = remToPx(2);
  let offset = remToPx(0.25);
  const searchParams = useSearchParams();
  const paramsInSearch = searchParams.toString();
  const fullPath = pathname + (paramsInSearch && "?") + paramsInSearch;
  let activePageIndex = group.items.findIndex((link) => link.href === fullPath);
  let top = offset + activePageIndex * itemHeight;

  return (
    <motion.div
      layout
      className="bg-primary absolute left-2 h-6 w-px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  );
}

function NavigationGroup({
  group,
  className,
}: {
  group: NavGroup;
  className?: string;
}) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation();

  const sections = [];
  const pathname = usePathname();

  let isActiveGroup =
    group.items.findIndex((link) => link.href === pathname) !== -1;

  return (
    <>
      <li className={clsx("relative mt-6", className)}>
        <Link
          href={group.href}
          className="flex cursor-pointer items-center gap-2"
        >
          <group.icon className="size-5"></group.icon>

          <motion.h2
            layout="position"
            className="text-primary font-semibold text-zinc-900 dark:text-white"
          >
            {group.sectionName}
          </motion.h2>
        </Link>

        {isActiveGroup && (
          <AnimatePresence key={`menu-${group.href}`}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
              }}
            >
              <div className="relative mt-3 pl-2">
                <AnimatePresence initial={!isInsideMobileNavigation}>
                  {isActiveGroup && (
                    <VisibleSectionHighlight
                      group={group}
                      pathname={pathname}
                    />
                  )}
                </AnimatePresence>
                <motion.div
                  layout
                  className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
                />
                <AnimatePresence initial={false}>
                  {isActiveGroup && (
                    <ActivePageMarker group={group} pathname={pathname} />
                  )}
                </AnimatePresence>
                <ul role="list" className="border-l border-transparent">
                  {group.items.map((link) => (
                    <motion.li
                      key={"nav-link" + link.href}
                      layout="position"
                      className="relative"
                    >
                      <NavLink href={link.href} active={link.href === pathname}>
                        {link.name}
                      </NavLink>
                      <AnimatePresence mode="popLayout" initial={false}>
                        {link.href === pathname && sections.length > 0 && (
                          <motion.ul
                            role="list"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                              transition: { delay: 0.1 },
                            }}
                            exit={{
                              opacity: 0,
                              transition: { duration: 0.15 },
                            }}
                          >
                            {sections.map((section) => (
                              <li key={section.id}>
                                <NavLink
                                  href={`${link.href}#${section.id}`}
                                  tag={section.tag}
                                  isAnchorLink
                                >
                                  {section.title}
                                </NavLink>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </li>
    </>
  );
}

export function Navigation({ navigation }: { navigation: any[] }) {
  return (
    <nav>
      <ul role="list">
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={`menu-group-${group.sectionName}`}
            group={group}
            className={groupIndex === 0 ? "md:mt-0" : ""}
          />
        ))}
      </ul>
    </nav>
  );
}
