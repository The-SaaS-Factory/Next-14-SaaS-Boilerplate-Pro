"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { Tag } from "../ui/Tag";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { useSectionStore } from "../ui/SectionProvider";
import { remToPx } from "@/lib/remToPx";

interface NavigationSection {
  sectionName: string;
  items: NavigationItem[];
}

type NavigationItem = {
  name: string;
  href: string;
  icon: any;
  current: boolean;
};

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
  children: ReactNode;
  tag?: string;
  active?: boolean;
  isAnchorLink?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "flex justify-between gap-2 py-1 pr-3 text-sm transition",
        isAnchorLink ? "pl-7" : "pl-4",
        active
          ? "text-zinc-900 dark:text-white"
          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      )}
    >
      <div className="flex gap-2">{children}</div>

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
  group: NavigationSection;
  pathname: string;
}) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation()
  );

  const pathName = usePathname();
  let seg = pathName.split("/");
  let pathNameWithoutLand = "/" + seg.slice(2).join("/");

  let isPresent = useIsPresent();
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: "_top" }, ...sections].findIndex(
      (section) => section.id === visibleSections[0]
    )
  );
  let itemHeight = remToPx(2);
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight;
  let top =
    group.items.findIndex((link) => link.href === pathNameWithoutLand) *
      itemHeight +
    firstVisibleSectionIndex * itemHeight;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  );
}

function ActivePageMarker({
  group,
  pathname,
}: {
  group: NavigationSection;
  pathname: string;
}) {
  const searchParams = useSearchParams();

  let seg = pathname.split("/");
  let pathNameWithoutLand = "/" + seg.slice(2).join("/");
  const fullPath = `${pathNameWithoutLand}${
    searchParams.toString() !== "" ? "?" : ""
  }${searchParams.toString()}`;

  let itemHeight = remToPx(2);
  let offset = remToPx(0.25);
  let activePageIndex = group.items.findIndex((link) => link.href === fullPath);

  let top = offset + activePageIndex * itemHeight;

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-[#4437cd]"
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
  group: NavigationSection;
  className?: string;
}) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation();
  let [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation
  );

  const pathName = usePathname();
  const searchParams = useSearchParams();

  let seg = pathName.split("/");
  let pathNameWithoutLand = "/" + seg.slice(2).join("/");

  const fullPath = `${pathNameWithoutLand}${
    searchParams.toString() !== "" ? "?" : ""
  }${searchParams.toString()}`;

  let isActiveGroup =
    group.items.findIndex((link) => link.href === fullPath) !== -1;

  return (
    <li className={clsx("relative mt-6", className)}>
      <Link
        href={group.items[0].href}
        className="flex gap-2 items-center cursor-pointer"
      >
        <motion.h2
          layout="position"
          className="text-xs font-semibold text-zinc-900 dark:text-white"
        >
          {group.sectionName}
        </motion.h2>
      </Link>

      {isActiveGroup && (
        <AnimatePresence key={`menu-${group.sectionName}`}>
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
                  <VisibleSectionHighlight group={group} pathname={fullPath} />
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
                    <NavLink href={link.href} active={link.href === fullPath}>
                      <>
                        <link.icon className="h-5 w-5 shrink-0 text-primary-hover"></link.icon>
                        <span className="truncate"> {link.name}</span>
                      </>
                    </NavLink>
                    <AnimatePresence mode="popLayout" initial={false}>
                      {link.href === fullPath && sections.length > 0 && (
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
  );
}

const Navigation = ({ navigation }: { navigation: NavigationSection[] }) => {
  const pathName = usePathname();
  let seg = pathName.split("/");
  let pathNameWithoutLand = "/" + seg.slice(2).join("/");
  const [links, setLinks] = useState<NavigationSection[]>([]);
  console.log(pathNameWithoutLand);

  useEffect(() => {
    const linksWithStatus = navigation.map((section) => {
      return {
        ...section,
        items: section.items.map((item) => {
          return {
            ...item,
            current: item.href === location.pathname,
          };
        }),
      };
    });

    setLinks(linksWithStatus);
  }, [navigation, pathName]);

  return (
    <li>
      <ul role="list" className="space-y-4">
        {links.map((section, index) => (
          <NavigationGroup
            key={`menu-group-${section.sectionName}`}
            group={section}
            className={index === 0 ? "md:mt-0" : ""}
          />
        ))}
      </ul>
    </li>
  );
};

export default Navigation;
