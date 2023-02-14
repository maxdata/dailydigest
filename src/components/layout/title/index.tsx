import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Link as ChakraLink } from "@pankod/refine-chakra-ui";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <ChakraLink as={Link} to="/">
      {collapsed ? (
        <img src="/dailydigest-collapsed.svg" alt="DailyDigest" />
      ) : (
        <img src="/dailydigest.svg" alt="DailyDigest" width="140px" />
      )}
    </ChakraLink>
  );
};
