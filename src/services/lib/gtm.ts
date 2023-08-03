type WindowWithDataLayer = Window & {
  dataLayer: Record<string, string>[];
};

declare const window: WindowWithDataLayer;

export const pageView = (url: string) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
};
