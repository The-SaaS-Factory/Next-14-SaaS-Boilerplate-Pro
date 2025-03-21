import fetch from "node-fetch";
const loopsEnabled = process.env.LOOPS_ENABLED;
const loopsApiKey = process.env.LOOPS_API_KEY;
export async function storeContactInLoopsAudience(
  email: string,
  name: string,
  userGroup: string,
) {
  if (loopsEnabled === "true") {
    try {
      const apiKey = loopsApiKey;
      const url = "https://app.loops.so/api/v1/contacts/create";

      const data = {
        email: email,
        source: "api",
        firstName: name,
        userGroup: userGroup,
      };

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export async function sendLoopsEventToUser(email: string, eventName: string) {
  if (loopsEnabled === "true") {
    try {
      const apiKey = loopsApiKey;
      const url = "https://app.loops.so/api/v1/events/send";

      const data = {
        email: email,
        eventName: eventName,
      };

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
type loopPayload = {
  email: string;
  transactionalId: string;
  dataVariables: Object;
};
export async function sendLoopsTransactionalEventToUser(payload: loopPayload) {
  if (loopsEnabled === "true") {
    try {
      const apiKey = loopsApiKey;
      const url = "https://app.loops.so/api/v1/transactional";

      const options = {
        url: url,
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      fetch("https://app.loops.so/api/v1/transactional", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  }
}
