import { supabase } from '../../lib/supabase';
import { nanoid } from 'nanoid';
import { decode } from 'base64-arraybuffer';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  // Upload image to Supabase
  if (req.method === 'POST') {
    let { image: file } = req.body;

    if (!file) {
      return res.status(500).json({ message: 'No file provided' });
    }

    try {
      const contentType = file.match(/data:(.*);base64/)?.[1];
      const base64FileData = file.split('base64,')?.[1];

      if (!contentType || !base64FileData) {
        return res.status(500).json({ message: 'File data not valid' });
      }

      // Upload file
      const fileName = nanoid();
      const ext = contentType.split('/')[1] || 'pdf';
      const path = `${fileName}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(path, decode(base64FileData), {
          contentType,
          upsert: true,
        });

      if (uploadError) {
        console.log(uploadError);
        throw new Error('Unable to upload file to storage');
      }

      // Construct public URL using Supabase utility
      const { publicURL } = supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .getPublicUrl(path);

      return res.status(200).json({ url: publicURL });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['POST']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}