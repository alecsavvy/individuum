package individuum

import (
	"log"
	"testing"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/hashicorp/vault/shamir"
	hdwallet "github.com/miguelmota/go-ethereum-hdwallet"
	"github.com/stretchr/testify/require"
	"github.com/tyler-smith/go-bip39"
)

func TestSharding(t *testing.T) {
	entropy, _ := bip39.NewEntropy(256)
	mnemonic, _ := bip39.NewMnemonic(entropy)

	wallet, _ := hdwallet.NewFromMnemonic(mnemonic)

	path := hdwallet.MustParseDerivationPath("m/44'/60'/0'/0/0")
	account, _ := wallet.Derive(path, false)

	log.Println("Address: ", account.Address.Hex())
	log.Println("Mnemonic: ", mnemonic)
}

/*
*
test that generates a random private key with geth,
breaks it up with shamir,
then reassembles it and constructs the same wallet obj
*/
func TestPrivateKeySharding(t *testing.T) {
	privateKey, _ := crypto.GenerateKey()

	privateKeyBytes := crypto.FromECDSA(privateKey)
	parts, _ := shamir.Split(privateKeyBytes, 5, 3)

	// reassemble pkey with only three parts
	privateKeyBytesReassembled, _ := shamir.Combine(parts[:3])

	require.EqualValues(t, privateKeyBytes, privateKeyBytesReassembled, "reassembled pkey not equal to original")
}
