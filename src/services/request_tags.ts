import { db } from 'firebase/index';
import type { Tag, Color, TagWithColor } from 'services/request_schedules';

// TODO checked って項目､Firestore には不要で､useState({tagWithColor, checked:true}) みたいにすべき
export const getAll = async (): Promise<TagWithColor[]> => {
  const tagsQuerySnapshot = await db.collection('tags').get();

  return Promise.all(
    tagsQuerySnapshot.docs.map(async (doc) => {
      const tag = doc.data() as Tag;

      const colorRef = db.collection('colors').doc(`${tag.colorId}`);
      const color = (await colorRef.get()).data() as Color;

      return {
        name: tag.name,
        tagId: doc.id,
        selectedColor: {
          name: color.name,
          theme: color.theme,
        },
      };
    })
  );
};
