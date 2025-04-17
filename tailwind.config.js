// const { fontFamily } = require("tailwindcss/defaultTheme");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     darkMode: ["class"],
//     content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./lib/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
//   ],
//   theme: {
//   	extend: {
//   		colors: {
//   			tremor: {
//   				brand: {
//   					faint: '#eff6ff',
//   					muted: '#bfdbfe',
//   					subtle: '#60a5fa',
//   					DEFAULT: '#3b82f6',
//   					emphasis: '#1d4ed8',
//   					inverted: '#ffffff'
//   				},
//   				background: {
//   					muted: '#f9fafb',
//   					subtle: '#f3f4f6',
//   					DEFAULT: '#ffffff',
//   					emphasis: '#374151'
//   				},
//   				border: {
//   					DEFAULT: '#e5e7eb'
//   				},
//   				ring: {
//   					DEFAULT: '#e5e7eb'
//   				},
//   				content: {
//   					subtle: '#9ca3af',
//   					DEFAULT: '#6b7280',
//   					emphasis: '#374151',
//   					strong: '#111827',
//   					inverted: '#ffffff'
//   				}
//   			},
//   			'dark-tremor': {
//   				brand: {
//   					faint: '#0B1229',
//   					muted: '#172554',
//   					subtle: '#1e40af',
//   					DEFAULT: '#3b82f6',
//   					emphasis: '#60a5fa',
//   					inverted: '#030712'
//   				},
//   				background: {
//   					muted: '#131A2B',
//   					subtle: '#1f2937',
//   					DEFAULT: '#111827',
//   					emphasis: '#d1d5db'
//   				},
//   				border: {
//   					DEFAULT: '#1f2937'
//   				},
//   				ring: {
//   					DEFAULT: '#1f2937'
//   				},
//   				content: {
//   					subtle: '#4b5563',
//   					DEFAULT: '#6b7280',
//   					emphasis: '#e5e7eb',
//   					strong: '#f9fafb',
//   					inverted: '#000000'
//   				}
//   			},
//   			background: 'hsl(var(--background))',
//   			foreground: 'hsl(var(--foreground))',
//   			card: {
//   				DEFAULT: 'hsl(var(--card))',
//   				foreground: 'hsl(var(--card-foreground))'
//   			},
//   			popover: {
//   				DEFAULT: 'hsl(var(--popover))',
//   				foreground: 'hsl(var(--popover-foreground))'
//   			},
//   			primary: {
//   				DEFAULT: 'hsl(var(--primary))',
//   				foreground: 'hsl(var(--primary-foreground))'
//   			},
//   			secondary: {
//   				DEFAULT: 'hsl(var(--secondary))',
//   				foreground: 'hsl(var(--secondary-foreground))'
//   			},
//   			muted: {
//   				DEFAULT: 'hsl(var(--muted))',
//   				foreground: 'hsl(var(--muted-foreground))'
//   			},
//   			accent: {
//   				DEFAULT: 'hsl(var(--accent))',
//   				foreground: 'hsl(var(--accent-foreground))'
//   			},
//   			destructive: {
//   				DEFAULT: 'hsl(var(--destructive))',
//   				foreground: 'hsl(var(--destructive-foreground))'
//   			},
//   			border: 'hsl(var(--border))',
//   			input: 'hsl(var(--input))',
//   			ring: 'hsl(var(--ring))',
//   			chart: {
//   				'1': 'hsl(var(--chart-1))',
//   				'2': 'hsl(var(--chart-2))',
//   				'3': 'hsl(var(--chart-3))',
//   				'4': 'hsl(var(--chart-4))',
//   				'5': 'hsl(var(--chart-5))'
//   			}
//   		},
//   		boxShadow: {
//   			'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
//   			'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
//   			'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
//   			'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
//   			'dark-tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
//   			'dark-tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
//   		},
//   		borderRadius: {
//   			'tremor-small': '0.375rem',
//   			'tremor-default': '0.5rem',
//   			'tremor-full': '9999px',
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		},
//   		fontSize: {
//   			'tremor-label': [
//   				'0.75rem'
//   			],
//   			'tremor-default': [
//   				'0.875rem',
//   				{
//   					lineHeight: '1.25rem'
//   				}
//   			],
//   			'tremor-title': [
//   				'1.125rem',
//   				{
//   					lineHeight: '1.75rem'
//   				}
//   			],
//   			'tremor-metric': [
//   				'1.875rem',
//   				{
//   					lineHeight: '2.25rem'
//   				}
//   			]
//   		},
//   		width: {
//   			'1536': '1536px'
//   		},
//   		height: {
//   			'150': '37.5rem'
//   		},
//   		margin: {
//   			'30': '7.5rem'
//   		},
//   		fontFamily: {
//   			default: [
//   				'var(--font-inter)',
//                     ...fontFamily.sans
//                 ],
//   			cal: [
//   				'var(--font-cal)',
//                     ...fontFamily.sans
//                 ],
//   			title: [
//   				'var(--font-title)',
//                     ...fontFamily.sans
//                 ],
//   			mono: [
//   				'Consolas',
//                     ...fontFamily.mono
//                 ]
//   		},
//   		typography: {
//   			DEFAULT: {
//   				css: {
//   					h1: {
//   						fontFamily: 'Cal Sans'
//   					},
//   					h2: {
//   						fontFamily: 'Cal Sans'
//   					},
//   					h3: {
//   						fontFamily: 'Cal Sans'
//   					},
//   					'blockquote p:first-of-type::before': {
//   						content: 'none'
//   					},
//   					'blockquote p:first-of-type::after': {
//   						content: 'none'
//   					}
//   				}
//   			}
//   		},
//   		keyframes: {
//   			wiggle: {
//   				'0%, 100%': {
//   					transform: 'translateX(0%)',
//   					transformOrigin: '50% 50%'
//   				},
//   				'15%': {
//   					transform: 'translateX(-6px) rotate(-6deg)'
//   				},
//   				'30%': {
//   					transform: 'translateX(9px) rotate(6deg)'
//   				},
//   				'45%': {
//   					transform: 'translateX(-9px) rotate(-3.6deg)'
//   				},
//   				'60%': {
//   					transform: 'translateX(3px) rotate(2.4deg)'
//   				},
//   				'75%': {
//   					transform: 'translateX(-2px) rotate(-1.2deg)'
//   				}
//   			}
//   		},
//   		animation: {
//   			wiggle: 'wiggle 0.8s both'
//   		}
//   	}
//   },
//   safelist: [
//     {
//       pattern:
//         /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
//       variants: ["hover", "ui-selected"],
//     },
//     {
//       pattern:
//         /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
//       variants: ["hover", "ui-selected"],
//     },
//     {
//       pattern:
//         /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
//       variants: ["hover", "ui-selected"],
//     },
//     {
//       pattern:
//         /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
//     },
//     {
//       pattern:
//         /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
//     },
//     {
//       pattern:
//         /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
//     },
//   ],
//   plugins: [
//     // require('@tailwindcss/nesting'),
//     require("@tailwindcss/typography"),
//     require("@tailwindcss/forms"),
//     require("tailwindcss-animate"),
//   ],
// };


