import React from 'react';
import { getAll, TagWithColor } from 'services/request_tags';

type UseTags = {
  tagBox: TagBox[];
};

type TagBox = {
  tag: TagWithColor;
  checked: boolean;
};

export const useTags = (): UseTags => {
  const [tagBox, setTagBox] = React.useState<TagBox[]>([]);

  React.useEffect(() => {
    (async () => {
      const tagsWithColor = await getAll();

      const newTagBox = tagsWithColor.map((tag) => {
        return { tag, checked: true };
      });

      setTagBox(newTagBox);
    })();
  }, []);

  return { tagBox };
};
