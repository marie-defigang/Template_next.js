import { UserResponseDTO } from '@768-gladwin-tech/client-sdk';

export type AdminTableType = {
  id: number,
  accountName: string,
  role: UserResponseDTO.role,
  status: UserResponseDTO.status,
  email: string
  phone: string | null
}

export const ROLE_TYPE = UserResponseDTO.role;
