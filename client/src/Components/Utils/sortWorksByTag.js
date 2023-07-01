// Function to order the works by the selected tag of the volunteer
export function sortWorksByTag(works, selectedTags) {
  //Function to compare the tags of the works with the selected tag
  const compare = (a, b) => {
    // If both works have the selected tags or none of them have them, it doesn't change the order
    const aHasAllTags = selectedTags.every((tag) => a.tags.includes(tag));
    const bHasAllTags = selectedTags.every((tag) => b.tags.includes(tag));

    if (aHasAllTags && bHasAllTags) {
      // Compare how many tags each work has
      // Works with fewer tags (exact matches) go first
      if (a.tags.length !== b.tags.length) {
        return a.tags.length - b.tags.length;
      } else {
        // If both works have the same number of tags, it compares the titles
        return a.title.localeCompare(b.title);
      }
    }

    // If only the first work has all the selected tags, it goes first
    if (aHasAllTags) {
      return -1;
    }
    // If only the second work has all the selected tags, it goes first
    if (bHasAllTags) {
      return 1;
    }

    // Check if both works have at least one of the selected tags
    const aHasSomeTags = selectedTags.some((tag) => a.tags.includes(tag));
    const bHasSomeTags = selectedTags.some((tag) => b.tags.includes(tag));

    // If both works have at least one of the selected tags, or if neither work has any of the selected tags,
    // compare how many tags each work has and their titles
    if ((aHasSomeTags && bHasSomeTags) || (!aHasSomeTags && !bHasSomeTags)) {
      if (a.tags.length !== b.tags.length) {
        return b.tags.length - a.tags.length;
      } else {
        return a.title.localeCompare(b.title);
      }
    }

    // If only one of the works has at least one of the selected tags, it should come first
    if (aHasSomeTags) {
      return -1;
    }
    if (bHasSomeTags) {
      return 1;
    }
  };
  // Order the works by the compare function
  works.sort(compare);
}
