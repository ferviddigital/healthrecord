// Derived from https://github.com/bradyjoslin/webcrypto-example

/**
 * Encrypts string with requested passphrase
 * 
 * @param {String} data The data to encrypt
 * @param {String} passphrase The passphrase to encrypt data with
 * @returns {String}
 */
export const encrypt = async (data, passphrase) => {
  return await encryptData(data, passphrase);
}

/**
 * Decrypts string with requested passphrase
 * 
 * @param {String} encryptedData The data to decrypt
 * @param {String} passphrase The passphrase to decrypt data with
 * @returns {String}
 */
export const decrypt = async (encryptedData, passphrase) => {
  return await decryptData(encryptedData, passphrase);
}

const enc = new TextEncoder();
const dec = new TextDecoder();

const buff_to_base64 = (buff) => {
  return btoa(
    new Uint8Array(buff).reduce(
      (data, byte) => data + String.fromCharCode(byte), ''
    )
  );
}

const base64_to_buf = (b64) => {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(null));
}

const getPasswordKey = (password) => {
  return crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, [
    'deriveKey',
  ]);
}

const deriveKey = (passwordKey, salt, keyUsage) => {
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 250000,
      hash: 'SHA-256',
    },
    passwordKey,
    { 
      name: 'AES-GCM',
      length: 256
    },
    false,
    keyUsage
  );
}

const encryptData = async (secretData, password) => {
  try {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const passwordKey = await getPasswordKey(password);
    const aesKey = await deriveKey(passwordKey, salt, ['encrypt']);
    const encryptedContent = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      aesKey,
      enc.encode(secretData)
    );

    const encryptedContentArr = new Uint8Array(encryptedContent);
    let buff = new Uint8Array(
      salt.byteLength + iv.byteLength + encryptedContentArr.byteLength
    );
    buff.set(salt, 0);
    buff.set(iv, salt.byteLength);
    buff.set(encryptedContentArr, salt.byteLength + iv.byteLength);
    const base64Buff = buff_to_base64(buff);
    return base64Buff;
  } catch (e) {
    return false;
  }
}

const decryptData = async (encryptedData, password) => {
  try {
    const encryptedDataBuff = base64_to_buf(encryptedData);
    const salt = encryptedDataBuff.slice(0, 16);
    const iv = encryptedDataBuff.slice(16, 16 + 12);
    const data = encryptedDataBuff.slice(16 + 12);
    const passwordKey = await getPasswordKey(password);
    const aesKey = await deriveKey(passwordKey, salt, ['decrypt']);
    const decryptedContent = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      aesKey,
      data
    );
    return dec.decode(decryptedContent);
  } catch (e) {
    return false;
  }
}
