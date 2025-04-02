import { Request, Response } from 'express';
import Profile, { IProfile } from '../AuthModel/AdminProfile';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      const defaultProfile = new Profile({
        name: '',
        email: 'default@example.com',
      });
      await defaultProfile.save();
      return res.status(200).json(defaultProfile);
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const profileData: Partial<IProfile> = req.body;
    const profile = await Profile.findOneAndUpdate(
      {},
      profileData,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};