# [URI References](https://datatracker.ietf.org/doc/html/rfc3986)

## [URI Syntax Components](https://datatracker.ietf.org/doc/html/rfc3986#section-3)

The generic URI syntax consists of a hierarchical sequence of
components referred to as the scheme, authority, path, query, and
fragment.

      URI         = scheme ":" hier-part [ "?" query ] [ "#" fragment ]

      hier-part   = "//" authority path-abempty
                  / path-absolute
                  / path-rootless
                  / path-empty

The scheme and path components are required, though the path may be
empty (no characters).  When authority is present, the path must
either be empty or begin with a slash ("/") character.  When
authority is not present, the path cannot begin with two slash
characters ("//").  These restrictions result in five different ABNF
rules for a path (Section 3.3), only one of which will match any
given URI reference.

The following are two example URIs and their component parts:

         foo://example.com:8042/over/there?name=ferret#nose
         \_/   \______________/\_________/ \_________/ \__/
          |           |            |            |        |
       scheme     authority       path        query   fragment
          |   _____________________|__
         / \ /                        \
         urn:example:animal:ferret:nose

## References

This specification uses the Augmented Backus-Naur Form (ABNF) notation
of [RFC2234](https://datatracker.ietf.org/doc/html/rfc2234), including the following core ABNF syntax rules defined by
that specification: ALPHA (letters), CR (carriage return), DIGIT (decimal digits), DQUOTE (double quote), HEXDIG (
hexadecimal
digits), LF (line feed), and SP (space).

