import React from 'react';
import { TagWithColor } from 'services/request_schedules';
import { getAll } from 'services/request_tags';

type UseTags = {
  tagBoxes: TagBox[];
};

export type TagBox = {
  tag: TagWithColor;
  checked: boolean;
};

export const useTags = (): UseTags => {
  const [tagBoxes, setTagBox] = React.useState<TagBox[]>([]);

  React.useEffect(() => {
    (async () => {
      const tagsWithColor = await getAll();

      const newTagBox = tagsWithColor.map((tag) => {
        return { tag, checked: true };
      });

      setTagBox(newTagBox);
    })();
  }, []);

  return { tagBoxes };
};
