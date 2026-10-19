/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PIXEL_ID?: string;
  readonly VITE_WEBHOOK_URL?: string;
  readonly VITE_PRECALL_FORM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
