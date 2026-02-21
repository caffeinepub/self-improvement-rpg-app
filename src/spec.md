# Specification

## Summary
**Goal:** Deploy the Quest RPG application to Internet Computer mainnet so it's publicly accessible online.

**Planned changes:**
- Configure dfx.json with mainnet network settings and production-ready canister configurations
- Deploy backend canister (main.mo) to Internet Computer mainnet with proper cycles funding
- Build frontend in production mode with mainnet canister references and deploy optimized static assets to frontend canister
- Verify Internet Identity authentication works correctly with production II canister on mainnet
- Test all core functionality on mainnet (onboarding, quests, streaks, skills, bosses, achievements, localStorage persistence)

**User-visible outcome:** The Quest RPG application is live on the Internet Computer mainnet with a public URL. Users can authenticate with Internet Identity and use all features (onboarding survey, quest management, XP progression, streak tracking, boss challenges, achievements) in production.
