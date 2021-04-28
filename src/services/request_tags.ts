import { db } from '../firebase';
import type { Tag, Color, TagWithColor } from 'services/request_schedules';

// TODO checked って項目､Firestore には不要で､useState({tagWithColor, checked:true}) みたいにすべき
export const getAll = async (): Promise<TagWithColor[]> => {
  const tagsQuerySnapshot = await db.collection('tags').get();

  return await Promise.all(
    tagsQuerySnapshot.docs.map(async (doc) => {
      const tag = doc.data() as Tag;

      const color = (await tag.colorRef.get()).data() as Color;

      return {
        name: tag.name,
        tagRef: doc.ref,
        selectedColor: {
          name: color.name,
          theme: color.theme,
        },
      };
    })
  );
};
