# Privote — Zuzalu News Project Spotlight

## 1. Project Spotlight

**Privote** — Private, trustless on-chain voting designed to prevent collusion and ensure true voter privacy. Explore it at [privote.live](https://privote.live).

## 2. The Build

Privote is a framework for deploying **private, anti-collusion voting polls on-chain**, built on MACI (Minimal Anti-Collusion Infrastructure).

**The problem:** Traditional voting systems are closed-source — even in high-stakes situations like elections, you're trusting opaque infrastructure. Blockchain fixes transparency and trustlessness, but introduces a new problem: since everything is public, anyone can see who voted for whom. This enables **verifiable bribery** — a vote buyer can cryptographically confirm someone voted as instructed — making public-ledger voting worse than paper ballots for real-world use.

**How Privote solves it:** Votes are **encrypted** on the client before being published on-chain. Voters never reveal individual votes to public — instead, they generate **zk-SNARK proofs** that the final tally was computed correctly. You get blockchain's transparency for the *process* while keeping individual votes completely private.

**Anti-collusion mechanism:** Voters can silently change their vote after casting. Even under coercion, a voter can always override their previous ballot. Since only the latest valid message counts, bribers can never verify compliance. Vote buying becomes economically irrational.

**UX as a first-class concern:** Privacy tools are useless if nobody can use them. Privote integrates **Porto** for a fully wallet-less flow — users can connect with just an **email or passkey**, no browser extension or seed phrase required. Gas requirements are abstracted away for Porto users. The voting flow itself is a guided 3-step modal (Register → Verify Requirements → Join Poll) that hides all cryptographic complexity — keypair generation, state tree enrollment, encrypted message construction — behind plain-language explanations. A non-crypto user can cast a private, anti-collusion vote in under a minute.

**Key features:**

- **Multiple voting modes** — Quadratic Voting (prevents plutocratic capture), 1-person-1-vote, and single-choice
- **10+ authentication policies** — Token-gating (ERC20/NFT), Zupass tickets, Semaphore groups, AnonAadhaar, Gitcoin Passport, EAS attestations, Merkle whitelists, and more — polls can be gated to any community
- **Self-service** — Anyone can create and deploy a private poll in minutes, no technical setup required
- **Zupass integration** — Custom-built for communities like Zuzalu; gate polls to event ticket holders via zero-knowledge proofs of ticket ownership
- **Battle-tested** — Privote powered the **GG24 Privacy Round** ([gitcoin.privote.live](https://gitcoin.privote.live)), distributing **35+ wETH to privacy-focused public goods** through Gitcoin — the only domain in GG24 that used MACI as its voting protocol. We've also run live polls at Devcon.

## 3. Meet the Builder

**Shashank Trivedi** ([@0xlord_forever](https://x.com/0xlord_forever)) — a blockchain developer and builder based in India. An ideator focused on solving real-world problems with code. Shashank is an **Ethereum Foundation (PSE) grantee** for Privote, a **Summer of Bitcoin 2024 scholar** (contributing to Floresta, a Bitcoin full node in Rust), and a **Protocol Labs Dev Guild Fellow**. He's an active open-source contributor to projects like MACI, rust-bitcoin, Filecoin's reference FVM, etc. He has multiple hackathon wins including EthSingapore (Privote), EthforAll, ETHGlobal NYC, and EthOnline. He works across the full stack — Solidity, Rust, React — building his own products end-to-end.

## 4. What This Defends Against (the d/acc angle)

**Threat: Verifiable bribery and voter coercion in on-chain governance.**

Blockchain governance today has an ironic flaw: the transparency that makes it trustless also makes it *corruptible*. When votes are public, anyone — whales, protocols, nation-states — can verify that a bribe was honored. Vote-buying markets have already emerged in DeFi governance, and coercion is trivial when ballots sit on a public ledger. If your vote can be bought or coerced, decentralization is theater.

**What Privote defends:**

- **Against bribery** — MACI's key-change mechanism means a voter can always silently override their vote after casting. A briber can never confirm compliance. Vote buying becomes economically irrational.
- **Against coercion** — Voters cannot produce a receipt proving how they voted. No proof means no leverage.
- **Against surveillance** — Individual votes are encrypted and never revealed. Only the final tally is published, verified by zk-SNARK proofs.
- **Against plutocracy** — Quadratic Voting mode ensures concentrated wealth can't dominate outcomes.

**Why it matters for resilience:** Private voting is a prerequisite for legitimate self-governance. Without it, on-chain communities can't make credibly neutral decisions — about funding, policy, or their own future. Privote gives any community the ability to hold votes that are simultaneously **transparent** (verifiable process, auditable code, on-chain proofs) and **private** (individual choices hidden). That's the foundation self-sovereign communities need to actually govern themselves without capture — and with Porto's wallet-less flow, it's accessible to everyone, not just the crypto-native.
