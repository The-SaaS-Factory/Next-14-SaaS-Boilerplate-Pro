"use client";
import React, { useState } from "react";

export default function BankAccountPage() {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState();

  return (
    <div className="container">
      <div className="banner">
        <h2>Rocket Rides</h2>
      </div>
      <div className="content">
        {!connectedAccountId && <h2>Get ready for take off</h2>}
        {!connectedAccountId && (
          <p>
            Rocket Rides is the world's leading air travel platform: join our
            team of pilots to help people travel faster.
          </p>
        )}
        {connectedAccountId && (
          <h2>Add information to start accepting money</h2>
        )}
        {connectedAccountId && (
          <p>
            Matt's Mats partners with Stripe to help you receive payments while
            keeping your personal and bank details secure.
          </p>
        )}
        {!accountCreatePending && !connectedAccountId && (
          <button
            onClick={async () => {
              setAccountCreatePending(true);
              setError(false);
              fetch("/api/stripe/connect", {
                method: "POST",
              })
                .then((response) => response.json())
                .then((json) => {
                  setAccountCreatePending(false);

                  const { account, error } = json;

                  if (account) {
                    setConnectedAccountId(account);
                  }

                  if (error) {
                    setError(true);
                  }
                });
            }}
          >
            Create an account!
          </button>
        )}
        {connectedAccountId && !accountLinkCreatePending && (
          <button
            onClick={async () => {
              setAccountLinkCreatePending(true);
              setError(false);
              fetch("/api/account_link", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  account: connectedAccountId,
                }),
              })
                .then((response) => response.json())
                .then((json) => {
                  setAccountLinkCreatePending(false);

                  const { url, error } = json;
                  if (url) {
                    window.location.href = url;
                  }

                  if (error) {
                    setError(true);
                  }
                });
            }}
          >
            Add information
          </button>
        )}
        {error && <p className="error">Something went wrong!</p>}
        {(connectedAccountId ||
          accountCreatePending ||
          accountLinkCreatePending) && (
          <div className="dev-callout">
            {connectedAccountId && (
              <p>
                Your connected account ID is:{" "}
                <code className="bold">{connectedAccountId}</code>
              </p>
            )}
            {accountCreatePending && <p>Creating a connected account...</p>}
            {accountLinkCreatePending && <p>Creating a new Account Link...</p>}
          </div>
        )}
        <div className="info-callout">
          <p>
            This is a sample app for Stripe-hosted Connect onboarding.{" "}
            <a
              href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted"
              target="_blank"
              rel="noopener noreferrer"
            >
              View docs
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
