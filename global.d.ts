// global.d.ts
export { };

declare global {
  interface EthereumProvider {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, handler: (...args: any[]) => void) => void;
    removeListener: (event: string, handler: (...args: any[]) => void) => void;
    send: (
      method: string,
      params?: any[] | object
    ) => Promise<any>;
    sendAsync: (
      request: { method: string, params?: any[] | object },
      callback: (err: Error | null, result: any) => void
    ) => void;
    enable: () => Promise<string[]>;
  }

  interface Window {
    ethereum?: EthereumProvider;
  }
}
