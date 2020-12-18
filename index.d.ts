declare module 'pratishat' {
  export default class Pratishat {
    /**
     * Percent-encode specific characters in the string.
     */
    constructor(chars: string[]);

    encode(value: string): string;
    decode(value: string): string;
  }
}
