export enum BadgeTypes {
  Success,
  Secondary
}

export const badgeTypeMap = new Map<BadgeTypes, string>();

badgeTypeMap.set(BadgeTypes.Success, 'badge-success');
badgeTypeMap.set(BadgeTypes.Secondary, 'badge-secondary');