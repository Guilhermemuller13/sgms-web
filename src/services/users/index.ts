import api from '../api';
import { tokenService } from '../auth/tokenService';

type UserPayload = {
  id: number;
};

export const usersService = {
  delete({ id }: UserPayload) {
    const token = tokenService.get({ context: null });

    return api.delete(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
