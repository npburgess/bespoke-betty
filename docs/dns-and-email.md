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

## Fix to apply now: publish SPF as a TXT record

The SPF value **exists**, but only as a legacy **`SPF`-type DNS record** (Host
`bespokebetty.com.au`, value `v=spf1 include:_spf.protonmail.ch ~all`). The standalone SPF record
type was deprecated by RFC 7208 — modern mail servers read SPF **only from TXT records** and
ignore the SPF-type one. So `dig +short TXT bespokebetty.com.au` shows no SPF, and receivers
effectively see none. Fix by adding the same value as a **TXT** record:

| Type | Name / Host | Value |
|---|---|---|
| TXT | `@` (apex; or `bespokebetty.com.au` to match other apex rows) | `v=spf1 include:_spf.protonmail.ch ~all` |

Notes:
- Additive and isolated — doesn't affect the website, MX, or DKIM.
- Keep the `protonmail-verification=…` TXT as a **separate** record. A domain may have many TXT
  records but must have only **one** starting `v=spf1`.
- The old **`SPF`-type** row can be deleted (deprecated/ignored) or left as-is; harmless either way.
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