const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    extend: {
      colors: {
        // light mode
        tremor: {
          brand: {
            faint: "#eff6ff", // blue-50
            muted: "#bfdbfe", // blue-200
            subtle: "#60a5fa", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#f9fafb", // gray-50
            subtle: "#f3f4f6", // gray-100
            DEFAULT: "#ffffff", // white
            emphasis: "#374151", // gray-700
          },
          border: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          ring: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          content: {
            subtle: "#9ca3af", // gray-400
            DEFAULT: "#6b7280", // gray-500
            emphasis: "#374151", // gray-700
            strong: "#111827", // gray-900
            inverted: "#ffffff", // white
          },
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#0B1229", // custom
            muted: "#172554", // blue-950
            subtle: "#1e40af", // blue-800
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#60a5fa", // blue-400
            inverted: "#030712", // gray-950
          },
          background: {
            muted: "#131A2B", // custom
            subtle: "#1f2937", // gray-800
            DEFAULT: "#111827", // gray-900
            emphasis: "#d1d5db", // gray-300
          },
          border: {
            DEFAULT: "#1f2937", // gray-800
          },
          ring: {
            DEFAULT: "#1f2937", // gray-800
          },
          content: {
            subtle: "#4b5563", // gray-600
            DEFAULT: "#6b7280", // gray-600
            emphasis: "#e5e7eb", // gray-200
            strong: "#f9fafb", // gray-50
            inverted: "#000000", // black
          },
        },
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      width: {
        1536: "1536px",
      },
      height: {
        150: "37.5rem",
      },
      margin: {
        30: "7.5rem",
      },
      fontFamily: {
        default: ["var(--font-inter)", ...fontFamily.sans],
        cal: ["var(--font-cal)", ...fontFamily.sans],
        title: ["var(--font-title)", ...fontFamily.sans],
        mono: ["Consolas", ...fontFamily.mono],
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: "Cal Sans",
            },
            h2: {
              fontFamily: "Cal Sans",
            },
            h3: {
              fontFamily: "Cal Sans",
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "translateX(0%)",
            transformOrigin: "50% 50%",
          },
          "15%": { transform: "translateX(-6px) rotate(-6deg)" },
          "30%": { transform: "translateX(9px) rotate(6deg)" },
          "45%": { transform: "translateX(-9px) rotate(-3.6deg)" },
          "60%": { transform: "translateX(3px) rotate(2.4deg)" },
          "75%": { transform: "translateX(-2px) rotate(-1.2deg)" },
          hide: {
            from: { opacity: "1" },
            to: { opacity: "0" },
          },
          slideDownAndFade: {
            from: { opacity: "0", transform: "translateY(-6px)" },
            to: { opacity: "1", transform: "translateY(0)" },
          },
          slideLeftAndFade: {
            from: { opacity: "0", transform: "translateX(6px)" },
            to: { opacity: "1", transform: "translateX(0)" },
          },
          slideUpAndFade: {
            from: { opacity: "0", transform: "translateY(6px)" },
            to: { opacity: "1", transform: "translateY(0)" },
          },
          slideRightAndFade: {
            from: { opacity: "0", transform: "translateX(-6px)" },
            to: { opacity: "1", transform: "translateX(0)" },
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        dialogOverlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        dialogContentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -45%) scale(0.95)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        }
      },
      animation: {
        wiggle: "wiggle 0.8s both",
        marquee: "marquee 30s linear infinite",
          // Dialog
          dialogOverlayShow:
          "dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        dialogContentShow:
          "dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        hide: "hide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
  ],
};
