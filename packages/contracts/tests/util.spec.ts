import { encodeBlsPubKey, encodeBlsSignature, formatSENT, parseSENT } from '../util';

// #region - formatSENT

describe('formatSENT', () => {
  test('should return the formatted value', () => {
    expect(formatSENT(BigInt(1000000000000))).toBe('1000');
    expect(formatSENT(BigInt(100000000000))).toBe('100');
    expect(formatSENT(BigInt(10000000000))).toBe('10');
    expect(formatSENT(BigInt(1000000000))).toBe('1');
    expect(formatSENT(BigInt(100000000))).toBe('0.1');
    expect(formatSENT(BigInt(10000000))).toBe('0.01');
    expect(formatSENT(BigInt(1000000))).toBe('0.001');
    expect(formatSENT(BigInt(100000))).toBe('0.0001');
    expect(formatSENT(BigInt(10000))).toBe('0.00001');
    expect(formatSENT(BigInt(1000))).toBe('0.000001');
    expect(formatSENT(BigInt(100))).toBe('0.0000001');
    expect(formatSENT(BigInt(10))).toBe('0.00000001');
    expect(formatSENT(BigInt(1))).toBe('0.000000001');
  });
});

// #endregion
// #region - parseSENT

describe('parseSENT', () => {
  test('should return the parsed value', () => {
    expect(parseSENT('1000')).toBe(BigInt(1000000000000));
    expect(parseSENT('100')).toBe(BigInt(100000000000));
    expect(parseSENT('10')).toBe(BigInt(10000000000));
    expect(parseSENT('1')).toBe(BigInt(1000000000));
    expect(parseSENT('0.1')).toBe(BigInt(100000000));
    expect(parseSENT('0.01')).toBe(BigInt(10000000));
    expect(parseSENT('0.001')).toBe(BigInt(1000000));
    expect(parseSENT('0.0001')).toBe(BigInt(100000));
    expect(parseSENT('0.00001')).toBe(BigInt(10000));
    expect(parseSENT('0.000001')).toBe(BigInt(1000));
    expect(parseSENT('0.0000001')).toBe(BigInt(100));
    expect(parseSENT('0.00000001')).toBe(BigInt(10));
    expect(parseSENT('0.000000001')).toBe(BigInt(1));
  });
});

// #endregion
// #region - encodeBlsPubKey

describe('encodeBlsPubKey', () => {
  test('should encode BLS12-381 EIP-2537 G1 bytes', () => {
    const pubkey = 'a'.repeat(256);

    expect(encodeBlsPubKey(pubkey)).toEqual({ data: `0x${pubkey}` });
  });

  test('should reject invalid BLS12-381 public key bytes', () => {
    expect(() => encodeBlsPubKey('a'.repeat(255))).toThrow('BLS Pubkey length is invalid');
    expect(() => encodeBlsPubKey(`${'a'.repeat(255)}g`)).toThrow('BLS Pubkey length is invalid');
  });
});

// #endregion
// #region - encodeBlsSignature

describe('encodeBlsSignature', () => {
  test('should encode BLS12-381 EIP-2537 G2 bytes', () => {
    const signature = 'b'.repeat(512);

    expect(encodeBlsSignature(signature)).toEqual({ signature: `0x${signature}` });
  });

  test('should reject invalid BLS12-381 signature bytes', () => {
    expect(() => encodeBlsSignature('b'.repeat(511))).toThrow('BLS Signature length is invalid');
    expect(() => encodeBlsSignature(`${'b'.repeat(511)}g`)).toThrow('BLS Signature length is invalid');
  });
});

// #endregion
