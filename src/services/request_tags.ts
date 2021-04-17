import firebase from 'firebase/app';
import { db } from '../firebase';

type Tag = {
  name: string;
  checked: boolean;
  colorRef: firebase.firestore.DocumentReference;
};

type Color = {
  name: string;
  theme: string;
};

export type TagWithColor = {
  name: string;
  selectedColor: {
    name: string;
    theme: string;
  };
};

// TODO checked って項目､Firestore には不要で､useState({tagWithColor, checked:true}) みたいにすべき
export const getAll = async (): Promise<TagWithColor[]> => {
  const tagsQuerySnapshot = await db.collection('tags').get();

  return await Promise.all(
    tagsQuerySnapshot.docs.map(async (doc) => {
      const tag = doc.data() as Tag;

      const color = (await tag.colorRef.get()).data() as Color;

      return {
        name: tag.name,
        selectedColor: {
          name: color.name,
          theme: color.theme,
        },
      };
    })
  );
};
