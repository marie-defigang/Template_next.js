export const IPFS_GATEWAYS = [
  'https://ipfs.io',
  'https://cf-ipfs.com',
  'https://gateway.ipfs.io',
  'https://dweb.link',
  'https://ipfs.eth.aragon.network',
];

export function getNftImageFallbackLinks(ipfsCid: string): string[] {
  return IPFS_GATEWAYS.map((ipfsGateWay) => `${ipfsGateWay}/ipfs/${ipfsCid}`);
}
