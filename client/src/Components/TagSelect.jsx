import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Box,
  OutlinedInput,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(tag, userTag, theme) {
  return {
    fontWeight:
      userTag.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TagSelect({ userTags, userPrefTag, handleTagChange }) {
    const theme = useTheme();

    return (
    <FormControl sx={{ m: 2, width: "auto", marginTop: "0px" }}>
      <InputLabel
        id=""
        style={{
          margin: "auto",
        }}
      >
        Tags
      </InputLabel>
      <Select
        labelId=""
        id=""
        multiple
        value={userPrefTag}
        onChange={handleTagChange}
        input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {userTags.map((tags) => (
          <MenuItem
            key={tags}
            value={tags}
            style={getStyles(tags, userPrefTag, theme)}
          >
            {tags}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
