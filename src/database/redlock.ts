import Redlock, { ResourceLockedError } from "redlock"
import { redis } from "./connection"

const redlock = new Redlock(
  [redis],
  {
    driftFactor: 0.01,
    retryCount: 10,
    retryDelay: 200,
    retryJitter: 200,
  }
)

redlock.on("error", (error) => {
  if (error instanceof ResourceLockedError) {
    return;
  }
  console.error(error);
});

export default redlock