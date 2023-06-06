export const verifyConnectToMetamask = async () => {
    if (typeof window.ethereum !== 'undefined') {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    else {
        throw new Error('Metamask not installed');
    }
}