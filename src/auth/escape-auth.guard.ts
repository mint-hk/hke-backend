import { SetMetadata } from '@nestjs/common';

export const ESCAPE_GUARD_META_KEY = 'escapeGuard';

export const EscapeGuard = () => SetMetadata(ESCAPE_GUARD_META_KEY, true);
