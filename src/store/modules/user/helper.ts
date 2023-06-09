import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'https://raw.githubusercontent.com/1032902659/chatgptweb/main/src/assets/avatar.jpg',
      name: 'User',
      description: '<a href="https://qm.qq.com/cgi-bin/qm/qr?k=BGdGHQfXBbPTifZPjZA8xC8aOBu2Q1Fs&noverify=0" class="text-blue-500" target="_blank" >QQ</a>',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
