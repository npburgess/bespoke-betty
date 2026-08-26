# DNS & email — bespokebetty.com.au

**Registrar / DNS host:** Netregistry (Webcentral group) — nameservers `ns1/2/3.netregistry.net`.
Manage the DNS zone in the Netregistry/Webcentral control panel.

**Email:** **Proton Mail** on the custom domain (e.g. `miriam@bespokebetty.com.au`) — administered
at [account.proton.me](https://account.proton.me), **not** at Webcentral. Webcentral only holds
the domain + DNS zone; there is no cPanel/webmail mailbox.

**Website:** to be hosted on Netlify. The apex currently points at a Netregistry parking IP
(`202.124.241.178` = `redirector.servers.netregistry.net`) — no real site yet.

Verified from public DNS on 2026-08-26.

---

## Do NOT touch these records (email — changing them breaks Miriam's mail)

| Type | Name | Value | Purpose |
|---|---|---|---|
| MX | `@` | `mail.protonmail.ch` (pri 10), `mailsec.protonmail.ch` (pri 20) | Inbound mail → Proton |
| TXT | `@` | `protonmail-verification=8f79a04f805cc7c1ed43e994b340dd0b633bc0cd` | Proton domain ownership |
| CNAME | `protonmail._domainkey` | `protonmail.domainkey.dg4ezpkykb4ovgrxigcua2pe6c6oimkgtpzpe57joogxq5rxn4ova.domains.proton.ch` | DKIM |
| CNAME | `protonmail2._domainkey` | `protonmail2.domainkey.dg4ezpkykb…proton.ch` | DKIM |
| CNAME | `protonmail3._domainkey` | `protonmail3.domainkey.dg4ezpkykb…proton.ch` | DKIM |
| TXT | `_dmarc` | `v=DMARC1; p=quarantine` | DMARC policy |

## Fix to apply now: add the missing SPF record

The domain has **no `v=spf1` record**, which Proton requires — without it, mail Miriam sends can
fail SPF and be treated as spam. Add exactly one TXT record at Netregistry:

| Type | Name / Host | Value |
|---|---|---|
| TXT | `@` (the apex / root) | `v=spf1 include:_spf.protonmail.ch ~all` |

Notes:
- This is additive and isolated — it doesn't affect the website, MX, or DKIM.
- Keep the existing `protonmail-verification=…` TXT as a **separate** record; don't merge or
  replace it. A domain may have multiple TXT records; it must have only **one** `v=spf1` record.
- Verify after ~15–60 min: `dig +short TXT bespokebetty.com.au` should now list the SPF line too.

## Later (optional): tighten DMARC

Once SPF is live and confirmed for a week or two with no delivery issues, DMARC can move from
`quarantine` to `reject` for stronger anti-spoofing:

| Type | Name | Value |
|---|---|---|
| TXT | `_dmarc` | `v=DMARC1; p=reject` |

Not urgent; `p=quarantine` is already a reasonable policy. Only tighten after confirming Miriam's
outbound mail passes SPF+DKIM alignment (send to a Gmail account, check "show original").

---

## Website launch — DNS change plan (Netlify)

When the site goes live, change **only** the website records at Netregistry and leave every mail
record above untouched:

1. **Apex `@`** — repoint from the Netregistry parking IP to Netlify. Prefer Netlify's
   `ALIAS`/`ANI`-style apex option; if Netregistry only supports plain A records at the apex, use
   Netlify's load-balancer IP (`75.2.60.5`) as they document.
2. **`www`** — `CNAME` to the Netlify site (`<site>.netlify.app`), or set it as the primary and
   redirect apex → www (Netlify handles the redirect + TLS).
3. Leave MX, `protonmail-verification` TXT, the three `_domainkey` CNAMEs, DMARC, and the new SPF
   **exactly as-is**.
4. If DNS is ever moved to Cloudflare, keep the Netlify web records **DNS-only (grey cloud)** and
   re-create all the Proton mail records first, verifying mail still flows before switching NS.

TLS is issued by Netlify automatically once the records resolve.
