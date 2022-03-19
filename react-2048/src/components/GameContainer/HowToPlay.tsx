import React from "react";
import { List, ListItem, Box } from "@mui/material";
const HowToPlay = () => {
  return (
    <Box textAlign="left">
      <List>
        <ListItem>
          Combine tiles of the same number in an attempt to create a tile with
          the value 2048.
        </ListItem>
        <ListItem>The rules are also simple.</ListItem>
        <ListItem>
          You just need to move the tiles and every time you move one, another
          tile pops up in a random manner anywhere in the box.
        </ListItem>
        <ListItem>
          When two tiles with the same number on them collide with one another
          as you move them, they will merge into one tile with the sum of the
          numbers written on them initially.
        </ListItem>
        <ListItem>
          The game is over when there are no valid ways for you to move the
          tiles.
        </ListItem>
      </List>
    </Box>
  );
};

export default HowToPlay;
