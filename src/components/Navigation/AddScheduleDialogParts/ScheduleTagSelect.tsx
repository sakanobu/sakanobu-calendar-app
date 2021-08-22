import React, { ChangeEvent, VFC } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import type { TagBox } from 'hooks/useTags';

type Props = {
  tagBoxes: TagBox[];
  setSelectedTagId: (value: React.SetStateAction<string | null>) => void;
  setSelectedTagName: (value: React.SetStateAction<string | null>) => void;
  selectedTagName: string | null;
};

const ScheduleTagSelect: VFC<Props> = React.memo<Props>(
  ({ tagBoxes, setSelectedTagId, setSelectedTagName, selectedTagName }) => {
    const handleTagSelectBox = React.useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedTagBox = tagBoxes.find(
          (tagBox) => tagBox.tag.name === event.target.value
        );

        if (selectedTagBox === undefined) {
          throw new Error();
        }

        setSelectedTagId(selectedTagBox.tag.tagId);
        setSelectedTagName(selectedTagBox.tag.name);
      },
      [tagBoxes, setSelectedTagName, setSelectedTagId]
    );

    return (
      <FormControl>
        <InputLabel shrink htmlFor="tag">
          タグ
        </InputLabel>
        <NativeSelect
          inputProps={{ id: 'tag' }}
          value={selectedTagName}
          onChange={handleTagSelectBox}
        >
          <option value="">必ず選択してください</option>
          {tagBoxes.map((tagBox) => (
            <>
              <option key={tagBox.tag.name} value={tagBox.tag.name}>
                {tagBox.tag.name}
              </option>
            </>
          ))}
        </NativeSelect>
      </FormControl>
    );
  }
);

ScheduleTagSelect.displayName = 'ScheduleTagSelect';

export default ScheduleTagSelect;
