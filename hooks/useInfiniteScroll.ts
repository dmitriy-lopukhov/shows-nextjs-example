import { useEffect, useState } from "react";
import { useMounted } from "../utils";

export const useInfiniteScroll = (offset = 100) => {
  const [isBottom, setIsBottom] = useState(false);
  const isMounted = useMounted();
  const handleScroll = () => {
    const scrollTop =
      (isMounted &&
        document.documentElement &&
        document.documentElement.scrollTop) ||
      (isMounted && document.body.scrollTop);

    const scrollHeight =
      (isMounted &&
        document.documentElement &&
        document.documentElement.scrollHeight) ||
      (isMounted && document.body.scrollHeight);

    if (
      scrollTop &&
      scrollTop + window.innerHeight + offset >= scrollHeight &&
      !isBottom
    ) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isBottom };
};
