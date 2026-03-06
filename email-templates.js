// Email templates for the typing animation demo, keyed by language.
export const emailTemplates = {
    en: {
        linkedin: `{{RANDOM | Hi {{firstName}} | Hello {{firstName}} | {{firstName}},}} this is a cold message and I know you get many, so I'll keep it brief.

We've helped more than 105 professionals turn their LinkedIn presence into a consistent source of leads.

{{RANDOM | We are opening | We're launching}} an end-of-year bundle for just 12 clients.

{{RANDOM | Inside you get | This includes}} a complete LinkedIn profile upgrade, plus 1 full month of done-for-you managed outreach.

{{RANDOM | If this feels worth exploring | If this sounds interesting}}, reply "Yes" and I'll share my calendar link.`,

        cold: `Subject: {{RANDOM | Quick question about {{companyName}} | {{firstName}}, saw your work at {{companyName}}}}

{{RANDOM | Hi {{firstName}} | Hello {{firstName}}}},

{{RANDOM | I noticed | I saw}} {{companyName}} {{RANDOM | is scaling rapidly | has been growing}} and thought you might be interested in how we've helped similar {{industry}} companies {{RANDOM | 3x their pipeline | book 40+ meetings monthly}}.

We build done-for-you outbound systems that {{RANDOM | run on autopilot | scale without adding headcount}}.

{{RANDOM | Would it make sense | Would you be open}} to chat for 15 minutes this week?

{{RANDOM | Best | Cheers}},
{{senderName}}`,

        followup: `{{RANDOM | Hi {{firstName}} | Hey {{firstName}}}},

{{RANDOM | Following up on my last message | Wanted to circle back}} - {{RANDOM | I know you're busy | things get buried}}.

We help {{industry}} companies like {{companyName}} build outbound systems that {{RANDOM | generate leads on autopilot | book 30-50 meetings per month}}.

{{RANDOM | Worth a 10-minute call? | Would a quick chat make sense?}}

{{RANDOM | {{senderName}} | Best, {{senderName}}}}`,

        breakup: `{{RANDOM | Hi {{firstName}} | Hey {{firstName}}}},

{{RANDOM | I've reached out a few times | This is my last follow-up}} - {{RANDOM | I don't want to keep filling your inbox | I respect your time}}.

{{RANDOM | If building a predictable outbound engine isn't a priority right now | If now isn't the right time}}, {{RANDOM | totally understand | no worries}}.

{{RANDOM | But if anything changes | When you're ready}}, {{RANDOM | my door is always open | you know where to find me}}.

{{RANDOM | {{senderName}} | All the best, {{senderName}}}}`
    },

    es: {
        linkedin: `{{RANDOM | Hola {{firstName}} | {{firstName}},}} este es un mensaje en frío y sé que recibes muchos, así que seré breve.

Hemos ayudado a más de 105 profesionales a convertir su presencia en LinkedIn en una fuente constante de leads.

{{RANDOM | Estamos abriendo | Estamos lanzando}} un paquete de fin de año para solo 12 clientes.

{{RANDOM | Incluye | Dentro obtienes}} una actualización completa de perfil de LinkedIn, más 1 mes completo de outreach gestionado.

{{RANDOM | Si te interesa explorar esto | Si suena interesante}}, responde "Sí" y te comparto mi link de calendario.`,

        cold: `Asunto: {{RANDOM | Pregunta rápida sobre {{companyName}} | {{firstName}}, vi tu trabajo en {{companyName}}}}

{{RANDOM | Hola {{firstName}} | {{firstName}}}},

{{RANDOM | Noté | Vi}} que {{companyName}} {{RANDOM | está escalando rápidamente | ha estado creciendo}} y pensé que te podría interesar cómo hemos ayudado a empresas similares de {{industry}} a {{RANDOM | triplicar su pipeline | agendar 40+ reuniones mensuales}}.

Construimos sistemas de outbound llave en mano que {{RANDOM | corren en automático | escalan sin agregar personal}}.

{{RANDOM | ¿Tendría sentido | ¿Estarías abierto a}} una llamada de 15 minutos esta semana?

{{RANDOM | Saludos | Un abrazo}},
{{senderName}}`,

        followup: `{{RANDOM | Hola {{firstName}} | {{firstName}}}},

{{RANDOM | Dando seguimiento a mi último mensaje | Quería retomar}} - {{RANDOM | sé que estás ocupado | las cosas se entierran}}.

Ayudamos a empresas de {{industry}} como {{companyName}} a construir sistemas de outbound que {{RANDOM | generan leads en automático | agendan 30-50 reuniones por mes}}.

{{RANDOM | ¿Vale la pena una llamada de 10 minutos? | ¿Tendría sentido conectar?}}

{{RANDOM | {{senderName}} | Saludos, {{senderName}}}}`,

        breakup: `{{RANDOM | Hola {{firstName}} | {{firstName}}}},

{{RANDOM | Te he escrito varias veces | Este es mi último seguimiento}} - {{RANDOM | no quiero seguir llenando tu bandeja | respeto tu tiempo}}.

{{RANDOM | Si construir un motor de outbound predecible no es prioridad ahora | Si no es el momento correcto}}, {{RANDOM | lo entiendo totalmente | no hay problema}}.

{{RANDOM | Pero si algo cambia | Cuando estés listo}}, {{RANDOM | mi puerta siempre está abierta | sabes dónde encontrarme}}.

{{RANDOM | {{senderName}} | Un abrazo, {{senderName}}}}`
    }
};

// Per-language configuration for TidyCal links, modal text, and hardcoded value prop copy.
export const langConfig = {
    en: {
        tidyLinks: {
            discovery: 'https://tidycal.com/strategyandstack/discovery',
            strategy: 'https://tidycal.com/strategyandstack/strategy'
        },
        modal: {
            strategy: { title: 'Sales Strategy Session', subtitle: '30 minutes • Working Session' },
            discovery: { title: 'Discovery Call', subtitle: '15 minutes • Alignment Check' }
        },
        valueProps: {
            battleTested: 'Battle Tested',
            fullOwnership: 'Full Ownership',
            fullOwnershipDesc: 'We build on your infrastructure. Accounts, data, and content stay with you forever.',
            theOutcome: 'The Outcome'
        }
    },
    es: {
        tidyLinks: {
            discovery: 'https://tidycal.com/strategyandstack/exploracion',
            strategy: 'https://tidycal.com/strategyandstack/estrategia'
        },
        modal: {
            strategy: { title: 'Sesión de Estrategia', subtitle: '30 minutos • Sesión de Trabajo' },
            discovery: { title: 'Sesión de Exploración', subtitle: '15 minutos • Llamada de Alineación' }
        },
        valueProps: {
            battleTested: 'Probado en Batalla',
            fullOwnership: 'Propiedad Total',
            fullOwnershipDesc: 'Construimos en tu infraestructura. Cuentas, datos y contenido se quedan contigo para siempre.',
            theOutcome: 'El Resultado'
        }
    }
};
