declare module '@wert-io/widget-initializer' {
  export interface WertOptions {
    partner_id: string;
    session_id?: string;
    click_id?: string;
    origin?: string;
    commodity?: string;
    network?: string;
    extra?: any;
    theme?: string;
    flow_type?: string;
    wallet_address?: string;
    address?: string;
    commodities?: string;
    is_crypto_hidden?: boolean;
    listeners?: {
      loaded?: () => void;
      error?: (error: any) => void;
      [key: string]: ((...args: any[]) => void) | undefined;
    };
    commodity_amount?: string | number;
    lang?: string;
    sc_address?: string;
    sc_input_data?: string;
  }

  export default class WertWidget {
    constructor(options: WertOptions);
    open(): void;
  }
} 