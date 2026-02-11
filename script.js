// --- CONFIGURATION & DONNÉES GLOBALES ---
let APP_DATA = {};
const APP_CONTENT = document.getElementById('app-content');
const APP_FOOTER = document.getElementById('app-footer');
const DEFAULT_PAGE = 'home';
const SERVICE_CHARGE_PCT = 0.20;

// --- FONCTIONS UTILITAIRES ---
const formatPrice = (price) => `$${price.toLocaleString('fr-FR', { minimumFractionDigits: 0 })}`;
const getDayOfWeek = (dateString) => new Date(dateString).getDay(); // 0=Dim, 5=Ven, 6=Sam
window.addEventListener('load', () => {
    const loader = document.getElementById('bradford-cinematic-loader');
    
    // On laisse la séquence se terminer (environ 3.5 secondes pour tout voir)
    setTimeout(() => {
        if (loader) {
            // On déclenche l'effet de zoom immersif
            loader.classList.add('loader-exit');
            
            // On retire complètement après l'animation
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1200); 
        }
    }, 3800); // Temps parfait pour lire la phrase et apprécier le design
});

/** Met à jour les liens actifs et affiche la page demandée. */
function navigate(pageId) {
    // 1. Nettoyer l'ancienne navigation (boutons principaux)
    document.querySelectorAll('.nav-links button').forEach(btn => {
        btn.classList.remove('active');
    });

    // 2. Activer le nouveau bouton
    const navButton = document.getElementById(`nav-${pageId}`);
    if (navButton) {
        navButton.classList.add('active');
    }

    // 3. Afficher le contenu
    APP_CONTENT.innerHTML = '';
// --- DÉVIATION POUR LES PAGES DYNAMIQUES ---
if (pageId === 'events') {
    renderEventPage(); // On lance la fonction qui contient la Matrix et le Planning
    return; // On arrête là pour ne pas lire la suite de contentData
}
if (pageId === 'contact') {
    renderContactPage(); 
    return; 
}
if (pageId === 'dress_code') {
    renderDressCodePage(); 
    return; 
}
   if (pageId === 'gallery')  {
    renderBradfordGallery(); 
    return; 
}

 
    // --- Contenu Riche et étendu ---
    const contentData = {
        'dress_code': {
            title: 'THE STYLE STANDARDS: IMPECCABLE ATTIRE',
            subtitle: 'L’élégance est notre unique passe d’entrée.',
            sections: [
                {
                    title: 'L\'Exigence de l\'Élégance Formelle',
                    text: 'Le Bradford n\'est pas un lieu de rencontre décontracté ; c\'est une déclaration de luxe et de raffinement. Notre code vestimentaire est strictement appliqué pour préserver l\'atmosphère digne d\'un club de prestige mondial. Pour les messieurs, cela signifie impérativement des pantalons de costume ou des chinos haut de gamme, des chemises à col, et le port d\'une veste ou d\'un blazer est fortement recommandé. Les vêtements doivent être neufs, bien ajustés et refléter un soin méticuleux. Tout manquement à la tenue attendue mènera à un refus d\'accès immédiat.',
                    list: [
                        '✅ Approuvé : Costumes, blazers, chemises boutonnées, robes de cocktail, talons élégants, mocassins en cuir.',
                        '❌ Interdit : Vêtements de sport, casquettes, T-shirts graphiques, shorts, sandales, baskets (y compris les marques de luxe sauf exception managériale),'
                    ]
                },
                {
                    title: 'Discrétion et Marque de Luxe',
                    text: 'Nous encourageons nos invités à exprimer leur style personnel, à condition qu’il soit en harmonie avec le ton ultra-luxe du club. Les logos ostentatoires doivent être minimisés. Notre équipe se réserve le droit souverain de juger de la conformité de toute tenue. Ce jugement est final et non négociable. Nous vous remercions d\'être des ambassadeurs de notre image.',
                    list: []
                }
            ],
            image: 'style-standards.jpg'
        },
        'entry_policy': {
            title: 'OUR DOOR & ENTRY PROTOCOL',
            subtitle: 'Un processus d\'admission conçu pour l\'élite.',
            sections: [
                {
                    title: 'Vérification et Sécurité Inflexible',
                    text: 'L\'accès au Bradford est strictement réservé aux personnes de 21 ans et plus. L\'identification (carte d\'identité ou passeport) est obligatoire pour chaque invité, y compris les détenteurs de réservations VIP. Notre protocole de sécurité est exhaustif et vise à garantir un environnement sans stress pour notre clientèle. Toute personne refusant une fouille de sécurité sera immédiatement bannie du club. La consommation excessive d\'alcool avant l\'entrée est un motif de refus, quel que soit votre statut de réservation.',
                    list: [
                        'Identification gouvernementale valide obligatoire (21+).',
                        'Contrôle de sécurité systématique et non-négociable à l\'entrée.',
                        'Liste d\'invités et confirmation de réservation requises pour la ligne VIP.'
                    ]
                },
                {
                    title: 'Le Droit de Refus Managérial',
                    text: 'Le Bradford opère sous une politique de discrétion absolue. Le personnel de la porte est habilité à refuser l\'entrée à toute personne jugée non conforme aux normes du club (tenue, comportement, état d\'ébriété) sans avoir à justifier sa décision, même si une réservation a été confirmée. Ce protocole assure que seuls les invités qui rehaussent notre ambiance peuvent entrer.',
                    list: []
                }
            ],
            image: 'entry-protocol.jpg'
        },
        'vip_policy': {
            title: 'PRESTIGE VIP RESERVATION POLICY',
            subtitle: 'Le sommet de l\'hospitalité exclusive.',
            sections: [
                {
                    title: 'Garantie de Service et Minimum Spend',
                    text: `La réservation VIP est votre accès direct à une soirée personnalisée. Votre table est garantie pour la soirée, sous réserve de l'arrivée à l'heure convenue. Toutes les réservations nécessitent un dépôt non-remboursable de $200, appliqué à votre Minimum Spend. Ce minimum est un engagement d'achat de bouteilles, hors taxes et frais de service.`,
                    list: [
                        'Confirmation par email et SMS obligatoire 24h avant.',
                        'Minimum Spend calculé dynamiquement par jour/invité.',
                        'Tout retard de plus de 30 minutes sans notification annule la garantie de table.'
                    ]
                },
                {
                    title: 'Politique d\'Annulation et Finesse',
                    text: 'Nous exigeons une notification d\'annulation au moins 48 heures avant l\'événement pour transférer votre dépôt (un crédit de club sera émis). Une annulation tardive ou un no-show entraîne la perte totale du dépôt. Notre temps et nos ressources sont dédiés à la perfection de votre expérience, c\'est pourquoi cette politique est strictement appliquée.',
                    list: []
                }
            ],
            image: 'vip-reservation.jpg'
        },
        'bottle_service_req': {
            title: 'PREMIUM BOTTLE SERVICE REQUIREMENTS',
            subtitle: 'L\'essence même de l\'expérience Bradford.',
            sections: [
                {
                    title: 'Règle Impérative de Service Bouteille',
                    text: `Pour toute réservation de table, le service bouteille est la norme. Notre exigence de base est la suivante : une bouteille de spiritueux ou de champagne Premium pour chaque groupe de quatre invités (1:4). Ce ratio garantit que chaque invité à la table bénéficie du service attendu. Nous vous encourageons à pré-sélectionner vos bouteilles pour un service immédiat à votre arrivée.`,
                    list: [
                        'Ratio Minimum: 1 Bouteille pour 4 Invités.',
                        'Service Charge: $200 appliqué à la facture totale.',
                        'Les minimums doivent être atteints en achats de bouteilles ou de services additionnels (Add-Ons).'
                    ]
                },
                {
                    title: 'Service Personnalisé et Prestige',
                    text: 'Notre catalogue de Champagne de prestige et de spiritueux rares est sans égal. Votre Host est formé pour vous conseiller sur les accords parfaits. Le service bouteille inclut des accompagnements illimités, un service de glace exclusif et la gestion sécurisée de votre table par notre personnel de sécurité dédié. C\'est un service complet, au-delà de la simple boisson.',
                    list: []
                }
            ],
            image: 'bottle-service.jpg'
        },
        'house_rules': {
            title: 'BRADFORD HOUSE RULES & ETIQUETTE',
            subtitle: 'Les protocoles discrets de notre sanctuaire.',
            sections: [
                {
                    title: 'Conduite et Respect de l\'Ambiance',
                    text: 'Le respect du personnel et des autres clients est une exigence absolue. Nous maintenons une atmosphère de sérénité et d\'élégance. Toute forme de comportement agressif, d\'harcèlement, ou de perturbation du service entraînera une expulsion immédiate sans remboursement.',
                    list: [
                        'Interdiction de fumer à l\'intérieur (y compris cigarettes électroniques/vapes).',
                        'Les manteaux et les grands sacs doivent être déposés au vestiaire obligatoire.',
                        'Toute détérioration de la propriété entraînera des frais de réparation immédiats.'
                    ]
                },
                {
                    title: 'Sécurité et Capacité',
                    text: 'Pour la sécurité de tous, nous respectons strictement les limites de capacité. Le déplacement de mobilier sans l\'autorisation du personnel est interdit. En cas d\'urgence, veuillez suivre les instructions claires de notre personnel de sécurité formé aux procédures d\'évacuation. Votre sécurité et votre confort sont nos priorités absolues.',
                    list: []
                }
            ],
            image: 'house-rules.jpg'
        },
        'guest_guidelines': {
            title: 'EXCLUSIVE GUEST GUIDELINES',
            subtitle: 'Le code de conduite de notre élite clientèle.',
            sections: [
                {
                    title: 'Discrétion et Sophistication',
                    text: 'Le succès du Bradford repose sur la discrétion de nos invités. Nous vous demandons d\'éviter les conversations bruyantes ou les comportements qui pourraient nuire à l\'intimité des autres tables. Si vous avez besoin d\'assistance, veuillez contacter discrètement votre Host de table. Notre personnel est votre concierge personnel pour la nuit.',
                    list: [
                        'Maintenir les discussions à un volume approprié.',
                        'Éviter de déranger les autres groupes ou de circuler inutilement.',
                        'Toute plainte ou problème doit être signalé immédiatement au personnel.'
                    ]
                },
                {
                    title: 'Utilisation des Médias Sociaux',
                    text: 'Bien que nous ne prohibions pas la prise de photos personnelles, nous vous demandons de ne pas photographier d\'autres clients sans leur consentement explicite. Le branding du Bradford ne doit être utilisé sur les réseaux sociaux que de manière valorisante et positive. Les flashs sont interdits dans les zones VIP pour des raisons de courtoisie.',
                    list: []
                }
            ],
            image: 'guest-code.jpg'
        },
    'events': {
            title: 'UPCOMING SHOWS & NIGHTLIFE EVENTS',
            subtitle: 'Les rendez-vous incontournables de la scène mondiale.',
            sections: [
                {
                    title: 'Résidences de DJs Internationaux',
                    text: 'Chaque week-end, le Bradford accueille une résidence de DJs de renommée mondiale, sélectionnés pour leur capacité à créer une énergie sophistiquée et exclusive. Les billets d\'entrée générale et les réservations de tables sont fortement recommandés, car ces événements se remplissent rapidement. Consultez notre calendrier pour les prochains "Gold Label Residencies" avec les artistes les plus prestigieux.',
                    list: [
                             'Entrée Générale (Standard) : $75',
                'Entrée Générale (Showcase International) : $90',
                'Accès VIP Standard (Balcons, Salon) : $120 - $150',
                'Accès VIP Showcase (Espaces Privés & Service Bouteille) : $200', 



   

       // --- MER. 31 DÉC. (NEW YEAR'S EVE 2026 - LE GRAND FINAL) ---
    'MER. 31 DÉC. | LA : SKRILLEX B2B FRED AGAIN.. - The Panorama Rooftop (Exclusive Live - Accès restreint)',
    'MER. 31 DÉC. | MIAMI : RICK ROSS & DJ KHALED - We The Best NYE (Special Guest Appearance - VIP Full)',
    'MER. 31 DÉC. | NYC : JUSTICE - Hyperdrama Midnight Set (Electro French Touch - VIP Full)',
    'MER. 31 DÉC. | SF : KEINEMUSIK (Crue, &ME, Adam Port) - Kloud SF (Afro House - $150)',

    // --- JEU. 1 JANV. (NEW YEAR'S DAY - THE REBIRTH) ---
    'JEU. 1 JANV. | LA : TYCHO - Sunrise New Year (Ambient/Chillwave Live - $90)',
    'JEU. 1 JANV. | MIAMI : MICHAEL BIBI - One Life Celebration (Tech House - $110)',
    'JEU. 1 JANV. | NYC : NICOLE MOUDABER - MoodRAW NYC (Heavy Techno Marathon - $90)',
    'JEU. 1 JANV. | SF : FOLAMOUR - House of Love (Disco & House Energy - $90)',

    // --- VEN. 2 JANV. (THE WEEKEND KICKOFF) ---
    'VEN. 2 JANV. | LA : OVERMONO - UK Bass & Garage Night (Electronic Live - $90)',
    'VEN. 2 JANV. | MIAMI : PAWSA - PAWSA\'s Grooves (Tech House / Extended Set - $90)',
    'VEN. 2 JANV. | NYC : REZZ - Spiral Tour (Mid-Tempo Bass & Dark Visuals - $90)',
    'VEN. 2 JANV. | SF : BICEP (DJ SET) - Chroma Experience (Progressive/Indie - $90)',

    // --- SAM. 3 JANV. (ROYAL SATURDAY) ---
    'SAM. 3 JANV. | LA : DOJA CAT - Planet Her Club Show (Special Pop Performance - Accès restreint)',
    'SAM. 3 JANV. | MIAMI : CLAPTONE - The Masquerade Miami (Deep House - $90)',
    'SAM. 3 JANV. | NYC : BARRY CAN\'T SWIM - When Will We Land? (Jazz-House/Electronic - $90)',
    'SAM. 3 JANV. | SF : THE MARTINEZ BROTHERS - Cuttin\' Headz SF (Tech House - $90)',

    // --- DIM. 4 JANV. (THE FINALE) ---
    'DIM. 4 JANV. | LA : HONEY DIJON - Jack Your Body (Classic House - $90)',
    'DIM. 4 JANV. | MIAMI : GORILLAZ SOUND SYSTEM - Damon Albarn Curated Set (Alternative - $90)',
    'DIM. 4 JANV. | NYC : FJAAK - Live Hardware Techno (Techno Energy - $90)',
    'DIM. 4 JANV. | SF : KEVIN DE VRIES - Afterlife Melodic Set (Techno - $75 - Set Spécial)'


                    ]
                },
                {
                    title: 'Événements Privés et Lancements',
                    text: 'Le Bradford est le lieu de prédilection des lancements de produits de luxe, des fêtes privées de célébrités et des événements d\'entreprise haut de gamme. Pour toute demande de privatisation complète ou partielle, veuillez contacter notre équipe Événements Spéciaux avec un minimum de trois semaines d\'avis.',
                    list: []
                }
            ],
            image: 'events-shows.jpg'
        },
// ... (Dans l'objet 'contentData' de la fonction navigate)
        'press_mentions': {
            title: 'PRESS MENTIONS & GLOBAL ACCLAIM',
            subtitle: 'La reconnaissance mondiale de la marque Bradford.',
            sections: [
                {
                    title: 'LE CLUB LE PLUS PARLÉ AU MONDE',
                    text: 'Le Bradford Nightclub est régulièrement cité par les publications de luxe et de lifestyle les plus prestigieuses comme étant le sommet de l\'hospitalité nocturne. Nos résidences de DJ, notre design primé et notre service Concierge définissent la référence mondiale. Le Bradford est le seul lieu où le luxe et la discrétion sont garantis.',
                    list: [
                        'Forbes Lifestyle : "Le standard d\'or de la vie nocturne. Une forteresse d\'exclusivité."',
                        'Vogue US : "Le design du Bradford Miami redéfinit l\'opulence clubbing."',
                        'Wall Street Journal : "Les politiques strictes du Bradford garantissent la clientèle la plus élitiste."',
                        'Architectural Digest : "Un design digne des plus grands palais. Chaque ville est un chef-d\'œuvre."',
                        'Bloomberg : "Où les transactions de plusieurs millions se concluent. Le club d\'affaires non officiel." '
                    ]
                },
                {
                    title: 'L\'IMPACT DE LA MARQUE',
                    text: 'Nous exigeons des médias de respecter notre image de prestige. Toute couverture médiatique doit être approuvée par notre département des Relations Publiques pour assurer la cohérence de notre marque de luxe. Notre excellence est une histoire qui doit être racontée avec le plus grand raffinement.',
                    list: []
                }
            ],
            image: 'press-logo-wall.jpg' 
        },


   'gallery': {
    title: 'THE BRADFORD VISUAL EXPERIENCE',
    subtitle: 'Immortaliser l\'éphémère du luxe.',
    
    // NOUVELLE STRUCTURE DE DONNÉES PAR CATÉGORIE VISUELLE
    photoGalleryData: {
        
        // CATÉGORIE 1 : VUES INTÉRIEURES (Images communes à toutes les villes)
        'INTÉRIEUR SIGNATURE (INSIDE)': [
            // Nous regroupons ici toutes les images qui montrent l'ambiance intérieure générale
            // Les chemins sont préfixés par la ville, mais la catégorie est unique.
            
          
          
            'Los Angeles/LA_Bradford_inside_02.jpeg',
            'Los Angeles/ LA_Bradford_inside_03.jpeg',
            'Los Angeles/LA_Bradford_inside_04.jpeg',
            'Los Angeles/LA_Bradford_inside_05.jpeg',
            'Los Angeles/LA_Bradford_inside_06.jpeg',
            'Los Angeles/LA_Bradford_inside_07.jpeg',
            'Los Angeles/LA_Bradford_inside_08.jpeg',
            
            // MIAMI INSIDE (Si vous en avez)
            // ...
        ],
        
        // CATÉGORIE 2 : VUES EXTÉRIEURES & FAÇADES
        'FAÇADES ET VUES EXTÉRIEURES': [
            // LA DEVENTURE
            'Los Angeles/LA_Bradford_deventure_01.jpeg',
            'Los Angeles/LA_Bradford_deventure_02.jpeg',
            'Los Angeles/LA_Bradford_deventure_03.jpeg',
            // MIAMI DEVENTURE
            'Miami/Miami_Bradford_deventure_01.jpeg',
            'Miami/Miami_Bradford_deventure_02.jpeg',
            'Miami/Miami_Bradford_deventure_03.jpeg',
            'Miami/Miami_Bradford_deventure_04.jpeg',
            'Miami/Miami_Bradford_deventure_05.jpeg',
            'Miami/Miami_Bradford_deventure_06.jpeg',
            'Miami/Miami_Bradford_deventure_07.jpeg',
            // NY DEVENTURE
            'New York/NY_Bradford_deventure_01.jpeg',
            'New York/NY_Bradford_deventure_02.jpeg',
            'New York/NY_Bradford_deventure_03.jpeg',
            'New York/NY_Bradford_deventure_04.jpeg',
            // SF DEVENTURE
            'San Francisco/SF_Bradford_deventure_01.jpeg',
            'San Francisco/SF_Bradford_deventure_02.jpeg',
            'San Francisco/SF_Bradford_deventure_03.jpeg',
        ],

        // CATÉGORIE 3 : L'EXPÉRIENCE (Foule & Ambiance)
        "L'EXPÉRIENCE (FOULE & ÉVÉNEMENTS)": [
            // LA FOULE
            'Los Angeles/LA_Bradford_deventure_foule_01.jpeg',
            'Los Angeles/LA_Bradford_deventure_foule_02.jpeg',
            // MIAMI FOULE
            'Miami/Miami_Bradford_deventure_foule_01.jpeg',
            'Miami/Miami_Bradford_deventure_foule_02.jpeg',
            'Miami/Miami_Bradford_deventure_foule_03.jpeg',
            // NY FOULE
            'New York/NY_Bradford_deventure_foule_01.jpeg',
            // SF FOULE
            'San Francisco/SF_Bradford_deventure_foule_01.jpeg',
            'San Francisco/SF_Bradford_deventure_foule_02.jpeg',
        ]
    },

    sections: [
        {
            title: 'Design Intérieur Signature',
            text: 'Chaque détail du Bradford, de nos lustres en cristal noir à nos banquettes en velours sur mesure, est conçu pour stimuler l\'opulence. La galerie présente un aperçu de l\'architecture et du design qui définissent notre statut de club le plus prestigieux au monde. Notez que cette galerie ne montre qu\'une fraction de l\'expérience.',
            list: []
        }
    ],
    image: 'club-interior.jpg'
},

        'contact': {
            title: 'CONTACT & CONCIERGE SUPPORT',
            subtitle: 'Votre ligne dédiée, 24/7.',
            sections: [
                {
                    title: 'Concierge de Réservation Personnelle',
                    text: 'Notre équipe Concierge est disponible pour toutes les demandes au-delà de la réservation standard en ligne : groupes de 15 personnes ou plus, événements spéciaux, bouteilles ultra-rares non listées au menu. Nous garantissons une réponse sous quatre heures pour toute demande envoyée avant 18h00 CET.',
                    list: [
                        'Ligne Concierge : +1 305-VIP-BRAD (Disponible 10h00 - 20h00 EST)',
                        'Email Réservations : reservations@bradfordnightclub.com',
                        'Email Média/Presse : media@bradfordnightclub.com'
                    ]
                }
            ],
            image: 'contact-desk.jpg'
        },
        'about_bradford': {
            title: 'ABOUT BRADFORD NIGHTCLUB',
            subtitle: 'Une marque mondiale, synonyme de nightlife de prestige.',
            sections: [
                {
                    title: 'Notre Vision de l\'Exclusivité',

      text: 'Fondé il y a près de huit ans, Bradford Night Club s\'est imposé comme une référence mondiale du nightlife ultra-luxueux. Présent dans quatre villes emblématiques: Miami, Los Angeles, New York et San Francisco, chaque établissement allie design exclusif, ambiance raffinée et service sur-mesure pour une clientèle exigeante. Bradford n\'est pas seulement un lieu pour danser ou écouter les meilleurs DJs internationaux : c\'est un univers dédié à l\'excellence du divertissement, où chaque détail, du mobilier aux cocktails signatures, est pensé pour offrir une expérience immersive unique.  Les espaces VIP, les tables de prestige et le service bouteille garantissent que chaque soirée se transforme en événement mémorable parfaitement orchestré par un personnel formé à anticiper chaque désir. Le fondateur passionné par le lifestyle et les expériences haut de gamme a personnellement investi dans une vision où luxe et discrétion se rencontrent, chaque Club Bradford reflète cette philosophie des intérieurs élégants, des technologies de pointe, et une carte de boisson et de cocktail parmi les plus prestigieuses au monde, allant des champagnes rares ou spirituelles limitées, ainsi que des créations signatures exclusivement conçues pour nos invités VIP. Ouvert quatre soirs par semaine, de jeudi à dimanche, de minuit à 6h, Bradford attire une moyenne de 5500 invités par soirée dont un segment VIP de 800 personnes bénéficiant d\'un service entièrement personnalisé. Que vous découvriez Bradford pour la première fois ou que vous soyez un habitué, chaque visite est une immersion dans un univers où luxe, élégance et sophistication se rencontrent, garantissant que votre soirée reste gravée dans les mémoires.',
         

   list: [
                        'Fondé sur le concept du service bouteille exclusif.',
                        'Présence mondiale dans quatre métropoles du luxe.',
                        'Design intérieur primé pour son opulence.'
                    ]
                }
            ],
            image: 'about-vision.jpg'
        },
     'careers': {
    title: 'CAREERS: THE GLOBAL EXCELLENCE',
    subtitle: 'Intégrez la légende Bradford. Là où le luxe rencontre l\'invisible.',
    sections: [
        {
            title: 'L\'ART DE L\'HOSPITALITÉ RADICALE',
            text: 'Travailler au sein de l\'écosystème Bradford ne s\'apparente pas à un emploi conventionnel ; c\'est une immersion dans les standards les plus exigeants de l\'hôtellerie de nuit internationale. Nous recherchons des profils dont la discrétion n\'a d\'égal que l\'élégance de leur exécution. Chaque collaborateur devient le gardien de notre promesse : une expérience sans couture pour l\'élite mondiale.',
            list: [
                '⭐ GUEST RELATIONS & VIP HOST : Maîtrise parfaite des codes du luxe et de l\'étiquette internationale.',
                '🍸 CRAFT MIXOLOGY : Experts en spiritueux rares et création de signatures sensorielles.',
                '🛡️ SHADOW UNIT : Sécurité périmétrale et protection rapprochée (Expérience militaire ou tactique souhaitée).',
                '🎭 ENTERTAINMENT ELITE : Artistes et performeurs à l\'esthétique avant-gardiste.'
            ]
        },
        {
            title: 'PRÉROGATIVES & ENGAGEMENTS DU GROUPE',
            text: 'En rejoignant nos rangs, vous accédez à un réseau mondial et à des conditions d\'exercice privilégiées, à la hauteur de votre investissement.',
            list: [
                '🌐 RÉSEAU GLOBAL : Opportunités de déploiement sur nos sites de Miami, Los Angeles et New York.',
                '💎 RÉMUNÉRATION PRESTIGE : Packages salariaux indexés sur l\'excellence du service et bonus de performance.',
                '🖋️ FORMATION CONTINUE : Immersion dans les protocoles de conciergerie de luxe et gestion de crise.',
                '🎩 SUR-MESURE : Uniformes et dotations fournis par nos maisons de couture partenaires.'
            ]
        },
        {
            title: 'PROTOCOLE DE RECRUTEMENT OFFICIEL',
            text: 'The Bradford traite chaque demande avec la plus stricte confidentialité. Compte tenu de l\'exclusivité de nos postes, nous n\'acceptons que les dossiers présentant des références vérifiables dans le secteur de l\'ultra-luxe.',
            list: [
                '📩 TALENT ACQUISITION : careers@bradfordnightclub.com',
                '📞 LIGNE CONCIERGE (RH) : +1 305-VIP-BRAD (Ext. Talent)',
                '📁 DOSSIER REQUIS : Curriculum Vitae, Portfolio Visuel (Instagram pro) et Lettre d\'intention.',
                '⚠️ NOTE : Une enquête de moralité approfondie est systématiquement menée pour les postes de la Shadow Unit.'
            ]
        }
    ],
    image: 'careers-hiring.jpg'
},

        'legal': {
            title: 'LEGAL & PRIVACY POLICIES',
            subtitle: 'Transparence et confidentialité pour notre clientèle.',
            sections: [
                {
                    title: 'Conditions Générales d\'Utilisation et Avertissement',
                    text: 'En accédant au site et en effectuant une réservation, vous acceptez nos Conditions Générales. Le Bradford décline toute responsabilité pour les objets perdus ou volés. L\'accès au club est considéré comme un consentement à être photographié ou filmé pour les supports marketing du club (les photos individuelles ne sont pas publiées sans consentement si possible).',
                    list: [
                        'Protection des données (RGPD/CCPA) garantie.',
                        'Politique de non-responsabilité stricte pour les effets personnels.',
                        'Les prix affichés sur le menu en ligne sont indicatifs et peuvent changer sans préavis.'
                    ]
                }
            ],
            image: 'legal-documents.jpg'
        },
        'faq': {
            title: 'FREQUENTLY ASKED QUESTIONS',
            subtitle: 'Toutes les réponses pour une soirée sans accroc.',
            sections: [
                {
                    title: 'Questions Courantes et Réponses de Concierge',
                    text: 'Notre section FAQ couvre toutes les préoccupations majeures, de la logistique de la réservation à l\'étiquette de la soirée. Si vous ne trouvez pas votre réponse, veuillez utiliser la ligne Concierge. Nous avons simplifié les réponses pour que vous puissiez vous concentrer sur votre plaisir.',
                    list: [
                        'Quel est l\'âge minimum? 21 ans, sans exception.',
                        'Puis-je changer ma table? Non, la table est assignée selon le Minimum Spend.',
                        'Le dépôt est-il remboursable? Uniquement en crédit de club pour une annulation plus de 48 heures à l\'avance.'
                    ]
                }
            ],
            image: 'faq-help.jpg'
        },
        'press': {
            title: 'PRESS & MEDIA INQUIRIES',
            subtitle: 'Gestion des relations publiques de la marque de luxe.',
            sections: [
                {
                    title: 'Accréditation et Partenariats',
                    text: 'Toute demande d\'accréditation (blogueurs, journalistes, photographes d\'événements) doit être soumise via l\'email Media Relations au moins une semaine à l\'avance. Nous sélectionnons nos partenaires pour garantir que la couverture médiatique reflète la valeur de notre marque. Les kits de presse et les ressources de marque sont disponibles sur demande.',
                    list: [
                        'Accès aux journalistes limité et sur rendez-vous uniquement.',
                        'Utilisation du logo Bradford soumise à autorisation stricte.',
                        'Toute publication non approuvée sera signalée.'
                    ]
                }
            ],
            image: 'press-room.jpg'
        },
        'location': {
            title: 'GLOBAL LOCATIONS & HOURS',
            subtitle: 'Les capitales du luxe, notre maison.',
            sections: [
                {
                    title: 'Nos Adresses d\'Exception',
                    text: 'Le Bradford opère dans les quartiers les plus exclusifs de quatre villes mondiales, garantissant une clientèle de haut niveau. Chaque lieu est unique en son design, mais uniforme dans son engagement envers l\'excellence. Les heures d\'ouverture sont standardisées, mais peuvent être prolongées pour des événements spéciaux ou des jours fériés.',
                    list: [
                        'Miami 🇺🇸: 101 Ocean Drive, Miami Beach, Florida 33139, Jeu–Dim | 00h00 – 06h00',
                        'Los Angeles 🇺🇸: 850 Sunset Boulevard, Beverly Hills, California 90210, Jeu–Dim | 00h00 – 06h00',

 'New York 🇺🇸: 25 Park Avenue, Manhattan, New York, NY 10016, Jeu–Dim | 00h00 – 06h00',

'San Francisco 🇺🇸: 555 Lombard Street, San Francisco, California 94133, Jeu–Dim | 00h00 – 06h00'



                    ]
                }
            ],
            image: 'global-map.jpg'
        }
    };

    // Logique de rendu pour les pages de contenu
    if (contentData[pageId]) {
        const data = contentData[pageId];
        let html = `<h1 class="title-page">${data.title}</h1>
                    <p class="subtitle-page">${data.subtitle}</p>`;

        data.sections.forEach(section => {
            html += `<section class="policy-section">
                        <h2>${section.title.toUpperCase()}</h2>
                        <p>${section.text}</p>`;
            
            if (section.list.length > 0) {
                html += `<ul>`;
                section.list.forEach(item => {
                    html += `<li>${item}</li>`;
                });
                html += `</ul>`;
            }
            html += `</section>`;
        });

                // --- NOUVEAU BLOC : Affichage de l'image réelle ---
        // NOTE IMPORTANTE : Les images doivent être dans le même dossier que le fichier HTML ou JS.
        html += `
            <div class="policy-image-container" style="margin-top: 40px; text-align: center;">
                <img src="${data.image}" alt="Image illustrant la politique de ${pageId}" 
                     style="max-width: 100%; height: auto; border: 2px solid var(--gold); border-radius: 8px; box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);">
            </div>
        `;
        // --- FIN DU NOUVEAU BLOC ---


        APP_CONTENT.innerHTML = html;
        return; // Sortir si la page est trouvée
    }

    // --- Rendu des pages spéciales (Menu, Home, Reservations) ---
    switch (pageId) {
        // PAGES SPÉCIALES
        case 'home': renderHomePage(); break;
        case 'menu': renderBottleMenuPage(); break;
        case 'reservations': renderReservationPage(); break;
        case 'gallery': renderGalleryPage(); break; // Utilisera la version précédente ou à mettre à jour
        case 'location': renderLocationPage(); break; // Utilisation de la fonction spécifique
case 'concierge': renderConciergePage(); break; 
        default: navigate('home');
    }
}


/** Rendu du Footer (avec plus de liens) */
function renderFooter() {
    APP_FOOTER.innerHTML = `
        <div class="footer-links">
            <a href="#" onclick="navigate('location')">LOCATIONS & HOURS</a>
            <a href="#" onclick="navigate('events')">EVENTS CALENDAR</a>
  <a href="#" onclick="navigate('press_mentions')">PRESS MENTIONS</a>
            <a href="#" onclick="navigate('gallery')">MEDIA GALLERY</a>
            |
            <a href="#" onclick="navigate('dress_code')">DRESS CODE</a>
            <a href="#" onclick="navigate('vip_policy')">VIP POLICY</a>
            <a href="#" onclick="navigate('house_rules')">HOUSE RULES</a>
            |
            <a href="#" onclick="navigate('about_bradford')">ABOUT BRADFORD</a>
            <a href="#" onclick="navigate('careers')">CAREERS</a>
            <a href="#" onclick="navigate('press')">PRESS & MEDIA</a>
            <a href="#" onclick="navigate('faq')">FAQ</a>
            <a href="#" onclick="navigate('legal')">LEGAL</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} Bradford Nightclub. All rights reserved. Miami • Los Angeles • New York • San Francisco.</p>
    `;
}


function renderBottleMenuPage(filterCategory = 'all', sortBy = 'default') {
    let html = `
        <h1 class="title-page">BRADFORD BOTTLE MENU</h1>
        <p class="subtitle-page">Découvrez notre collection exclusive, service bouteille VIP uniquement.</p>
        
        <p style="text-align: center; color: var(--gold); margin-bottom: 2rem; font-weight: 600;">
            Tous les prix affichés sont hors service. 
            Cliquez sur le prix d'une bouteille pour voir le COÛT TOTAL (TTC).
        </p>
        <p style="text-align: center; color: #999; margin-bottom: 1rem;">
            1 bouteille minimum par 4 invités. Prix en USD, hors taxes et ${APP_DATA.pricing_rules.service_charge_pct * 100}% service charge.
        </p>

     <div style="text-align: center; margin: 10px 0 50px 0;">
            <button onclick="openOfficialMenu()" 
                    style="background:none; border:none; color:var(--gold); font-family:'Cinzel'; font-size:0.55rem; letter-spacing:4px; cursor:pointer; padding:10px; opacity:0.6; transition:0.3s; border-bottom: 1px solid rgba(212,175,55,0.2);">
                VIEW FULL ESTABLISHMENT CARD
            </button>
        </div>


        <div class="vip-filter-bar">
            <div class="filter-item">
                <label>CATÉGORIE</label>
                <select id="cat-filter" onchange="applyBottleFilters()">
                    <option value="all">TOUTES LES SÉLECTIONS</option>
                    ${Object.keys(APP_DATA.menus).map(cat => `<option value="${cat}" ${filterCategory === cat ? 'selected' : ''}>${cat.toUpperCase()}</option>`).join('')}
                </select>
            </div>
            <div class="filter-item">
                <label>TRIER PAR PRIX</label>
                <select id="price-sort" onchange="applyBottleFilters()">
                    <option value="default">SÉLECTION DU CLUB</option>
                    <option value="asc" ${sortBy === 'asc' ? 'selected' : ''}>PRIX CROISSANT</option>
                    <option value="desc" ${sortBy === 'desc' ? 'selected' : ''}>PRIX DÉCROISSANT</option>
                </select>
            </div>
        </div>
    `;

    for (const category in APP_DATA.menus) {
        // Logique de filtrage par catégorie
        if (filterCategory !== 'all' && filterCategory !== category) continue;

        if (APP_DATA.menus.hasOwnProperty(category)) {
            let items = [...APP_DATA.menus[category]];

            // Logique de tri par prix
            if (sortBy === 'asc') items.sort((a, b) => a.price - b.price);
            if (sortBy === 'desc') items.sort((a, b) => b.price - a.price);

            html += `<h2 class="section-header">${category.toUpperCase()}</h2>`;
            html += `<div class="menu-grid">`;

            items.forEach(item => {
                const isLimited = item.isLimited;
                const basePrice = item.price;
                const finalPrice = calculateFinalPrice(basePrice);
                const priceText = formatPrice(basePrice);
                
                
html += `
    <div class="menu-item-card ${isLimited ? 'premium-limited-card' : ''}" 
         onclick="showFinalPriceAlert('${item.name}', ${basePrice}, ${finalPrice})">
        
        ${isLimited ? `
            <div class="prestige-tag">
                <span style="letter-spacing: 2px;">PRESTIGE EDITION</span>
            </div>
        ` : ''}

        <h3 class="item-name">${item.name}</h3>
        <p class="item-size">${item.size || item.description || ''}</p>
        
        <div class="item-details">
            <p class="item-rarity" style="color: ${isLimited ? 'var(--gold)' : 'var(--teal)'};">
                ${item.rarity || item.type || ''}
            </p>
                            
                            <span class="item-price item-price-clickable" title="Cliquez pour voir le prix total TTC">
                                ${priceText}
                            </span>
                        </div>
                        
                        <button class="cta-button" style="width: 100%; margin-top: 15px; font-size: 0.9rem; background-color: var(--teal); color: var(--navy); box-shadow: none;" 
                            onclick="event.stopPropagation(); openBottleCheckout('${item.name}', ${basePrice}, ${finalPrice})">
                            Ajouter à la Pré-commande
                        </button>
                    </div>
                `;
            });
            html += `</div>`;
        }
    }
    APP_CONTENT.innerHTML = html;
}

// Fonction indispensable pour que le changement de select relance la page
function applyBottleFilters() {
    const cat = document.getElementById('cat-filter').value;
    const sort = document.getElementById('price-sort').value;
    renderBottleMenuPage(cat, sort);
}


function openBottleCheckout(bottleName, priceHT, priceTTC) {
    const serviceFee = priceTTC - priceHT;

    // Utilisation de APP_CONTENT comme tu l'as défini
    APP_CONTENT.innerHTML = `
        <div class="checkout-container" style="padding: 20px; animation: fadeIn 0.8s ease;">
            <h1 class="title-page" style="font-size: 1.8rem;">BOTTLE SERVICE</h1>
            <p style="color:var(--gold); text-align:center; font-size:0.7rem; letter-spacing:2px; margin-bottom:30px;">PRE-ORDER PROTOCOL</p>

            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--gold); padding: 25px; margin-bottom: 30px; position: relative;">
                <span style="font-size: 0.6rem; color: var(--gold); letter-spacing: 2px;">SÉLECTION PRÉ-COMMANDE</span>
                <h2 style="font-family:'Cinzel'; color:#fff; margin:10px 0; font-size: 1.4rem;">${bottleName}</h2>
                
                <div style="border-top: 1px solid rgba(212, 175, 55, 0.2); margin-top: 15px; padding-top: 15px; font-size: 0.8rem;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px; opacity: 0.8;">
                        <span>PRIX BOUTEILLE:</span>
                        <span>$${priceHT.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px; opacity: 0.8;">
                        <span>TAXES & SERVICE (20%):</span>
                        <span>$${serviceFee.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:1.1rem; color:var(--gold); font-weight:bold; margin-top:10px; border-top:1px dotted #444; padding-top:10px;">
                        <span>MONTANT TOTAL:</span>
                        <span>$${priceTTC.toLocaleString()}</span>
                    </div>
                </div>
            </div>


            <div style="background: rgba(0,0,0,0.5); border: 1px solid #1a1a1a; padding: 20px; margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <span style="font-size: 0.55rem; color: #555; letter-spacing: 2px;">SIMULATEUR DE QUOTE-PART</span>
                    <div style="display: flex; align-items: center; border: 1px solid #333; padding: 5px 10px;">
                        <span style="font-size: 0.6rem; color: #888; margin-right: 10px;">INVITÉS:</span>
                        <input type="number" id="guest-count" value="1" min="1" oninput="updateSplitResult(${priceTTC})" 
                               style="width: 40px; background: transparent; border: none; color: var(--gold); font-family: 'Inter'; font-weight: bold; outline: none; text-align: center;">
                    </div>
                </div>
                <div id="split-result" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #111; padding-top: 15px;">
                    <span style="font-size: 0.65rem; color: #fff; letter-spacing: 1px;">PART INDIVIDUELLE :</span>
                    <span style="font-family: 'Cinzel'; color: var(--gold); font-size: 1.1rem;">$${priceTTC.toLocaleString()}</span>
                </div>
            </div>


            <div class="checkout-box" style="background: #0a1a3a; padding: 20px; border: 1px solid #222;">
                <div style="background: #000; height: 50px; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid #333; margin-bottom: 20px; cursor: pointer;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" style="height: 20px; filter: invert(1);">
                </div>

                <div style="text-align: center; margin-bottom: 15px;">
                    <span style="font-size: 0.6rem; color: #555; letter-spacing: 2px;">— OR CARD —</span>
                </div>

                <div style="margin-bottom: 15px;">
                    <input type="text" class="payment-input" placeholder="CARDHOLDER NAME" style="width:100%; margin-bottom:10px;">
                    <div style="position: relative;">
                        <input type="text" class="payment-input" placeholder="0000 0000 0000 0000" style="width:100%;">
                        <div style="position: absolute; right: 10px; top: 10px; display: flex; gap: 5px;">
                            <img src="https://img.icons8.com/color/48/000000/visa.png" style="height: 18px;">
                            <img src="https://img.icons8.com/color/48/000000/mastercard.png" style="height: 18px;">
                        </div>
                    </div>
                    <div style="display:flex; gap:10px; margin-top: 10px;">
                        <input type="text" class="payment-input" placeholder="MM/YY" style="flex:1;">
                        <input type="text" class="payment-input" placeholder="CVC" style="flex:1;">
                    </div>
                </div>

                <button class="cta-button" 
                        style="width:100%; height: 50px; background: var(--gold); color: black; font-weight: bold;" 
                        onclick="confirmBottleOrder(\`${bottleName}\`)">
                    AUTHORIZE PRE-ORDER
                </button>

                <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px; opacity: 0.3; filter: grayscale(1);">
                    <img src="https://img.icons8.com/color/48/000000/amex.png" width="22">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/lock.png" width="15">
                    <span style="font-size: 0.5rem; letter-spacing: 1px; align-self: center;">SSL SECURED</span>
                </div>
            </div>

            <button onclick="renderBottleMenuPage()" style="width:100%; background:none; border:none; color:#555; margin-top:20px; text-decoration:underline; font-size:0.7rem; cursor:pointer;">RETOUR AU MENU</button>
        </div>
    `;
    window.scrollTo(0,0);
}

window.confirmBottleOrder = function(bottleName) {
    // CORRECTION : On cible APP_CONTENT au lieu de 'reservations'
    // car ton formulaire a déjà remplacé le contenu de APP_CONTENT
    const container = typeof APP_CONTENT !== 'undefined' ? APP_CONTENT : document.getElementById('reservations');

    container.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:400px; text-align:center;">
            <div class="loader-gold"></div>
            <p style="color:var(--gold); letter-spacing:3px; font-size:0.7rem; margin-top:20px;">AUTHORIZING TRANSACTION...</p>
        </div>
    `;
    window.scrollTo(0,0);

    setTimeout(() => {
        const orderID = "BRD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        container.innerHTML = `
            <div class="success-page-container" style="padding: 40px 20px; animation: fadeIn 1s ease-out;">
                <div style="text-align: center; margin-bottom: 40px;">
                    <div style="width:60px; height:60px; border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto; color:var(--gold); font-size:1.5rem;">✓</div>
                    <h1 style="font-family: 'Cinzel'; color: var(--gold); letter-spacing: 5px; margin-top: 20px; font-size:1.5rem;">ACCESS GRANTED</h1>
                    <p style="font-size: 0.6rem; color: #fff; opacity: 0.6; letter-spacing: 2px;">YOUR PRE-ORDER IS SECURED</p>
                </div>

                <div class="digital-pass-card" style="background:#000; border:1px solid rgba(212,175,55,0.4); max-width:350px; margin:0 auto; box-shadow:0 0 50px rgba(0,0,0,0.5);">
                    <div style="background:rgba(212,175,55,0.1); padding:10px; font-size:0.5rem; letter-spacing:2px; display:flex; justify-content:space-between; border-bottom:1px solid rgba(212,175,55,0.2);">
                        <span>THE BRADFORD | VIP GUEST PASS</span>
                        <span>OFFICIAL ACCESS</span>
                    </div>
                    
                    <div style="padding:30px; text-align:center;">
                        <span style="font-size:0.5rem; color:var(--gold); letter-spacing:2px;">VIP ITEM SELECTION</span>
                        <div style="font-family:'Cinzel'; font-size:1.1rem; color:#fff; margin:10px 0 25px 0;">${bottleName.toUpperCase()}</div>
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${orderID}&color=D4AF37&bgcolor=000" 
                             style="border:5px solid #fff; width:150px; height:150px; margin:0 auto; display:block;">
                    </div>

                    <div style="display:flex; border-top:1px dashed rgba(212,175,55,0.2); padding:15px; font-size:0.6rem; justify-content:space-around; text-align:center;">
                        <div><label style="display:block; opacity:0.5;">ORDER ID</label><span>${orderID}</span></div>
                        <div><label style="display:block; opacity:0.5;">STATUS</label><span style="color:#00ff88;">AUTHORIZED</span></div>
                    </div>
                </div>

                <div style="max-width:350px; margin:30px auto; text-align:left; font-size:0.7rem; color:rgba(255,255,255,0.7); border-left:1px solid var(--gold); padding-left:20px;">
                    <p style="margin-bottom:10px;"><b style="color:var(--gold);">01.</b> PRÉSENTEZ CE QR CODE AU COMPTOIR VIP HOST.</p>
                    <p style="margin-bottom:10px;"><b style="color:var(--gold);">02.</b> VOTRE TABLE SERA DRESSÉE À VOTRE ARRIVÉE.</p>
                    <p style="margin-bottom:10px;"><b style="color:var(--gold);">03.</b> UNE PIÈCE D'IDENTITÉ EST REQUISE.</p>
                </div>

  <button class="cta-button" onclick="window.scrollTo(0,0); navigate('home')" style="width:100%; max-width:350px; background:var(--gold); color:#000; font-weight:bold; height:50px; margin-top:20px; border:none; cursor:pointer;">
    BACK TO CLUB HOME
</button>

            </div>
        `;
        window.scrollTo(0,0);
    }, 2000);
};


/** Rendu de la page de Réservation (avec logique) */
function renderReservationPage() {
    APP_CONTENT.innerHTML = `
        <h1 class="title-page">RÉSERVATION TABLE VIP</h1>
        <p class="subtitle-page">Calculez vos exigences de service bouteille</p>
        
             <div class="reservation-controls" style="display: flex; flex-direction: column; gap: 30px; margin-top: 3rem;">

            
            <div class="form-section">
                <h2 class="section-header" style="font-size: 1.8rem;">1. Détails de la Réservation</h2>
                
                <div class="input-group">
                    <label for="res-city" style="display: block; margin-bottom: 0.5rem; color: var(--teal); font-weight: 600;">Sélectionnez la Ville</label>
                <select id="res-city" style="width: 100%; padding: 8px; font-size: 0.95rem; background-color: rgba(255, 255, 255, 0.1); border: 1px solid var(--teal); color: var(--ivory); border-radius: 5px;">

                        ${APP_DATA.venue.locations.map(city => `<option value="${city}">${city}</option>`).join('')}
                    </select>
                </div>
                
                <div class="input-group" style="margin-top: 2rem;">
                    <label for="res-date" style="display: block; margin-bottom: 0.5rem; color: var(--teal); font-weight: 600;">Date de l'Événement</label>
                <input type="date" id="res-date" onchange="calculateRequirements()" style="width: 100%; padding: 8px; font-size: 0.95rem; background-color: rgba(255, 255, 255, 0.1); border: 1px solid var(--teal); color: var(--ivory); border-radius: 5px;">

                </div>

                <div class="input-group" style="margin-top: 2rem;">
                    <label for="res-guests" style="display: block; margin-bottom: 0.5rem; color: var(--teal); font-weight: 600;">Nombre d'Invités (Max 8 par table)</label>
                  <input type="number" id="res-guests" min="1" max="15" value="4" oninput="calculateRequirements()" style="width: 100%; padding: 8px; font-size: 0.95rem; background-color: rgba(255, 255, 255, 0.1); border: 1px solid var(--teal); color: var(--ivory); border-radius: 5px;">

                </div>

                <p id="res-warning" style="color: red; margin-top: 1rem;"></p>
            </div>

            <div class="summary-card" style="background-color: rgba(212, 175, 55, 0.1); border: 1px solid var(--gold); padding: 2rem; border-radius: 10px;">
                <h3 style="font-family: 'Cinzel', serif; color: var(--gold); margin-bottom: 1.5rem;">2. Récapitulatif des Exigences</h3>
                
                <div class="summary-line" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed rgba(255, 255, 255, 0.1);">
                    <span>Minimum Spend Requis</span>
                    <span id="summary-min-spend" style="font-weight: 700; color: var(--teal); font-size: 1.2rem;">${formatPrice(0)}</span>
                </div>
                
                <div class="summary-line" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed rgba(255, 255, 255, 0.1);">
                    <span>Bouteilles Minimum (Règle 1/4)</span>
                    <span id="summary-min-bottles" style="font-weight: 700; color: var(--teal); font-size: 1.2rem;">0</span>
                </div>
                
                <div class="summary-line" style="display: flex; justify-content: space-between; padding: 8px 0;">
                    <span>Dépôt de Garantie</span>
                    <span id="summary-deposit" style="font-weight: 700; color: var(--ivory);">${formatPrice(APP_DATA.pricing_rules.deposit_amount)}</span>
                </div>

<div class="summary-line">
                    <span>Taxe + Service (20%)</span>
                    <span style="color: var(--teal);">Appliqué à la facture finale</span>
                </div>
                
                <button class="cta-button" id="cta-reserve" style="width: 100%; margin-top: 2rem;" onclick="handleReservationSubmit()">
                    Payer le Dépôt
                </button>
  <p style="text-align: center; font-size: 0.8rem; color: #666; margin-top: 1rem;">
                    Un QR Code vous sera envoyé après confirmation pour le Pre-Scan à l'entrée.
                </p>
            </div>
        </div>
    `;
    // Initialisation
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('res-date').value = today;
    calculateRequirements();
}

/** Logique critique: calcule Min Spend et Min Bottles */
function calculateRequirements() {
    const guests = parseInt(document.getElementById('res-guests').value) || 1;
    const dateString = document.getElementById('res-date').value;
    const day = getDayOfWeek(dateString);

    const minSpendEl = document.getElementById('summary-min-spend');
    const minBottlesEl = document.getElementById('summary-min-bottles');
    const warningEl = document.getElementById('res-warning');
    const ctaButton = document.getElementById('cta-reserve');

    let minSpend;
    const maxGuestsPerTable = APP_DATA.venue.table_max_seats;
    
    // 1. Minimum Spend (Logique J/S/D)
    const isWeekend = day === 5 || day === 6; // 5=Ven, 6=Sam
    minSpend = isWeekend 
        ? APP_DATA.pricing_rules.table_min_spend.fri_sat
        : APP_DATA.pricing_rules.table_min_spend.thu_sun;

    // 2. Minimum Bottles (Logique ceil(guests / 4))
    const minBottles = Math.ceil(guests / APP_DATA.pricing_rules.min_bottles_per_guests);

    // 3. Avertissements/Validation
    ctaButton.disabled = false;
    if (guests > maxGuestsPerTable) {
        warningEl.innerHTML = `⚠️ Max ${maxGuestsPerTable} invités/table. Pour ${guests} invités, deux tables sont requises. Contactez le Concierge.`;
        ctaButton.disabled = true;
    } else if (guests < 1) {
        warningEl.textContent = "Le nombre d'invités doit être au moins 1.";
        ctaButton.disabled = true;
    } else {
        warningEl.textContent = "";
    }
    
    // 4. Mise à jour de l'UI
    minSpendEl.textContent = formatPrice(minSpend);
    minBottlesEl.textContent = minBottles;
}

/** Simule l'envoi de la réservation */
function handleReservationSubmit() {
    alert(`
        ✅ RÉSERVATION SOUMISE (PAIEMENT SIMULÉ)
        
        Merci pour votre réservation.
        Exigences: Min Spend ${document.getElementById('summary-min-spend').textContent}, ${document.getElementById('summary-min-bottles').textContent} Bouteilles Min.
        
        Votre Host personnel vous contactera.
    `);
    navigate('home'); 
}

/** Rendu de la page d'accueil - CORRECTION FINALE */
function renderHomePage() {
    APP_CONTENT.innerHTML = `
        <h1 class="title-page">WELCOME TO THE BRADFORD</h1>
        <p class="subtitle-page">MIAMI · LOS ANGELES · NEW YORK · SAN FRANCISCO</p>

    <h2 class="section-header">RÈGLES D'ACCÈS ET DE RÉSERVATION</h2>
        <div class="menu-grid">
            <div class="menu-item-card">
                <h3 class="item-name" style="color: var(--teal);">Heures d'Ouverture</h3>
                <p>Queue dès 23:30. Ouverture des portes à 00:00. L'entrée peut être limitée après 02:00.</p>
            </div>
            <div class="menu-item-card">
                <h3 class="item-name" style="color: var(--teal);">Service Obligatoire</h3>
                <p>Une charge de service de 20% est automatiquement appliquée au sous-total de toutes les commandes (bottles, add-ons).</p>
            </div>
            <div class="menu-item-card">
                <h3 class="item-name" style="color: var(--teal);">Min Spend / Table</h3>
                <p>Minimum Bottle Spend obligatoire. $3000 (Jeu/Dim) et $5000 (Ven/Sam) pour sécuriser la table.</p>
            </div>
        </div>
        
         <div class="hero-section" style="background-image: url('placeholder-video-or-photo.jpg'); height: 500px; background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; margin-bottom: 0;">
            <div style="text-align: center; background: rgba(0,0,0,0.6); padding: 20px; border-radius: 10px;">
                <h2 style="color: var(--ivory); font-family: 'Cinzel', serif; font-size: 2.5rem;">L'Exclusivité Redéfinie.</h2>
      <button class="cta-button" onclick="window.scrollTo(0,0); navigate('reservations')">Réserver une Table VIP</button>

            </div>
        </div>

<div class="bradford-prestige-stats">
    <div class="stat-container left" data-aos="fade-right">
        <div class="stat-wrapper">
            <span class="stat-number">6,000</span>
            <div class="stat-gold-line"></div>
            <span class="stat-desc">CAPACITÉ MAXIMALE</span>
        </div>
    </div>

    <div class="stat-emblem" data-aos="zoom-in">
        <div class="emblem-circle">
            <span class="emblem-letter">B</span>
            <div class="emblem-spin"></div>
        </div>
    </div>

    <div class="stat-container right" data-aos="fade-left">
        <div class="stat-wrapper">
            <span class="stat-number">30</span>
            <div class="stat-gold-line"></div>
            <span class="stat-desc">TABLES VIP PRIVÉES</span>
        </div>
    </div>
</div>


`;

}

// Définir la date actuelle pour la démo
// En production, vous utiliseriez 'new Date();'
const dateActuelle = new Date(); 

// --- BASE DE DONNÉES COMPLÈTE DES ÉVÉNEMENTS ---
const donneesEvenements = [
    // Jeudi 12 Février
    { date: '2026-02-12', jour: 'JEU.', ville: 'LA', artiste: 'STORMZY', details: 'UK Rap Showcase (This Is What I Mean - $90)' },
    { date: '2026-02-12', jour: 'JEU.', ville: 'MIAMI', artiste: 'AMAARAE', details: 'Fountain Baby Tour (Alt-Pop/Afro - $90)' },
    { date: '2026-02-12', jour: 'JEU.', ville: 'NYC', artiste: 'BRUTALISMUS 3000', details: 'Berlin Nu-Gen Techno (Live Punk - $90)' },
    { date: '2026-02-12', jour: 'JEU.', ville: 'SF', artiste: 'CHANNEL TRES', details: 'Compton Tech-House (DJ Set & Vocals - $90)' },

    // Vendredi 13 Février
    { date: '2026-02-13', jour: 'VEN.', ville: 'LA', artiste: '21 SAVAGE', details: 'American Dream Night (Exclusive Showcase - $90)' },
    { date: '2026-02-13', jour: 'VEN.', ville: 'MIAMI', artiste: 'ANUEL AA', details: 'Las Leyendas Nunca Mueren (Trap Latino - Accès restreint)' },
    { date: '2026-02-13', jour: 'VEN.', ville: 'NYC', artiste: 'INDIRA PAGANOTTO', details: 'Artcore NYC (Psy-Techno - $90)' },
    { date: '2026-02-13', jour: 'VEN.', ville: 'SF', artiste: 'KENYA GRACE', details: 'Strangers Night (Liquid DnB Live - $90)' },

    // Samedi 14 Février (Valentine's Special)
    { date: '2026-02-14', jour: 'SAM.', ville: 'LA', artiste: 'GIVEON', details: 'Valentine’s Serenade (Showcase R&B de Prestige - Accès sur liste VIP uniquement)' },
    { date: '2026-02-14', jour: 'SAM.', ville: 'MIAMI', artiste: 'ROSALÍA', details: 'Motomami Love (Special Acoustic/Club Set - Accès restreint)' },
    { date: '2026-02-14', jour: 'SAM.', ville: 'NYC', artiste: 'PARTYNEXTDOOR', details: 'P4 Valentine Showcase (Performance R&B Exclusive - Accès sur liste VIP uniquement)' },
    { date: '2026-02-14', jour: 'SAM.', ville: 'SF', artiste: 'VICTORIA MONÉT', details: 'Jaguar Valentine (Funk/Soul Showcase - $90)' },

    // Dimanche 15 Février
    { date: '2026-02-15', jour: 'DIM.', ville: 'LA', artiste: 'TYLER, THE CREATOR', details: 'Golf Wang Night (Eclectic DJ Set - Accès restreint)' },
    { date: '2026-02-15', jour: 'DIM.', ville: 'MIAMI', artiste: 'SKEPTA', details: 'Más Tiempo (House Set by the Legend - $90)' },
    { date: '2026-02-15', jour: 'DIM.', ville: 'NYC', artiste: 'MODERAT', details: 'IDM Live (Apparat & Modeselektor - $90)' },
    { date: '2026-02-15', jour: 'DIM.', ville: 'SF', artiste: 'UNCLE WAFFLES', details: 'Amapiano Goddess (High Energy Set - $90)' },
];


function mettreAJourWidget() {
    
    // 1. Trouver le premier jour de programmation
    const datesUniques = [...new Set(donneesEvenements.map(e => e.date))].sort();
    
        let prochainJourDeProg = null;
    // On récupère l'heure de Miami et on la force à minuit pile pour ne plus avoir le décalage
    const heureMiami = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
    const dateActuelleEnMillis = heureMiami.setHours(0, 0, 0, 0);

    
    for (const dateStr of datesUniques) {
        // Crée une date à minuit pour une comparaison juste
        const dateEvenement = new Date(dateStr + 'T00:00:00'); 
        
        if (dateEvenement.getTime() >= dateActuelleEnMillis) {
            prochainJourDeProg = dateStr;
            break; 
        }
    }
    
    const listeElement = document.getElementById('evenement-liste');
    const titreElement = document.getElementById('widget-title');
    
    if (!prochainJourDeProg) {
        titreElement.textContent = "PAS D'ÉVÉNEMENTS À VENIR";
        listeElement.innerHTML = '';
        return;
    }

    // 2. Filtrer les événements pour ce jour
    const evenementsDuJour = donneesEvenements.filter(e => e.date === prochainJourDeProg);

    // 3. Mettre à jour le titre du widget
    const jourAffichage = evenementsDuJour[0].jour;
    const dateAffichage = new Date(prochainJourDeProg).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long'
    });
    
    titreElement.innerHTML = `🔥 ÉVÉNEMENTS ${jourAffichage}. ${dateAffichage.toUpperCase()}`;
    
    // 4. Générer l'affichage des événements (AVEC LE CLIC)
    listeElement.innerHTML = ''; 
    
    evenementsDuJour.forEach(evenement => {
        const item = document.createElement('div');
        item.classList.add('evenement-item');
        
        // C'EST CETTE LIGNE QUI EST IMPORTANTE :
        item.innerHTML = `
            <div class="evenement-ville">${evenement.ville}</div>
            <strong onclick="afficherDetailsArtiste('${evenement.artiste}', '${evenement.ville}', '${evenement.details}')" style="cursor: pointer; text-decoration: underline; text-decoration-color: var(--couleur-accent-cyan);">${evenement.artiste}</strong>
            <div class="evenement-details">${evenement.details}</div>
        `;
        // FIN DE LA LIGNE IMPORTANTE
        
        listeElement.appendChild(item);
    });
}

// Lancer la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', mettreAJourWidget);

/** Fonction générique pour les 15 pages de Règles/Politiques */
function renderPolicyPage(title, subtitle, content, imagePlaceholder) {
    APP_CONTENT.innerHTML = `
        <h1 class="title-page">${title}</h1>
        <p class="subtitle-page">${subtitle}</p>

        <section class="policy-section">
            <h2>${title.toUpperCase().split(' ')[0]} STANDARDS</h2>
            <p>${content}</p>
        </section>
        
        <section class="policy-section">
            <h2>MANAGEMENT'S FINAL DECISION</h2>
            <p>The Bradford opère sous la discrétion absolue de notre équipe. Le respect des politiques n'est pas une garantie d'entrée. Nous vous remercions de respecter les standards qui définissent notre lieu de classe mondiale. [Placeholder for further details]</p>
        </section>
        
        <div style="height: 250px; background-color: rgba(212, 175, 55, 0.1); border: 1px dashed var(--gold); margin-top: 30px; display: flex; justify-content: center; align-items: center; color: var(--gold); font-family: 'Cinzel', serif;">
            [VISUEL LUXE : ${imagePlaceholder}]
        </div>
    `;
}

// ==========================================
// 1. BASE DE DONNÉES DES ARTISTES
// ==========================================
const biosArtistes = {
    "ARMIN VAN BUUREN": {
        bio: "Figure emblématique de la Trance mondiale et hôte de l'émission A State of Trance. Il est connu pour ses sets épiques et son énergie incomparable.",
        genre: "Trance, Progressive Trance",
        prix: "$90 (Standard) - Service Bouteille disponible."
    },
    "CHARLOTTE DE WITTE": {
        bio: "Reine incontestée de la Techno High-Octane. Ses sets sont puissants, rapides et hypnotiques. Elle est la fondatrice du label KNTXT.",
        genre: "Techno, Acid Techno",
        prix: "VIP Full uniquement. Contactez le concierge pour les tarifs."
    },
    "RÜFÜS DU SOL": {
        bio: "Trio australien célèbre pour ses performances live émotionnelles et son mélange unique d'indie dance et de house progressive.",
        genre: "Indie Dance, Progressive House",
        prix: "Accès restreint. Tarifs disponibles sur demande au VIP Portal."
    },
    "DENNIS FERRER": {
        bio: "Légende de la House Music et fondateur du label Defected. Il incarne le son classique et soulful de New York.",
        genre: "House, Soulful House, Garage",
        prix: "$90 (Standard)."
    }
};

// ==========================================
// 2. GESTION DE L'INTERFACE (BIOS & RETOUR)
// ==========================================

async function afficherDetailsArtiste(artiste, ville, details) {
    let bioWiki = "Biographie en cours de chargement...";
    let genreWiki = "Artiste";
    let prixTrouve = "Information sur demande";

    // 1. EXTRACTION DU PRIX (Après le tiret et sans la parenthèse de fin)
    if (details.includes('-') || details.includes('–')) {
        const parties = details.split(/[–-]/);
        let brut = parties[parties.length - 1].trim();
        prixTrouve = brut.replace(/\)$/, ''); // Enlève la parenthèse si elle est à la fin
    }

    // 2. PRÉPARATION DU NOM POUR WIKIPÉDIA
    const nomFormate = artiste.toLowerCase()
        .split(' ')
        .map(mot => mot.charAt(0).toUpperCase() + mot.slice(1))
        .join('_');

    // 3. RECHERCHE WIKIPÉDIA
    try {
        const response = await fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nomFormate)}`);
        if (response.ok) {
            const data = await response.json();
            bioWiki = data.extract || "Biographie non disponible.";
            genreWiki = data.description || "Artiste";
        } else {
            const responseEn = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nomFormate)}`);
            if (responseEn.ok) {
                const dataEn = await responseEn.json();
                bioWiki = dataEn.extract;
                genreWiki = dataEn.description || "Artist";
            } else {
                bioWiki = `Rejoignez-nous pour une performance exclusive de ${artiste} au Bradford.`;
            }
        }
    } catch (e) {
        bioWiki = "Biographie non disponible.";
    }

    const detailPage = document.getElementById('artist-detail-page');
    const appContent = document.getElementById('app-content');
    const evenementWidget = document.getElementById('evenement-widget');
    
    // ON CACHE LES ÉLÉMENTS ET ON ACTIVE LA PAGE DE DÉTAILS
    const orbitContainer = document.getElementById('bradford-universe') || document.getElementById('quantum-nav-container');
    if (orbitContainer) orbitContainer.style.display = 'none';
    
    appContent.style.display = 'none';
    if (evenementWidget) evenementWidget.style.display = 'none'; 
    
    // On rend la page de détails cliquable et visible
    detailPage.style.display = 'block';
    detailPage.style.pointerEvents = 'auto'; 
    
    detailPage.innerHTML = `
        <div class="detail-header" onclick="retourAccueil()">
            <span class="back-link">← Retour à l'accueil</span>
            <h1 class="artist-name">${artiste}</h1>
            <p class="artist-location">${ville} - ${genreWiki}</p>
        </div>
        <div class="detail-body">
            <h2 class="detail-title">L'événement Bradford</h2>
            <p class="event-details-text">${details}</p>
            <h2 class="detail-title">L'Artiste</h2>
            <p class="artist-bio-text">${bioWiki}</p>
          <div class="pricing-container">
    <span class="pricing-label">Prix d'entrée:</span>
    <div class="pricing-value">${prixTrouve}</div>
</div>

            <div class="reservation-cta">
                <button class="cta-button" onclick="allerReservations()">
                    RÉSERVER UNE TABLE VIP MAINTENANT
                </button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0); 
}

// FONCTION POUR ALLER AUX RÉSERVATIONS
function allerReservations() {
    retourAccueil(); // On nettoie d'abord la vue artiste
    if (typeof navigate === "function") {
        navigate('reservations');
    }
}

// FONCTION RETOUR CORRIGÉE (LIBÈRE LES BOUTONS DU HEADER)
function retourAccueil() {
    const detailPage = document.getElementById('artist-detail-page');
    const appContent = document.getElementById('app-content');
    const evenementWidget = document.getElementById('evenement-widget');
    
    const orbitContainer = document.getElementById('bradford-universe') || document.getElementById('quantum-nav-container');
    if (orbitContainer) orbitContainer.style.display = 'flex';

    // IMPORTANT : On rend la page de détails invisible ET non-cliquable
    detailPage.style.display = 'none';
    detailPage.style.pointerEvents = 'none'; 
    
    appContent.style.display = 'block';
    if (evenementWidget) evenementWidget.style.display = 'block';

    if (typeof navigate === "function") navigate('home');
    window.scrollTo(0, 0);
    
    if (typeof mettreAJourWidget === "function") mettreAJourWidget();
}


// ==========================================
// 3. MOTEUR ORBITAL 4D (LE CODE COMPLEXE)
// ==========================================
const orbs = document.querySelectorAll('.celestial-orb');
let angleTracker = 0;

function renderLoop() {
    // Si l'orbite est masquée (pendant une bio), on arrête les calculs pour économiser la batterie
    const orbitContainer = document.getElementById('bradford-universe') || document.getElementById('quantum-nav-container');
    if (orbitContainer && orbitContainer.style.display === 'none') {
        requestAnimationFrame(renderLoop);
        return;
    }

    angleTracker += 0.4;
    orbs.forEach((orb, i) => {
        const radius = parseInt(orb.dataset.orbit) || (140 + i * 80);
        const speed = parseFloat(orb.dataset.speed) || 0.005;
        const currentAngle = (angleTracker * speed) + (i * 72);
        
        const x = Math.cos(currentAngle) * radius;
        const y = Math.sin(currentAngle) * radius;
        const z = Math.sin(currentAngle) * 80;

        const depthRatio = (y + radius) / (2 * radius); 
        const scale = 0.6 + (depthRatio * 0.9);
        const opacity = 0.4 + (depthRatio * 0.6);

        orb.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
        orb.style.opacity = opacity;
        orb.style.zIndex = Math.round(y + 1000);
    });

    requestAnimationFrame(renderLoop);
}

// Lancement du moteur au chargement
document.addEventListener('DOMContentLoaded', () => {
    renderLoop();
});


/** Rendu de la page Événements */
function renderEventsPage() {
     APP_CONTENT.innerHTML = `
        <h1 class="title-page">UPCOMING SHOWS & NIGHTLIFE EVENTS</h1>
        <p class="subtitle-page">The World's Elite DJs and Exclusive Themed Nights.</p>

        <div class="menu-grid">
            <div class="menu-item-card" style="border-left: 5px solid var(--teal);">
                <h3 class="item-name">GOLD LABEL RESIDENCY</h3>
                <p style="color: var(--gold); font-size: 1.1rem;">DJ STARDUST (International Headliner)</p>
                <p><strong>Date:</strong> Every Friday Night</p>
                <p><strong>Description:</strong> The highest-tier electronic music experience. Expect spectacular light shows and the exclusive Gold Label bottle service package.</p>
            </div>
             <div class="menu-item-card" style="border-left: 5px solid var(--teal);">
                <h3 class="item-name">CHAMPAGNE SHOWCASE THURSDAY</h3>
                <p style="color: var(--gold); font-size: 1.1rem;">The industry's fastest-growing weeknight event.</p>
                <p><strong>Date:</strong> Every Thursday Night</p>
                <p><strong>Description:</strong> Special pricing on selected prestige Champagnes. A highly sought-after night for industry professionals and socialites.</p>
            </div>
        </div>
    `;
}

/** Rendu de la page Galerie */
function renderGalleryPage() {
    const data = contentData['gallery']; 

    APP_CONTENT.innerHTML = `
        <h1 class="title-page">${data.title}</h1>
        <p class="subtitle-page">${data.subtitle}</p>
        
        ${generateGalleryHTML(data)} 

        <p style="text-align: center; color: #999; margin-top: 20px;">Photography by official Bradford photographers only. Personal photography requires discretion.</p>
    `;
}


/** Rendu de la page Contact */
function renderContactPage() {
    APP_CONTENT.innerHTML = `
        <h1 class="title-page">CONTACT & CONCIERGE SUPPORT</h1>
        <p class="subtitle-page">Your direct line to exclusivity.</p>

        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
            <p class="policy-section">
                For urgent table reservations, inquiries regarding groups larger than 8, or special events, please contact our dedicated Concierge Service.
            </p>
            
            <h2 class="section-header" style="font-size: 1.5rem; text-align: center;">CONCIERGE</h2>
            <p style="color: var(--gold); font-size: 1.5rem; font-weight: 700;">+1 305-VIP-BRAD</p>
            <p style="color: var(--teal); font-size: 1.1rem;">reservations@bradfordnightclub.com</p>
            
            <h2 class="section-header" style="font-size: 1.5rem; text-align: center; margin-top: 2rem;">MIAMI FLAGSHIP OFFICE</h2>
            <p>1000 Luxury Avenue, Miami Beach, FL 33139</p>
        </div>
    `;
}

/** Rendu de la page Localisation & Heures */
function renderLocationPage() {
    const locationsList = APP_DATA.venue.locations.map(city => `
        <div class="menu-item-card">
            <h3 class="item-name" style="color: var(--gold);">${city.toUpperCase()} VENUE</h3>
            <p class="item-size">1000 Luxury Street, ${city}</p>
            <p class="item-rarity">Open: Thursday - Sunday</p>
            <p class="item-rarity">Hours: 00:00 - 05:00</p>
        </div>
    `).join('');

    APP_CONTENT.innerHTML = `
        <h1 class="title-page">GLOBAL LOCATIONS & HOURS</h1>
        <p class="subtitle-page">The Bradford Experience across the globe.</p>

        <div class="menu-grid">
            ${locationsList}
        </div>
        <p style="text-align: center; color: #999; margin-top: 40px;">Please check local event calendars for special closures or extended hours during holiday weekends.</p>
    `;
}

// Fonction finale pour générer le HTML en fonction des catégories d'images.
function generateGalleryHTML(data) {
    let html = '';
    // Ce chemin doit correspondre au nom de votre dossier d'images (ex: 'Image/' ou 'images/')
    const baseImagePath = 'Image/'; 

    // Parcours les catégories (INTÉRIEUR, FAÇADES, EXPÉRIENCE)
    for (const categoryTitle in data.photoGalleryData) {
        if (data.photoGalleryData.hasOwnProperty(categoryTitle)) {
            
            // Ajoute le titre de la catégorie visuelle
            html += `<h3 class="galerie-titre">${categoryTitle}</h3>`;
            html += `<div class="galerie-conteneur">`;

            const photoArray = data.photoGalleryData[categoryTitle];
            
            // Parcours toutes les photos de la catégorie et crée la balise <img>
            photoArray.forEach(fullPath => {
                
                // Construit le chemin complet (ex: "Image/LA/LA_Bradford_inside_01.png")
                const imagePath = baseImagePath + fullPath;
                
                // Extrait le nom de la ville pour le texte alternatif
                const parts = fullPath.split('/');
                const cityAbbrev = parts[0]; 
                
                html += `<img src="${imagePath}" 
                             alt="Bradford ${cityAbbrev} - ${categoryTitle}" 
                             class="photo-vignette">`;
            });
            
            html += `</div>`;
            html += `<hr class="separateur">`;
        }
    }
    return html;
}

/** Rendu de la nouvelle page Concierge Privé - CORRECTION FINALE */
function renderConciergePage() {
    APP_CONTENT.innerHTML = `
        <h1 class="title-page">THE BRADFORD CONCIERGE SERVICE</h1>
        <p class="subtitle-page">Votre ligne directe vers un luxe sans compromis.</p>

           <div class="concierge-grid">

            <div class="concierge-card concierge-gold">
                <h2 style="font-family: 'Cinzel', serif; color: var(--gold); font-size: 1.8rem; margin-bottom: 1rem;">LIGNE PRIVÉE 24/7</h2>
                <p style="font-size: 1.2rem; color: #ccc; margin-bottom: 2rem;">Pour les demandes urgentes, les groupes de prestige ou les requêtes spéciales.</p>
                
                <p class="contact-number">+1 305-VIP-BRAD</p>
                <p class="contact-email">reservations@bradfordnightclub.com</p>
            </div>

            <div class="concierge-card concierge-teal">
                <h2 style="font-family: 'Cinzel', serif; color: var(--teal); font-size: 1.8rem; margin-bottom: 1rem;">SERVICE EXCLUSIF</h2>
                <ul class="concierge-list">
                    <li><span style="color: var(--gold); font-weight: 700;">• Groupes de Prestige :</span> Gestion des listes d'invités VIP et célébrités.</li>
                    <li><span style="color: var(--gold); font-weight: 700;">• Bouteilles Rares :</span> Commande de spiritueux et champagnes hors-menu.</li>
                    <li><span style="color: var(--gold); font-weight: 700;">• Événements Privés :</span> Demandes de privatisation partielle ou complète.</li>
                    <li><span style="color: var(--gold); font-weight: 700;">• Transport Privé :</span> Coordination des arrivées/départs de véhicules de luxe.</li>
                </ul>
            </div>
            
        </div>

        <div class="policy-section concierge-discretion">
            <h2>ENGAGEMENT DE DISCRÉTION</h2>
            <p>Notre équipe Concierge est la première ligne de l'hospitalité Bradford. Chaque interaction est traitée avec la plus grande <span style="color: var(--gold);">discrétion et confidentialité</span>. Nous vous garantissons une planification de soirée sans faille, conçue pour dépasser les attentes des clients les plus exigeants. Veuillez fournir un minimum de 48 heures d'avis pour les requêtes complexes.</p>
        </div>

    

        <div id="premium-arrival-module" class="module-container" style="max-width: 100%; grid-column: 1 / -1;">

            <header class="module-header">
                <div class="logo-placeholder">UBER BLACK</div>
                <h2 class="header-title">PREMIUM ARRIVAL CONCIERGE</h2>
                <p class="header-subtitle">Partenariat exclusif Bradford x Uber Black.</p>
            </header>

            <div class="dynamic-control-zone">
                <div class="input-group">
                    <label for="city-select" class="input-label">Lieu de Prise en Charge :</label>
                    <select id="city-select" class="lux-input">
                        <option value="default" disabled selected>Sélectionnez votre ville...</option>
                        <option value="NewYork">New York (NYC)</option>
                        <option value="Miami">Miami (FL)</option>
                        <option value="LA">Los Angeles (LA)</option>
                        <option value="SF">San Francisco (SF)</option>
                    </select>
                </div>
                <div class="status-panel">
                    <span class="status-label">STATUT :</span>
                    <span class="status-indicator" id="city-status">INITIALISATION...</span>
                </div>
            </div>

            <div id="dynamic-info-container" class="dynamic-section" style="display: none;">

                <div class="key-metrics-grid">
                    <div class="metric-card eta-card">
                        <p class="metric-label">VTC ESTIMÉ</p>
                        <span id="uber-eta" class="data-value">--</span>
                        <span class="data-unit">min</span>
                    </div>

                    <div class="metric-card traffic-card">
                        <p class="metric-label">FLUIDITÉ TRAFIC</p>
                        <span id="traffic-status" class="data-value-small">...</span>
                    </div>
                </div>

                <div class="price-list-container">
                    <h3 class="price-title">OPTIONS DE LUXE (Tarif Estimé)</h3>
                    <ul id="price-list" class="price-list">
                        </ul>
                </div>
            </div>

            <div class="action-section">
                <div class="promo-code-box">
                    <span class="promo-text">RABAIS EXCLUSIF BRADFORD :</span>
                    <span id="promo-code" class="code-value">BRADFORDVIP10</span>
                    <button class="copy-btn" onclick="copyCode()">COPIER</button>
                </div>

                <a href="#" id="order-uber-btn" class="main-action-button" target="_blank" onclick="event.preventDefault(); simulateOrder();" style="display: none;">
                    <span class="btn-text">ACTIVER VTC PREMIUM</span>
                </a>
            </div>

       </div> 
    `; // UN SEUL BACKTICK, SANS RIEN D'AUTRE APRÈS LE POINT-VIRGULE, SAUF LE COMMENTAIRE JS
    initializeUberModule();
}


    // --- 5. INITIALISATION SPÉCIFIQUE AU MODULE UBER ---
function initializeUberModule() {
    // Éléments du DOM (Rappel: ils doivent être dans la page au moment de l'appel)
    const SelecteurVille = document.getElementById('city-select');
    const ConteneurInfoDynamique = document.getElementById('dynamic-info-container');
    const IndicateurStatutVille = document.getElementById('city-status');
    const AffichageTrafic = document.getElementById('traffic-status');
    const AffichageETA = document.getElementById('uber-eta');
    const ListePrixVTC = document.getElementById('price-list');
    const BoutonCommanderVTC = document.getElementById('order-uber-btn');

    // Mappage des adresses de destination
    const AdressesClub = {
        NewYork: "420 Park Avenue, NYC",
        Miami: "1701 Collins Ave, Miami Beach, FL",
        LA: "8899 Sunset Blvd, West Hollywood, LA",
        SF: "101 Market St, San Francisco, CA"
    };

    // Structure de données de simulation simplifiée
    const DonneesUberParVille = {
        // ... (Gardez toutes vos données de ville ici)
        NewYork: {
            trafic: "FLUIDE",
            eta: 7,
            vehicles: [
                { type: "Uber Black (Sedan)", price: "$90 - $130", isLux: true },
                { type: "Uber Black SUV", price: "$160 - $240", isLux: true }
            ]
        },
        Miami: {
            trafic: "LENT",
            eta: 14,
            vehicles: [
                { type: "Uber Lux", price: "$130 - $200", isLux: true },
                { type: "Uber Black", price: "$80 - $120", isLux: true }
            ]
        },
        LA: {
            trafic: "CRITIQUE",
            eta: 18,
            vehicles: [
                { type: "Uber Black", price: "$100 - $150", isLux: true },
                { type: "Uber Black SUV", price: "$180 - $280", isLux: true }
            ]
        },
        SF: {
            trafic: "MODÉRÉ",
            eta: 9,
            vehicles: [
                { type: "Uber Black", price: "$95 - $145", isLux: true },
                { type: "Uber Premier", price: "$120 - $180", isLux: true }
            ]
        }
    };

    // VÉRIFIEZ si le sélecteur existe (si on est bien sur la page contact)
    if (!SelecteurVille) {
        // Si on est sur une autre page, cette fonction s'arrête immédiatement
        return; 
    }

    // Gestionnaire d'événement principal
    SelecteurVille.addEventListener('change', () => {
        // ... (Gardez tout le reste de votre logique ici)
        const VilleSelectionnee = SelecteurVille.value;
        
        if (VilleSelectionnee === 'default') {
            MasquerModule();
            IndicateurStatutVille.textContent = "SÉLECTIONNER VILLE";
            return;
        }

        const data = DonneesUberParVille[VilleSelectionnee];
        
        AffichageTrafic.textContent = data.trafic;
        AffichageETA.textContent = data.eta;
        renderPriceList(data.vehicles);

        ConteneurInfoDynamique.style.display = 'block';
        BoutonCommanderVTC.style.display = 'block';
        IndicateurStatutVille.textContent = `DONNÉES ACTIVES pour ${VilleSelectionnee}`;
    });

    // ... (Gardez les fonctions MasquerModule, renderPriceList, copyCode, simulateOrder)
    
    function MasquerModule() {
        ConteneurInfoDynamique.style.display = 'none';
        BoutonCommanderVTC.style.display = 'none';
        AffichageETA.textContent = '--';
        AffichageTrafic.textContent = '...';
        ListePrixVTC.innerHTML = '';
    }
    
    function renderPriceList(vehicles) {
        ListePrixVTC.innerHTML = ''; 
        vehicles.forEach(v => {
            const listItem = document.createElement('li');
            listItem.className = 'price-item';
            
            const typeSpan = document.createElement('span');
            typeSpan.className = 'vehicle-type';
            typeSpan.textContent = v.type;
            
            const priceSpan = document.createElement('span');
            priceSpan.className = v.isLux ? 'price-range lux' : 'price-range';
            priceSpan.textContent = v.price;
            
            listItem.appendChild(typeSpan);
            listItem.appendChild(priceSpan);
            ListePrixVTC.appendChild(listItem);
        });
    }

    window.copyCode = function() {
        const promoCode = document.getElementById('promo-code').textContent;
        navigator.clipboard.writeText(promoCode).then(() => {
            alert("Code promo copié : " + promoCode);
        }, (err) => {
            console.error('Erreur de copie:', err);
        });
    }

window.simulateOrder = function() {
    const SelecteurVille = document.getElementById('city-select');
    const VilleSelectionnee = SelecteurVille.value;
    
    // On récupère les données de la ville (tes véhicules, prix, etc.)
    // Note: Assure-toi que DonneesUberParVille est accessible ici
    const data = DonneesUberParVille[VilleSelectionnee];

    openVtcFleetSelection(VilleSelectionnee, data.vehicles, data.eta);
}

    // Initialisation
    MasquerModule();
}

// --- ÉTAPE 1 : ON OUVRE LA SÉLECTION DES VÉHICULES ---
// Cette fonction remplace ton ancienne alerte
window.simulateOrder = function() {
    const SelecteurVille = document.getElementById('city-select');
    const VilleSelectionnee = SelecteurVille.value;
    
    // On récupère les données de ton tableau DonneesUberParVille (ETA et véhicules)
    // Note : Cette partie utilise les données que tu as déjà dans ton initializeUberModule
    const data = {
        NewYork: { eta: 7, vehicles: [{type:"Uber Black", price:"$90-$130"}, {type:"Uber Black SUV", price:"$160-$240"}]},
        Miami: { eta: 14, vehicles: [{type:"Uber Lux", price:"$130-$200"}, {type:"Uber Black", price:"$80-$120"}]},
        LA: { eta: 18, vehicles: [{type:"Uber Black", price:"$100-$150"}, {type:"Uber Black SUV", price:"$180-$280"}]},
        SF: { eta: 9, vehicles: [{type:"Uber Black", price:"$95-$145"}, {type:"Uber Premier", price:"$120-$180"}]}
    };

    const config = data[VilleSelectionnee];
    openVtcFleetSelection(VilleSelectionnee, config.vehicles, config.eta);
}

// --- ÉTAPE 2 : LE CATALOGUE DES VOITURES ---
function openVtcFleetSelection(ville, vehicles, eta) {
    let vehiclesHtml = '';
    
    vehicles.forEach((v) => {
        vehiclesHtml += `
            <div class="fleet-card" onclick="openVtcCheckout('${ville}', '${v.type}', '${v.price}', '${eta}')" 
                 style="background: rgba(255,255,255,0.03); border: 1px solid #222; padding: 15px; margin-bottom: 12px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <span style="color: var(--gold); font-size: 0.6rem; letter-spacing: 1px;">UBER ELITE</span>
                    <h3 style="font-family: 'Cinzel'; margin: 5px 0; font-size: 1rem; color: #fff;">${v.type}</h3>
                    <span style="font-size: 0.7rem; color: #666;">Chauffeur Bradford certifié</span>
                </div>
                <div style="text-align: right;">
                    <span style="color: var(--gold); font-weight: bold; font-size: 0.9rem;">${v.price}</span>
                    <p style="font-size: 0.6rem; color: #444; margin-top: 5px;">EST. TOTAL</p>
                </div>
            </div>
        `;
    });

    APP_CONTENT.innerHTML = `
        <div style="padding: 20px; animation: fadeIn 0.5s ease; max-width: 500px; margin: 0 auto;">
            <h1 class="title-page">SELECT YOUR FLEET</h1>
            <p style="color:var(--gold); text-align:center; font-size:0.7rem; letter-spacing:2px; margin-bottom:30px;">DISPONIBILITÉS : ${ville.toUpperCase()}</p>
            
            ${vehiclesHtml}

            <button onclick="navigate('concierge')" style="width:100%; background:none; border:none; color:#555; margin-top:20px; text-decoration:underline; font-size:0.7rem; cursor:pointer;">ANNULER LA COMMANDE</button>
        </div>
    `;
    window.scrollTo(0,0);
}

// --- ÉTAPE 3 : LE TERMINAL DE PAIEMENT FINAL ---
function openVtcCheckout(ville, vehicleType, priceRange, eta) {
    APP_CONTENT.innerHTML = `
        <div class="checkout-container" style="padding: 20px; animation: slideUp 0.5s ease;">
            <h1 class="title-page" style="font-size: 1.8rem;">FINAL DISPATCH</h1>
            <p style="color:var(--gold); text-align:center; font-size:0.7rem; letter-spacing:2px; margin-bottom:20px;">TERMINAL SÉCURISÉ</p>
            
            <div style="background: rgba(212, 175, 55, 0.05); border: 1px solid var(--gold); padding: 20px; margin-bottom: 25px;">
                <div style="display: flex; justify-content: space-between; align-items:center;">
                    <span style="font-family: 'Cinzel'; color: var(--gold); font-size: 1.1rem;">${vehicleType}</span>
                    <span style="font-size: 0.8rem; color: #fff; font-weight: bold;">${priceRange}</span>
                </div>
                <div style="margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
                    <p style="font-size: 0.6rem; color: #888;">UNITÉ : BRADFORD ${ville.toUpperCase()}</p>
                    <p style="font-size: 0.6rem; color: #888;">TEMPS D'ATTENTE : ${eta} MIN</p>
                </div>
            </div>

            <div class="checkout-box" style="background: #0a1a3a; padding: 20px; border: 1px solid #222;">
                <div style="background: #000; height: 50px; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid #333; margin-bottom: 20px;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" style="height: 20px; filter: invert(1);">
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="font-size:0.6rem; color:var(--gold); display:block; margin-bottom:5px;">NOM DU PASSAGER</label>
                    <input type="text" class="payment-input" placeholder="FULL NAME" style="width:100%; margin-bottom:10px;">
                    
                    <label style="font-size:0.6rem; color:var(--gold); display:block; margin-bottom:5px;">PAIEMENT</label>
                    <input type="text" class="payment-input" placeholder="CARD NUMBER" style="width:100%;">
                    <div style="display:flex; gap:10px; margin-top: 10px;">
                        <input type="text" class="payment-input" placeholder="MM/YY" style="flex:1;">
                        <input type="text" class="payment-input" placeholder="CVC" style="flex:1;">
                    </div>
                </div>

        <button class="cta-button" 
        style="width:100%; height: 55px; background: var(--gold); color: black; font-weight:bold;" 
        onclick="window.scrollTo(0,0); processVtcOrder()">
    CONFIRMER LA COURSE
</button>

            </div>
            
            <button onclick="navigate('concierge')" style="width:100%; background:none; border:none; color:#555; margin-top:20px; text-decoration:underline; font-size:0.7rem; cursor:pointer;">RETOUR</button>
        </div>
    `;
    window.scrollTo(0,0);
}

function processVtcOrder() {
    // 1. ÉCRAN DE CONNEXION SÉCURISÉE (Animation)
    APP_CONTENT.innerHTML = `
        <div style="height:80vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; background:#050b1a;">
            <div class="loader" style="border-top: 2px solid var(--gold);"></div>
            <h2 style="font-family:'Cinzel'; color:var(--gold); margin-top:30px; letter-spacing:4px; font-size:0.9rem;">ENCRYPTING DISPATCH...</h2>
            <p style="font-size:0.6rem; color:#444; margin-top:10px; text-transform:uppercase;">Signal envoyé au réseau Uber Black Priority</p>
        </div>
    `;

    // 2. ÉCRAN DE CONFIRMATION DE FOLIE (Après 3 secondes)
    setTimeout(() => {
        APP_CONTENT.innerHTML = `
            <div style="padding:20px; animation:fadeIn 1s ease; max-width:500px; margin:0 auto; color:white;">
                
                <div style="text-align:center; margin-bottom:30px;">
                    <div style="width:60px; height:60px; border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 15px auto;">
                        <span style="color:var(--gold); font-size:1.5rem;">✓</span>
                    </div>
                    <h1 style="font-family:'Cinzel'; font-size:1.4rem; letter-spacing:3px;">DISPATCH CONFIRMED</h1>
                    <p style="color:var(--gold); font-size:0.6rem; letter-spacing:2px;">VOTRE CHAUFFEUR EST EN ROUTE</p>
                </div>

                <div style="background:#0a1a3a; border:1px solid #222; padding:20px; margin-bottom:20px; position:relative;">
                    <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px;">
                        <div style="width:50px; height:50px; background:#111; border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Cinzel'; font-size:1.2rem;">
                            J.B
                        </div>
                        <div>
                            <p style="font-size:0.6rem; color:var(--gold); margin:0;">VOTRE CHAUFFEUR BRADFORD</p>
                            <h3 style="margin:0; font-size:1rem;">JAMES BENNETT</h3>
                            <p style="font-size:0.6rem; color:#555;">⭐ 4.98 • 12,400+ Courses</p>
                        </div>
                    </div>
                    
                    <div style="border-top:1px solid #1a2a4a; padding-top:15px; display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                        <div>
                            <p style="font-size:0.5rem; color:#555; margin:0;">VÉHICULE</p>
                            <p style="font-size:0.75rem; margin:2px 0;">Cadillac Escalade</p>
                        </div>
                        <div style="text-align:right;">
                            <p style="font-size:0.5rem; color:#555; margin:0;">PLAQUE</p>
                            <p style="font-size:0.75rem; margin:2px 0; font-weight:bold; letter-spacing:1px;">BFRD-001</p>
                        </div>
                    </div>
                </div>

                <div style="background:#0a1a3a; border:1px solid #222; padding:20px; margin-bottom:30px;">
                    <div style="margin-bottom:15px;">
                        <p style="font-size:0.5rem; color:var(--gold); margin:0; letter-spacing:1px;">POINT DE PRISE EN CHARGE</p>
                        <p style="font-size:0.75rem; margin:5px 0;">Localisation actuelle (GPS Actif)</p>
                    </div>
                    <div style="margin-bottom:15px;">
                        <p style="font-size:0.5rem; color:var(--gold); margin:0; letter-spacing:1px;">DESTINATION EXCLUSIVE</p>
                        <p style="font-size:0.75rem; margin:5px 0;">The Bradford - VIP Private Entrance</p>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <p style="font-size:0.5rem; color:var(--gold); margin:0; letter-spacing:1px;">SERVICES À BORD</p>
                            <p style="font-size:0.6rem; color:#888; margin:5px 0;">Eau minérale, Presse du jour, Wi-Fi 5G</p>
                        </div>
                        <div style="background:var(--gold); color:black; padding:5px 10px; font-size:0.6rem; font-weight:bold;">PREMIUM</div>
                    </div>
                </div>

                <button onclick="window.location.href='https://www.uber.com/app'" style="width:100%; background:white; color:black; border:none; padding:15px; font-weight:bold; font-family:'Cinzel'; cursor:pointer; margin-bottom:15px;">
                    OPEN UBER APP
                </button>
                
                <p style="text-align:center; font-size:0.55rem; color:#444; line-height:1.4;">
                    Le chauffeur vous contactera à son arrivée. <br>
                    Le code promo <strong>BRADFORDVIP10</strong> a été appliqué à votre compte.
                </p>

                <button class="cta-button"onclick="window.scrollTo(0,0); navigate('home')"  style="margin-top:30px; width:100%; border:1px solid #333; background:none; color:#666;" onclick="navigate('home')">RETOUR ACCUEIL</button>
            </div>
        `;
        window.scrollTo(0,0);
    }, 3000);
}


    
/** Calcule le prix final d'une bouteille (Prix Affiché + Frais de Service) */
function calculateFinalPrice(basePrice) {
    // Utilise la valeur service_charge_pct de votre config.json (0.20)
    const serviceChargePct = APP_DATA.pricing_rules.service_charge_pct; 
    const finalPrice = basePrice * (1 + serviceChargePct);
    return finalPrice;
}

/** Fonction qui affiche le popup du prix final */
function showFinalPriceAlert(name, basePrice, finalPrice) {
    const serviceChargePct = APP_DATA.pricing_rules.service_charge_pct;

    alert(`
        TARIF VIP TRANSPARENT

        Bouteille : ${name}
        Prix Affiché (Hors Service) : ${formatPrice(basePrice)}
        Frais de Service (${serviceChargePct * 100}%) : ${formatPrice(finalPrice - basePrice)}
        ------------------------------------------
        COÛT TOTAL (TTC) : ${formatPrice(finalPrice)}
    `);
}
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('premium-progress-bar-v2');
    const body = document.body;
    const documentElement = document.documentElement;

    // Fonction de mise à jour de la barre
    function updateProgressBar() {
        // Défilement actuel (compatible avec tous les navigateurs)
        const currentScroll = window.scrollY || documentElement.scrollTop;
        
        // Hauteur totale défilable de la page
        const totalHeight = Math.max(
            body.scrollHeight, body.offsetHeight, 
            documentElement.clientHeight, documentElement.scrollHeight, documentElement.offsetHeight
        ) - window.innerHeight;

        let progress = 0;

        // Calcul du pourcentage
        if (totalHeight > 0) {
            progress = (currentScroll / totalHeight) * 100;
        } else {
            progress = 100; 
        }

        // Applique le pourcentage à la largeur de la barre
        progressBar.style.width = progress + '%';
    }

    // Écoute les événements de défilement pour un rendu fluide
    window.addEventListener('scroll', updateProgressBar);
    
    // Met à jour la barre une fois au chargement
    updateProgressBar(); 
});


/** Gère l'apparition du bouton Scroll To Top */
function toggleScrollToTopButton() {
    const btn = document.getElementById('scrollToTopBtn');
    if (window.scrollY > 400) { // Apparaît après 400px de défilement
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
}

/** Remonte la page au clic (smooth scroll) */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Fonction pour activer le système de notation (à ajouter dans script.js)
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.rating .star');
    const ratingValue = document.getElementById('ratingValue');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            ratingValue.value = value;
            
            stars.forEach(s => {
                s.classList.remove('selected');
            });

            for (let i = 0; i < value; i++) {
                stars[i].classList.add('selected');
            }
        });
    });
});
// Fonction JavaScript qui "ouvre la nouvelle page" (la modale)
function openMembershipModal() {
    document.getElementById('membershipModal').style.display = 'block';
}
// Fonction pour ouvrir la modale (bouton "Demander le Statut Membre")
function openMembershipModal() {
    document.getElementById('membershipModal').style.display = 'block';
}

// *** C'EST LA FONCTION ESSENTIELLE POUR QUE LA CROIX FONCTIONNE ***
function closeMembershipModal() {
    document.getElementById('membershipModal').style.display = 'none';
}

// Optionnel: Pour fermer la modale en cliquant en dehors
window.onclick = function(event) {
    const modal = document.getElementById('membershipModal');
    // Vérifie si l'élément cliqué (event.target) est le fond de la modale elle-même
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
/** LOGIQUE DE RÉCUPÉRATION DE L'ARTISTE **/
function getArtisteForSelection(city, date) {
    // On cherche le match parfait dans ta liste
    const match = donneesEvenements.find(e => e.date === date && e.ville.toUpperCase() === city.toUpperCase());
    return match ? { name: match.artiste, details: match.details } : { name: "RESIDENT DJ", details: "Exclusive Night Experience" };
}

/** LA PAGE DE CHECKOUT DÉTAILLÉE **/
function handleReservationSubmit() {
    const city = document.getElementById('res-city').value;
    const dateInput = document.getElementById('res-date').value;
    const guests = document.getElementById('res-guests').value;
    const deposit = document.getElementById('summary-deposit').textContent;
    const minSpend = document.getElementById('summary-min-spend').textContent;

const cityInput = document.getElementById('res-city').value; // Récupère la ville choisie
const dateValue = document.getElementById('res-date').value; // Récupère la date (AAAA-MM-JJ)

// 2. PETIT DICTIONNAIRE (pour transformer "Los Angeles" en "LA")
// Adapte les noms de gauche à ce qu'il y a dans ton menu déroulant
const mappingVilles = {
    'Los Angeles': 'LA',
    'San Francisco': 'SF',
    'New York': 'NYC',
    'Miami': 'MIAMI'
};

// On transforme la ville longue en abréviation courte pour le tableau
const villeCourte = mappingVilles[cityInput] || cityInput;

// 3. LA RECHERCHE BÉTON
const eventInfo = donneesEvenements.find(e => 
    e.ville === villeCourte && 
    e.date === dateValue
) || { artiste: "ARTISTE À VENIR", details: "Programmation bientôt disponible" };

// 4. TON VISUEL (Inchangé)
APP_CONTENT.innerHTML = `
    <div class="checkout-container">
        <h1 class="tp-alt" style="text-align:left; font-size: 2rem;">FINALISATION</h1>
        <p style="color:var(--gold); margin-top:-20px; font-size:0.8rem; letter-spacing:2px;">SECURE PAYMENT GATEWAY</p>

        <div class="luxe-summary">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:15px; margin-bottom:15px;">
                <div>
                    <span style="font-size:0.6rem; color:var(--teal);">ARTISTE / ÉVÉNEMENT</span>
                    <h2 style="font-family:'Cinzel'; margin:5px 0; color:#fff;">${eventInfo.artiste}</h2>
                    <p style="font-size:0.7rem; color:var(--gold); margin:0;">${eventInfo.details}</p>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:0.6rem; color:var(--teal);">LIEU</span>
                        <p style="font-weight:bold; margin:5px 0;">BRADFORD ${city.toUpperCase()}</p>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; font-size:0.8rem;">
                    <div><span style="opacity:0.6;">DATE:</span> <br> <strong>${dateInput}</strong></div>
                    <div><span style="opacity:0.6;">CONVERSATION:</span> <br> <strong>${guests} PERSONNES</strong></div>
                    <div><span style="opacity:0.6;">MINIMUM SPEND:</span> <br> <strong style="color:var(--gold);">${minSpend}</strong></div>
                    <div><span style="opacity:0.6;">TABLE TYPE:</span> <br> <strong>VIP MAIN FLOOR</strong></div>
                </div>
            </div>

            <h3 style="font-family:'Cinzel'; font-size:0.9rem; margin-bottom:15px;">MÉTHODE DE PAIEMENT</h3>
            <div class="payment-methods">
                <div class="method-card active" onclick="selectMethod(this)"><i>💳</i><span style="font-size:0.6rem;">CARD</span></div>
                <div class="method-card" onclick="selectMethod(this)"><i>₿</i><span style="font-size:0.6rem;">CRYPTO</span></div>
                <div class="method-card" onclick="selectMethod(this)"><i></i><span style="font-size:0.6rem;">APPLE PAY</span></div>
            </div>

    <div class="checkout-box">
    <div id="payment-display-zone">
        <div style="margin-bottom:20px;">
            <label style="font-size:0.6rem; color:var(--gold); letter-spacing:1px; display:block; margin-bottom:5px;">INFORMATION DE FACTURATION</label>
            <input type="text" class="payment-input" placeholder="NOM COMPLET DU DÉTENTEUR">
            <input type="email" class="payment-input" placeholder="EMAIL DE RÉCEPTION">
        </div>

        <div style="margin-bottom:20px;">
            <label style="font-size:0.6rem; color:var(--gold); letter-spacing:1px; display:block; margin-bottom:5px;">DÉTAILS DE LA CARTE</label>
            <input type="text" class="payment-input" placeholder="0000 0000 0000 0000">
            <div style="display:flex; gap:15px;">
                <input type="text" class="payment-input" placeholder="MM/YY" style="flex:1;">
                <input type="text" class="payment-input" placeholder="CVC" style="flex:1;">
            </div>
        </div>
    </div>

    <button class="cta-button" 
        style="width:100%; height:60px; font-size:1rem;" 
        onclick="window.scrollTo(0,0); processFullPayment('${eventInfo.name}', '${city}', '${dateInput}', '${guests}', '${deposit}')">
        PAYER LE DÉPÔT
    </button>
</div>

            <p style="text-align:center; font-size:0.6rem; color:#444; margin-top:20px; text-transform:uppercase;">
                Transactions sécurisées par Bradford encrypted systems. <br>
                En payant, vous acceptez nos conditions de discrétion.
            </p>
        </div>
    `;
    window.scrollTo(0,0);
}

function selectMethod(el) {
    document.querySelectorAll('.method-card').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
}

/** ANIMATION DE PAIEMENT ET GÉNÉRATION TICKET **/
function processFullPayment(artiste, ville, date, guests, prix) {
    APP_CONTENT.innerHTML = `
        <div style="height:80vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
            <div class="loader"></div>
            <h2 style="font-family:'Cinzel'; color:var(--gold); margin-top:30px; letter-spacing:5px; animation:pulse 1s infinite;">AUTHENTICATION...</h2>
            <p style="font-size:0.7rem; opacity:0.5;">DO NOT REFRESH THIS PAGE</p>
        </div>
    `;

    setTimeout(() => {
        renderHighEndTicket(artiste, ville, date, guests, prix);
    }, 2500);
}

/** TICKET FINAL HAUTE RÉSOLUTION - ÉDITION PRESTIGE **/
function renderHighEndTicket(artiste, ville, date, guests, prix) {
    const ticketID = "BRD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

const mappingVilles = { 'Los Angeles': 'LA', 'San Francisco': 'SF', 'New York': 'NYC', 'Miami': 'MIAMI' };
    const villeCode = mappingVilles[ville] || ville;

    const eventInfo = donneesEvenements.find(e => 
        e.ville === villeCode && 
        e.date === date
    ) || { artiste: artiste, details: "Programmation Standard" }; 
    

    
    APP_CONTENT.innerHTML = `
        <div style="padding:20px; animation: fadeIn 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both; background:#000; min-height:100vh; display:flex; flex-direction:column; align-items:center;">
            
            <div style="width:100%; max-width:350px; background: linear-gradient(145deg, #0f0f0f 0%, #050505 100%); border: 1px solid rgba(212,175,55,0.3); border-radius:15px; overflow:hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); position:relative;">
                
                <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(125deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%); pointer-events:none;"></div>

                <div style="padding:30px 20px; text-align:center; border-bottom:1px solid rgba(212,175,55,0.1);">
                    <h1 style="font-family:'Cinzel'; color:var(--gold); margin:0; font-size:1.8rem; letter-spacing:5px;">BRADFORD</h1>
                    <p style="font-size:0.5rem; color:#666; letter-spacing:4px; margin-top:5px; text-transform:uppercase;">Private Establishment Pass</p>
                </div>

                <div style="padding:25px; position:relative; z-index:1;">
                    <div style="margin-bottom:20px; text-align:center;">
                        <span style="font-size:0.5rem; color:var(--gold); letter-spacing:2px; text-transform:uppercase;">Access Level</span>
                        <h2 style="font-family:'Cinzel'; color:#fff; font-size:1.1rem; margin:5px 0; letter-spacing:2px;">VIP PRE-AUTH MEMBER</h2>
                    </div>

               
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; font-family:'Inter'; border-top:1px solid rgba(255,255,255,0.05); padding-top:20px;"> 
        
        <div>
            <p style="font-size:0.45rem; color:#555; margin:0; text-transform:uppercase;">Lineup</p>
            <p style="font-size:0.75rem; color:#fff; margin:3px 0; font-weight:600;">${eventInfo.artiste}</p>
        </div>
                        <div style="text-align:right;">
                            <p style="font-size:0.45rem; color:#555; margin:0; text-transform:uppercase;">Location</p>
                            <p style="font-size:0.75rem; color:#fff; margin:3px 0; font-weight:600;">${ville.toUpperCase()}</p>
                        </div>
                        <div>
                            <p style="font-size:0.45rem; color:#555; margin:0; text-transform:uppercase;">Arrival Date</p>
                            <p style="font-size:0.75rem; color:#fff; margin:3px 0; font-weight:600;">${date}</p>
                        </div>
                        <div style="text-align:right;">
                            <p style="font-size:0.45rem; color:#555; margin:0; text-transform:uppercase;">Guests</p>
                            <p style="font-size:0.75rem; color:#fff; margin:3px 0; font-weight:600;">${guests} PERSONS</p>
                        </div>
                    </div>
                </div>

                <div style="background:rgba(212,175,55,0.02); padding:30px; text-align:center; position:relative;">
                    <div style="background:#fff; padding:12px; display:inline-block; border-radius:10px; box-shadow: 0 0 25px rgba(212,175,55,0.15);">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketID}&color=000&bgcolor=fff" 
                             style="width:130px; height:130px; display:block;" alt="Security QR">
                    </div>
                    
                    <p style="font-family:'Courier New'; color:var(--gold); font-size:0.7rem; margin-top:20px; letter-spacing:3px;">
                        ${ticketID}
                    </p>
                </div>

                <div style="padding:20px; background:#000; border-top:1px solid rgba(255,255,255,0.05); text-align:center;">
                    <p style="font-size:0.45rem; color:#333; line-height:1.6; margin-bottom:15px; text-transform:uppercase; letter-spacing:1px;">
                        Proof of Deposit: ${prix} <br>
                        Final Balance due at table <br>
                        Strict Dress Code: Dress to Impress
                    </p>
                    <div style="height:30px; display:flex; gap:2px; justify-content:center; opacity:0.4;">
                        ${Array(25).fill(0).map(() => `<div style="width:${Math.random() * 4 + 1}px; height:100%; background:#fff;"></div>`).join('')}
                    </div>
                </div>
            </div>

            <button onclick="window.print()" style="margin-top:30px; background:none; border:1px solid #333; color:#fff; padding:12px 30px; border-radius:50px; font-size:0.6rem; letter-spacing:2px; cursor:pointer;">
                DOWNLOAD PASS (PDF)
            </button>
            <p style="color:#444; font-size:0.5rem; margin-top:20px;">Present this digital pass to the concierge upon arrival.</p>

        </div>
<div style="margin-top: 40px; width: 100%; max-width: 350px; animation: fadeIn 1.5s ease;">
    <div style="text-align: center; margin-bottom: 15px;">
        <div style="width: 30px; height: 1px; background: var(--gold); margin: 0 auto 10px; opacity: 0.5;"></div>
        <p style="font-size: 0.5rem; color: #666; letter-spacing: 3px; text-transform: uppercase;">Direct Assistance</p>
    </div>

    <div onclick="contactVIPConcierge('${ticketID}', '${artiste}')" 
         style="background: #000; border: 1px solid var(--gold); border-radius: 8px; padding: 18px; display: flex; align-items: center; justify-content: center; gap: 15px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 10px 20px rgba(212,175,55,0.05);">
        
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>

        <div style="text-align: left;">
            <p style="margin: 0; font-size: 0.7rem; color: #fff; font-family: 'Cinzel'; letter-spacing: 1px;">Contact VIP Host</p>
            <p style="margin: 0; font-size: 0.45rem; color: var(--gold); opacity: 0.7; text-transform: uppercase; letter-spacing: 1px;">Priority Lane & Special Requests</p>
        </div>
    </div>
</div>


            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:30px;">
       
<button class="cta-button" onclick="window.scrollTo(0,0); navigate('home')">HOME</button>


    <button class="cta-button upgrade-glow" 
            onclick="window.scrollTo(0,0); renderPrestigeAddons()" 
            style="background:var(--gold); color:#000; border:none; font-weight:900;">
        UPGRADE EXPERIENCE
    </button>
            </div>
        </div>
    `;
}

function contactVIPConcierge(id, show) {
    const phoneNumber = "33600000000"; // Ton numéro
    const message = encodeURIComponent(`Bonjour Bradford Concierge, je suis le membre titulaire du Pass ${id} pour l'événement ${show}. J'aimerais confirmer mon arrivée.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}


let prestigeCart = [];

function renderPrestigeAddons() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const catalog = {
    "SECURITY & DISCRETION": [
        { id: "S1", name: "Executive Perimeter Sentry", price: 1800, desc: "Déploiement de deux agents de protection rapprochée d'élite à la périphérie de votre zone. Ils assurent un tampon de sécurité de 5 mètres, gérant les flux de personnes de manière diplomatique mais ferme pour garantir votre tranquillité absolue." },
        { id: "S2", name: "Signal Encryption Matrix", price: 850, desc: "Activation d'un brouilleur de signaux localisé empêchant toute interception de données cellulaires ou captations audio/vidéo non autorisées dans un rayon de 10 mètres. Confidentialité totale pour vos échanges." },
        { id: "S3", name: "Subterranean Access Protocol", price: 550, desc: "Arrivée et départ via les tunnels logistiques privés du Bradford. Escorte directe depuis votre véhicule jusqu'à votre table par le chef de la sécurité, évitant la file d'attente, le tapis rouge et tout contact public." },
        { id: "S4", name: "Technical Counter-Measures", price: 650, desc: "Balayage technique complet (RF et thermique) de votre suite 15 minutes avant votre arrivée. Détection de micro-caméras ou d'enregistreurs. Un rapport d'intégrité vous est remis dès votre installation." },
        { id: "S5", name: "Biometric Table Vault", price: 300, desc: "Installation d'un coffre-fort temporaire à reconnaissance biométrique intégré à votre mobilier de table. Idéal pour sécuriser vos effets de haute valeur ou vos appareils personnels durant la soirée." },
        { id: "S6", name: "Digital Identity Scrubbing", price: 2100, desc: "Une équipe de monitoring surveille en temps réel les réseaux sociaux durant votre présence. Toute photo ou mention de votre localisation est immédiatement signalée et traitée pour suppression." },
        { id: "S7", name: "Guest Vetting Liaison", price: 900, desc: "Un agent dédié filtre chaque personne souhaitant rejoindre votre table. Vérification d'identité et accord numérique de votre part requis avant toute approche." },
        { id: "S8", name: "Emergency Medical Standby", price: 1200, desc: "Présence discrète d'un infirmier urgentiste qualifié à proximité immédiate de votre zone, équipé de matériel de réanimation et de soins de premier secours." },
        { id: "S9", name: "Cloakroom Valet Guard", price: 250, desc: "Surveillance physique continue de vos effets personnels au vestiaire par un agent dédié. Aucun accès tiers autorisé sans votre présence." }
    ],
    "ULTRA-LOGISTICS": [
        { id: "L1", name: "Chauffeur Standby Protocol", price: 400, desc: "Votre chauffeur est positionné dans la voie prioritaire 'First-Out', moteur préchauffé, portière maintenue ouverte dès que votre signal de départ est émis. Temps d'attente : zéro." },
        { id: "L2", name: "Fleet Exterior Detailing", price: 300, desc: "Nettoyage complet de l'extérieur de votre véhicule par nos experts valets durant votre soirée. Votre voiture vous est remise dans un état impeccable pour le départ." },
        { id: "L3", name: "Palace Shuttle Liaison", price: 500, desc: "Navette illimitée en Maybach entre le Bradford et les établissements partenaires (Ritz, George V, Crillon). Disponible à la seconde pour vos invités." },
        { id: "L4", name: "Baggage & Luxury Courier", price: 350, desc: "Gestion et stockage sécurisé de vos achats de luxe. Possibilité d'envoi immédiat par coursier privé vers votre hôtel ou votre jet privé durant la nuit." },
        { id: "L5", name: "Pre-Flight Coordination", price: 600, desc: "Liaison directe avec l'équipage de votre jet privé pour ajuster l'heure de décollage selon votre départ réel du club. Gestion des formalités douanières simplifiées." },
        { id: "L6", name: "VIP Parking Bay Lockdown", price: 450, desc: "Privatisation de deux emplacements de parking côte à côte pour éviter tout risque de collision ou de proximité avec d'autres véhicules." },
        { id: "L7", name: "Personal Concierge Runner", price: 400, desc: "Un coursier dédié à votre disposition pour toute course extérieure urgente (pharmacie, achat de luxe de dernière minute, récupération d'objets oubliés)." },
        { id: "L8", name: "Fuel & Fluids Maintenance", price: 150, desc: "Vérification des niveaux et plein de carburant premium effectué durant la soirée pour garantir un trajet de retour sans interruption." },
        { id: "L9", name: "Direct Terminal Transfer", price: 800, desc: "Transfert sécurisé vers le terminal d'aviation d'affaires avec accès direct sur le tarmac sans passer par le terminal public." }
    ],
    "PRESTIGE HOSPITALITY": [
        { id: "H1", name: "Dedicated Liquid Architect", price: 950, desc: "Un mixologue primé crée une carte de cocktails éphémères basée sur les profils aromatiques de vos invités. Service exclusif au shaker à votre table." },
        { id: "H2", name: "Grand Cru Caviar Ritual", price: 2200, desc: "250g de Caviar Beluga Royal servi sur une sculpture de glace artisanale. Accompagné de blinis tièdes, crème crue et d'une bouteille de vodka Beluga Gold Line." },
        { id: "H3", name: "Private Cellar Vault Key", price: 1500, desc: "Accès aux millésimes non listés sur la carte publique. Sélection de Cognacs d'avant-guerre et de Jéroboams de domaines mythiques (Romanée-Conti, Petrus)." },
        { id: "H4", name: "Morning Suite Restoration", price: 600, desc: "Coordination avec votre hôtel pour préparer votre retour : oxygénothérapie en chambre, menu d'hydratation spécifique et aromathérapie de récupération." },
        { id: "H5", name: "Master Humidor Service", price: 450, desc: "Sélection de cigares rares (Cohiba Behike, Davidoff Oro Blanco) présentés dans une cave nomade. Allumage rituel au bois de cèdre par notre sommelier en cigares." },
        { id: "H6", name: "Live Oysters & Shellfish", price: 800, desc: "Plateau de fruits de mer d'exception (Huîtres Gillardeau, homard bleu) préparé en direct à votre table par un maître écailler." },
        { id: "H7", name: "Truffle Infusion Service", price: 350, desc: "Râpage de truffes fraîches de saison sur vos mets et infusion de vos spiritueux bruns pour une expérience gustative complexe." },
        { id: "H8", name: "Table-Side Sommelier", price: 500, desc: "Présence continue d'un sommelier pour assurer une température de service parfaite au degré près et une aération optimale de chaque flacon." },
        { id: "H9", name: "Bespoke Dessert Mapping", price: 400, desc: "Création pâtissière sur-mesure servie avec une mise en scène visuelle et pyrotechnique coordonnée à la musique du club." }
    ],
    "SENSORIAL & TECH": [
        { id: "E1", name: "Acoustic Shield Bubble", price: 900, desc: "Utilisation de transducteurs ultrasoniques pour créer une zone de silence relatif autour de votre table. Parlez sans crier malgré la puissance sonore du club." },
        { id: "E2", name: "Main Stage Visual Sync", price: 1500, desc: "Prise de contrôle totale des écrans LED du club pendant 60 secondes. Diffusion de votre contenu personnalisé synchronisée avec un show lumière exclusif." },
        { id: "E3", name: "Holographic Table Mapping", price: 750, desc: "Projection interactive 3D sur votre table. Les visuels réagissent au mouvement des verres et créent une ambiance numérique évolutive." },
        { id: "E4", name: "Custom Olfactive Diffusion", price: 400, desc: "Diffusion d'une fragrance sur-mesure créée par notre nez via le système de ventilation localisé de votre booth VIP." },
        { id: "E5", name: "4K Cinematic Legacy", price: 1300, desc: "Un vidéographe professionnel capte les moments forts de votre soirée. Livraison d'un montage colorgradé de 90 secondes dès le lendemain midi." },
        { id: "E6", name: "Lighting Desk Access", price: 300, desc: "Prenez le contrôle de l'ambiance lumineuse de votre zone via un iPad dédié. Ajustez l'intensité et les nuances selon l'énergie de votre groupe." },
        { id: "E7", name: "Instant Social Edit", price: 500, desc: "Un moniteur vidéo crée des micro-clips optimisés pour vos réseaux sociaux en temps réel, livrés sur votre téléphone durant la soirée." },
        { id: "E8", name: "Private DJ Link", price: 1100, desc: "Système d'écouteurs haute fidélité permettant d'écouter le set du DJ sans la distorsion ambiante, avec un mixage audio personnalisé." },
        { id: "E9", name: "Augmented Reality Menu", price: 200, desc: "Visualisation de vos bouteilles et plats en 3D haute définition avant commande via des lunettes AR fournies." }
    ],
    "EXCLUSIVE PRIVILEGES": [
        { id: "P1", name: "After-Hours Extension", price: 2500, desc: "Maintien de l'ouverture d'une zone spécifique du club avec personnel réduit pour 1 heure supplémentaire après la fermeture officielle." },
        { id: "P2", name: "Celebrity Interaction Link", price: 3000, desc: "Mise en relation et invitation prioritaire pour des personnalités ou artistes présents dans l'établissement à rejoindre votre zone de manière informelle." },
        { id: "P3", name: "Global Bradford Membership", price: 5000, desc: "Accès prioritaire garanti dans nos établissements Bradford  (Miami, LA, NYC, SF)." },
        { id: "P4", name: "Private Barman Assistant", price: 700, desc: "Un assistant dédié uniquement au service des boissons à votre table, assurant que les verres ne soient jamais vides sans interrompre vos conversations." },
        { id: "P5", name: "Soundboard Shoutout", price: 1000, desc: "Le DJ résident effectue une annonce personnalisée ou une dédicace sonore durant le pic de la soirée selon vos instructions." },
        { id: "P6", name: "Art Curation Preview", price: 800, desc: "Accès privé à la collection d'art contemporain du club avec les explications d'un curator avant l'ouverture des portes." },
        { id: "P7", name: "Reserved Dancefloor Pod", price: 1400, desc: "Sécurisation d'un espace restreint directement sur le dancefloor principal, réservé uniquement à vos invités pour danser sans contact extérieur." },
        { id: "P8", name: "Champagne Bath Ritual", price: 4000, desc: "Service spectaculaire de 12 bouteilles de prestige ouvertes simultanément pour un arrosage rituel ou un service de groupe massif." },
        { id: "P9", name: "Direct Owner Liaison", price: 1500, desc: "Ligne directe avec le propriétaire ou le directeur général pour toute demande spéciale ou ajustement de dernière minute durant la nuit." }
    ]
};


    let html = `
    <div class="floating-prestige-bar">
        <h2 id="live-total" style="color:var(--gold); font-family:'Inter'; font-size:1.2rem; margin:0;">$0</h2>
        <button id="main-validate-cta" onclick="openPaymentPortal()" 
                style="background:var(--gold); color:#000; border:none; padding:8px 30px; border-radius:30px; font-family:'Cinzel'; font-weight:900; font-size:0.7rem; opacity:0.3; cursor:pointer;" disabled>
            VALIDATE
        </button>
    </div>

    <div style="max-width:850px; margin:0 auto; padding:0 20px;">
        <h1 style="font-family:'Cinzel'; text-align:center; letter-spacing:15px; margin: 40px 0; font-size:2rem;">ADD-ONS</h1>
    `;

    for (const [section, items] of Object.entries(catalog)) {
        html += `<h2 style="font-family:'Cinzel'; font-size:0.9rem; letter-spacing:6px; color:#444; margin:70px 0 25px 0; border-bottom:1px solid #111; padding-bottom:15px;">${section}</h2>`;
        items.forEach(item => {
            html += `
            <div class="addon-card-refined" id="item-${item.id}">
                <div class="trigger-zone" onclick="toggleServiceSelection('${item.id}', '${item.name}', ${item.price})">
                    <div style="display:flex; align-items:center;">
                        <div class="check-circle"></div>
                        <span style="font-family:'Cinzel'; color:#fff; font-size:1rem; letter-spacing:1px;">${item.name}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:30px;">
                        <span style="font-family:'Inter'; color:var(--gold); font-size:1.1rem; font-weight:200;">$${item.price}</span>
                        <span onclick="event.stopPropagation(); toggleDrawer('${item.id}')" style="font-size:0.55rem; color:#444; letter-spacing:2px; padding:10px;">DETAILS +</span>
                    </div>
                </div>
                <div class="description-drawer" id="drawer-${item.id}">
                    <p style="color:#777; font-size:0.85rem; line-height:1.7; margin:0;">${item.desc}</p>
                    <div style="margin-top:10px; display:flex; gap:15px;">
                        <span style="font-size:0.6rem; color:var(--gold); border:1px solid rgba(212,175,55,0.2); padding:3px 8px; border-radius:3px;">BRADFORD CERTIFIED</span>
                        <span style="font-size:0.6rem; color:#444;">PRIORITY DEPLOYMENT</span>
                    </div>
                </div>
            </div>`;
        });
    }
    html += `</div>`;
    APP_CONTENT.innerHTML = html;
}

function toggleDrawer(id) {
    const d = document.getElementById(`drawer-${id}`);
    d.classList.toggle('expanded');
}

function toggleServiceSelection(id, name, price) {
    const card = document.getElementById(`item-${id}`);
    const idx = prestigeCart.findIndex(a => a.id === id);

    if (idx > -1) {
        prestigeCart.splice(idx, 1);
        card.classList.remove('is-selected');
    } else {
        prestigeCart.push({ id, name, price });
        card.classList.add('is-selected');
    }

    const total = prestigeCart.reduce((s, a) => s + a.price, 0);
    document.getElementById('live-total').innerText = `$${total.toLocaleString()}`;
    const btn = document.getElementById('main-validate-cta');
    btn.disabled = total === 0;
    btn.style.opacity = total === 0 ? "0.3" : "1";
}



function openPaymentPortal() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const total = prestigeCart.reduce((s, a) => s + a.price, 0);

    APP_CONTENT.innerHTML = `
    <div class="fadeIn" style="max-width:550px; margin:0 auto; padding:60px 20px;">
        <h1 style="font-family:'Cinzel'; text-align:center; letter-spacing:12px; color:#fff; font-size:1.8rem; margin-bottom:10px;">PAYMENT</h1>
        <p style="text-align:center; color:#333; font-size:0.6rem; letter-spacing:4px; margin-bottom:50px;">SECURE CHECKOUT PROTOCOL</p>
        
        <div style="background:rgba(255,255,255,0.01); border:1px solid #111; padding:35px; border-radius:20px; margin-bottom:40px;">
            <h4 style="font-family:'Cinzel'; font-size:0.65rem; color:var(--gold); margin-bottom:20px; border-bottom:1px solid #111; padding-bottom:10px;">RECAPITULATIVE</h4>
            ${prestigeCart.map(item => `
                <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:0.85rem;">
                    <span style="color:#777;">${item.name}</span>
                    <span style="color:#fff;">$${item.price}</span>
                </div>
            `).join('')}
            <div style="border-top:1px solid #222; margin-top:25px; padding-top:20px; display:flex; justify-content:space-between; font-family:'Cinzel'; font-size:1.5rem; color:var(--gold);">
                <span>TOTAL</span><span>$${total.toLocaleString()}</span>
            </div>
        </div>

        <div style="background:#050505; border:1px solid #222; border-radius:25px; padding:45px;">
            <input type="text" placeholder="CARDHOLDER NAME" class="input-card-pro">
            <input type="text" placeholder="CARD NUMBER" class="input-card-pro">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px;">
                <input type="text" placeholder="MM/YY" class="input-card-pro">
                <input type="text" placeholder="CVC" class="input-card-pro">
            </div>
            <button onclick="processPrestigePayment()" style="width:100%; margin-top:40px; background:var(--gold); color:#000; font-family:'Cinzel'; font-weight:900; height:65px; border:none; border-radius:50px; cursor:pointer; letter-spacing:2px;">AUTHORIZE</button>
        </div>
        
        <button onclick="renderPrestigeAddons()" style="width:100%; background:none; border:none; color:#333; margin-top:25px; font-size:0.6rem; text-decoration:underline; cursor:pointer;">RETURN TO SELECTION</button>
    </div>
    `;
}

// TA PAGE FINALE INTACTE (VERROUILLÉE)
function processPrestigePayment() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Animation de scan/encryptage
    APP_CONTENT.innerHTML = `
        <div style="height:80vh; display:flex; flex-direction:column; justify-content:center; align-items:center;">
            <div style="width:100px; height:2px; background:#111; position:relative; overflow:hidden;">
                <div style="width:40px; height:100%; background:var(--gold); position:absolute; animation: scan 1.5s infinite ease-in-out;"></div>
            </div>
            <p style="font-family:'Cinzel'; color:var(--gold); margin-top:20px; letter-spacing:5px; font-size:0.7rem;">AUTHORIZING PROTOCOL...</p>
        </div>
    `;

    setTimeout(() => {
        const total = prestigeCart.reduce((s, x) => s + x.price, 0);
        
        APP_CONTENT.innerHTML = `
        <div class="prestige-page fadeIn" style="padding:60px 20px; max-width:600px; margin:0 auto; text-align:center;">
            <div style="margin-bottom:30px;">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>

            <h1 style="font-family:'Cinzel'; font-size:1.8rem; letter-spacing:8px; color:#fff; margin-bottom:10px;">CONFIRMED</h1>
            <p style="color:#555; font-size:0.7rem; letter-spacing:3px; margin-bottom:50px;">YOUR SERVICES ARE SECURED FOR TONIGHT</p>

            <div style="text-align:left; background:rgba(255,255,255,0.01); border:1px solid #111; border-radius:20px; padding:40px;">
                <h4 style="font-family:'Cinzel'; font-size:0.6rem; color:var(--gold); margin-bottom:20px; border-bottom:1px solid #222; padding-bottom:10px;">TRANSACTION SUMMARY</h4>
                
                <div style="max-height:200px; overflow-y:auto; margin-bottom:20px; padding-right:10px;">
                    ${prestigeCart.map(i => `
                        <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:0.8rem;">
                            <span style="color:#999;">${i.name}</span>
                            <span style="color:#fff;">$${i.price}</span>
                        </div>
                    `).join('')}
                </div>

                <div style="display:flex; justify-content:space-between; padding-top:20px; border-top:1px dotted #333; font-family:'Inter'; font-weight:900; font-size:1.3rem;">
                    <span style="color:#fff;">TOTAL PAID</span>
                    <span style="color:var(--gold);">$${total.toLocaleString()}</span>
                </div>
            </div>

            <div style="margin-top:60px;">
        <button onclick="prestigeCart = []; window.scrollTo(0,0); navigate('home')" 
        style="background:none; border:1px solid #333; color:#fff; padding:15px 40px; border-radius:50px; font-family:'Cinzel'; font-size:0.7rem; letter-spacing:2px; cursor:pointer; transition:0.3s;">
    CLOSE & RETURN TO HOME
</button>

                <p style="color:#333; font-size:0.5rem; margin-top:20px;">A confirmation has been sent to your concierge liaison.</p>
            </div>
        </div>
        `;
    }, 2500);
}

function resetPrestigeAndExit() {
    // 1. On vide le panier en mémoire
    prestigeCart = []; 
    
    // 2. On remonte en haut de la page pour le prochain affichage
    window.scrollTo(0,0); 
    
    // 3. On retourne à l'accueil
    navigate('home'); 
}


function openPolicyMenu() {
    // On crée l'élément s'il n'existe pas déjà
    if (!document.getElementById('policy-overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'policy-overlay';
        overlay.className = 'policy-overlay';
        overlay.innerHTML = `
            <div class="close-policy" onclick="closePolicyMenu()">X</div>
            <p style="color: var(--gold); font-size: 0.7rem; letter-spacing: 5px; margin-bottom: 40px;">LEGAL & REQUIREMENTS</p>
            
            <a class="policy-link" onclick="window.scrollTo(0,0); handlePolicyClick('dress_code')">DRESS CODE</a>
            <a class="policy-link" onclick="window.scrollTo(0,0); handlePolicyClick('entry_policy')">ENTRY POLICY</a>
            <a class="policy-link" onclick="window.scrollTo(0,0); handlePolicyClick('vip_policy')">VIP POLICY</a>
            <a class="policy-link" onclick="window.scrollTo(0,0); handlePolicyClick('bottle_service_req')">BOTTLE REQUIREMENTS</a>
            <a class="policy-link" onclick="window.scrollTo(0,0); handlePolicyClick('house_rules')">HOUSE RULES</a>
            <a class="policy-link" onclick="window.scrollTo(0,0); handlePolicyClick('guest_guidelines')">GUEST GUIDELINES</a>
            
            <div style="margin-top: 50px; opacity: 0.3; font-size: 0.6rem; color: white;">THE BRADFORD GLOBAL PROTOCOL</div>
        `;
        document.body.appendChild(overlay);
    }


    // Petit délai pour l'animation
    setTimeout(() => {
        document.getElementById('policy-overlay').classList.add('active');
    }, 10);
}

function closePolicyMenu() {
    const overlay = document.getElementById('policy-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

function handlePolicyClick(page) {
    closePolicyMenu(); // On ferme le menu d'abord
    navigate(page);    // On affiche la page demandée
}
const B_ENGINE = {
    lex: {
        titles: ["Baron", "Sheikh", "Lord", "Don", "Saint", "Vip", "Elite", "Pro", "Agent", "Sir", "Excellency", "Master", "The", "Real", "Official", "Crypto", "Czar", "Archduke"],
        roots: ["Vand", "Roth", "Berg", "Kru", "Lex", "Zon", "Mamba", "Drey", "Ciroc", "Bibi", "Rico", "Belmo", "Nova", "Mars", "Astro", "Dior", "Carti", "Bape", "Gero", "Santi", "Trez", "Yara", "Kush", "Volt", "Neon", "Xan", "Onyx", "Ryu", "Ken", "Morpheus", "Hades", "Zeus", "Odin", "Tesla", "Gatsby", "Wolf", "WallSt", "Borg", "Cyber", "Mecha", "Satoshi"],
        hex: ["0x", "ID_", "RX-", "N_", "M_", "VOLT_"],
        narratives: ["I remember when the Bradford was just a basement. Now I'm spending 40k on a Tuesday.", "The manager recognized my shoes and skipped the 500 person line. That's power.", "I saw a guy lose his Rolex in the moshpit and he didn't even care, he just ordered another bottle of Ace of Spades.", "Security tried to talk to me about my behavior but then they saw my black card and apologized. Pure gold.", "The bass frequency was so low I could feel my teeth vibrating. I think I met God near the subwoofers.", "Ordered the 5-liter Belvedere and it came out with 10 girls and enough sparklers to start a forest fire.", "Waitress spilled a drop of Gin on my hand-made Italian leather loafers. I should have sued but the music was too good.", "Met a girl from Dubai who said this place is better than the Burj Al Arab rooftop. Facts.", "The line outside is a graveyard of dreams. Inside, it's a paradise of excess.", "Incredible. The lasers literally felt like they were cutting through my soul. 10/10 energy.", "90$ for water? Who cares. When you're in the elite hub, money is just paper.", "I saw a producer from LA crying in the VIP section because the drop was too beautiful."],
        global: ["FR: C'est l'élite ou rien. Point final.", "ES: Una locura total, no hay palabras para describir este lugar.", "RU: Это лучший клуб в мире, без сомнения.", "AR: Ma sha Allah, the energy here is crazy habibi.", "CN: 这里的音乐简直不可思议，太棒了！", "IT: La vera dolce vita è qui stasera.", "DE: Absolute Weltklasse. Ich komme wieder.", "JP: 最高。この場所は伝説的です.", "FR: 90 balles l'entrée mais franchement, la sécu est trop carrée.", "FR: Gros big up à l'équipe, on a cassé la démarche toute la nuit."],
        details: ["spending rent money", "fiscal dominance", "90$ entry", "overpriced ice", "digital acoustics", "CO2 saturation", "sub-zero vibes", "premium markup", "blue chip party", "asset liquidation", "150$ cocktails", "2k deposit", "VIP tax"],
        slang: ["lit af", "no cap", "period.", "facts.", "10/10", "vibes", "shoutout", "fire", "mid", "trash tbh", "deadass", "sheesh", "L", "W", "bussin", "sus", "on god", "straight gas", "clout", "gucci", "main character energy", "bet", "real talk", "finna", "slay", "ate", "valid", "clapped", "drip", "iced out", "opps", "gz", "gang", "goated", "pressed", "salty", "thick vibe", "lowkey", "highkey", "rent free", "ratio", "canceled", "glitchy", "raw", "pure savage", "finesse", "flex", "snatched", "turnt", "zooted", "geeked", "faded", "clutch", "cap", "brazy", "p", "pushing p", "yeet", "skrrt", "on fleek", "periodt", "purr", "boujee", "riri", "steeze", "stan", "slaps", "hard", "heavy", "nasty", "filthy", "grim", "cold", "frozen"],
        finance: ["90$ entry fee", "150$ for two drinks", "bottle minimums", "luxury tax", "ROI on a single night", "spending 5k in 10mins", "inflation pricing", "black card status", "cryptobro spending", "recession proof", "overpriced ice", "worth the 2k deposit", "premium markup", "budget killer", "monopoly money", "bankrupting the vibes", "worth every cent", "robbery at the bar", "fiscal disaster", "market value of a smile", "capitalist dream", "spending rent money", "worth the bankruptcy", "economic collapse at the entrance", "wealth display", "excessive charge", "service fee scam", "unlimited credit", "limitless spending", "tax-free fun", "offshore vibes", "equity in the dancefloor", "blue chip clubbing", "asset liquidation"],
        tech: ["sub-bass frequencies", "reverb levels", "LED pixel pitch", "smoke machine density", "CO2 jets timing", "acoustical treatment", "dry ice saturation", "decibel limiters", "soundstage depth", "lasers focal point", "haptic feedback", "sensory overload", "biomechanical rhythm", "automated light tracking", "infra-red security", "neural sync", "digital distortion", "analog warmth", "low-pass filters", "glitch in the matrix", "hertz saturation", "mechanical doors", "cryogenic cooling", "technological nirvana", "pixelated reality", "high-definition sweat", "ultraviolet sanitization", "frequency modulation", "hyper-realistic bass", "artificial intelligence djs", "algorithmic dance", "virtual reality check", "latency in the bar queue"],
        stories: ["dropped my phone in the ice bucket", "security checked my socks", "met a guy from mars", "lost a shoe in the pit", "talked about philosophy with the bartender", "saw a spider on the VIP couch", "ordered water and it cost 20$", "spilled gin on a celebrity", "waited 4h in the rain for nothing", "the manager gave me a strange look", "found a 50$ bill on the floor", "cried because the bass was too loud", "my shirt got ripped in the crowd", "someone asked for my autograph by mistake", "spent 20 mins looking for the exit", "the bathroom mirror is a portal", "the coat check lady is a legend", "met my ex at the bar (awkward)", "forgot my name at 3 AM", "somebody was eating pizza on the dancefloor", "saw a producer from Berlin crying", "the valet lost my keys for 5 mins", "argued about a cocktail for an hour", "found out the DJ is my cousin", "the lasers burned my retina", "the ice cubes are shaped like diamonds"],
        langs: ["incroyable vibe", "la mejor noche", "bellissimo", "pure madness", "trop de monde", "c'est mort", "vamos a la playa vibe", "que lo que", "habibi vibes", "shukran", "merci la zone", "c'est carré", "de puta madre", "increible", "magnifique", "wunderbar", "nani?", "desu", "ciao bella", "perfection totale", "no mames", "ya habibi", "wallah", "franchement top", "mamma mia", "c'est la dèche", "la vie en rose gold", "pura vida", "superbe", "brutal", "espectacular", "extraordinaire", "chiant mais beau", "incroyable mais vrai"],
        vibes: ["ethereal", "claustrophobic", "majestic", "toxic", "heavenly", "foul", "stunning", "disgusting", "elite", "basic", "pretentious", "underground", "commercial", "raw", "polished", "aggressive", "soft", "nostalgic", "futuristic", "vintage", "cheap", "opulent", "messy", "organized chaos", "melancholic", "feverish", "ecstatic", "boring", "infinite", "fleeting", "crushing", "uplifting", "dark", "bright", "glitchy", "smooth", "rugged", "pure", "corrupt", "sacred", "profane", "sublime", "ridiculous", "absurd", "consistent", "chaotic"]
    },

    stats: { total: 0, stars: [52835, 3195, 1215, 258, 151] },
    db: [],
    display_limit: 10,

    init() {
        // CHARGER LE COMPTEUR PERSISTANT
        const savedCount = localStorage.getItem("BRADFORD_COUNT");
        this.stats.total = savedCount ? parseInt(savedCount) : 57923;

        this.generateData(1000); 

        // CHARGER TES MESSAGES SAUVEGARDÉS
        const savedMsgs = JSON.parse(localStorage.getItem("BRADFORD_MY_MSGS") || "[]");
        this.db = [...savedMsgs, ...this.db];

        this.renderStats();
        this.render();
        this.startLiveEngine();
    },

    genUser() {
        const L = this.lex;
        const pick = (a) => a[Math.floor(Math.random()*a.length)];
        const dice = Math.random();
        if (dice > 0.8) return pick(L.hex) + Math.random().toString(16).slice(2, 8).toUpperCase();
        if (dice > 0.5) return pick(L.titles) + pick(L.roots);
        return pick(L.roots) + Math.floor(Math.random()*999);
    },

    genText(star) {
        const L = this.lex;
        const pick = (a) => a[Math.floor(Math.random()*a.length)];
        const langDice = Math.random();
        let targetLang = langDice > 0.7 ? "FR" : "EN";

        let message = [];
        const layers = Math.floor(Math.random() * 5) + 3; 

        for(let i=0; i < layers; i++) {
            const r = Math.random();
            if(targetLang === "EN") {
                if (r > 0.8) message.push(pick(L.narratives));
                else if (r > 0.6) message.push(pick(L.stories));
                else if (r > 0.4) message.push(pick(L.finance).toUpperCase()); 
                else message.push(pick(L.slang).toUpperCase() + "!!!");
            } else {
                const frNarratives = L.global.filter(s => s.startsWith("FR: ")).map(s => s.replace("FR: ", ""));
                const frSlang = L.langs.filter(s => !s.includes(":"));
                message.push(r > 0.5 ? pick(frNarratives) : pick(frSlang));
            }
        }
        return (star <= 2) ? message.join(" ").toLowerCase() : message.join(" ");
    },

     createReview(index, isNew = false) {
        const cities = ["NY", "LA", "SF", "MIA"];
        const star = Math.random() > 0.9 ? 4 : 5;
        
        // On calcule le nombre de minutes
        const minutes = isNew ? 0 : index * 5; 

        return {
            name: this.genUser(),
            city: cities[Math.floor(Math.random()*4)],
            star: star,
            msg: this.genText(star),
            rawTime: minutes,
            // C'EST ICI : On utilise la fonction de conversion
            timeLabel: this.formatTime(minutes) 
        };
    },

    formatTime(m) {
        if (m < 1) return "JUST NOW";
        if (m < 60) return m + "m ago";
        
        const hours = Math.floor(m / 60);
        if (hours < 24) {
            return hours + "h ago";
        }
        
        const days = Math.floor(hours / 24);
        return days + "d ago";
    },

    generateData(count) { for(let i=0; i<count; i++) this.db.push(this.createReview(i)); },

    startLiveEngine() {
        setInterval(() => {
            this.stats.total++;
            localStorage.setItem("BRADFORD_COUNT", this.stats.total);
            this.stats.stars[0]++; 
            this.db.unshift(this.createReview(0, true));
            this.render();
            this.renderStats();
        }, 60000); 
    },

    renderStats() {
        const s = document.getElementById('statsBars');
        const counterEl = document.getElementById('live-counter');
        const avgEl = document.getElementById('live-avg');

        if(counterEl) counterEl.innerText = this.stats.total.toLocaleString();
        if(s) {
            s.innerHTML = this.stats.stars.map((c, i) => {
                const percent = (c / this.stats.total) * 100;
                return `<div class="bar-row"><span>${5-i}★</span><div class="bar-fill-bg"><div class="bar-fill" style="width:${percent}%"></div></div><span>${c.toLocaleString()}</span></div>`;
            }).join('');
        }
        if(avgEl) {
            const sum = (this.stats.stars[0]*5) + (this.stats.stars[1]*4) + (this.stats.stars[2]*3) + (this.stats.stars[3]*2) + (this.stats.stars[4]*1);
            avgEl.innerText = (sum / this.stats.total).toFixed(2);
        }
    },

        render() {
        const wall = document.getElementById('masterWall');
        if(!wall) return;

        // Récupération des valeurs des filtres
        const cityF = document.getElementById('f-city')?.value || 'all';
        const starF = document.getElementById('f-stars')?.value || 'all';
        const orderF = document.getElementById('f-order')?.value || 'new';

        // FILTRAGE
        let filtered = this.db.filter(r => {
            const matchCity = (cityF === 'all' || r.city === cityF);
            const matchStar = (starF === 'all' || r.star == starF);
            return matchCity && matchStar;
        });
        
        // TRI (Sorting) - Crucial pour que ça s'affiche
        if(orderF === 'new') {
            filtered.sort((a, b) => a.rawTime - b.rawTime);
        } else {
            filtered.sort((a, b) => b.rawTime - a.rawTime);
        }

        // AFFICHAGE
        wall.innerHTML = "";
        
        if (filtered.length === 0) {
            wall.innerHTML = "<div style='color:var(--gold); text-align:center; padding:50px; opacity:0.5;'>NO ARCHIVES FOUND FOR THIS CRITERIA</div>";
            return;
        }

        const visible = filtered.slice(0, this.display_limit);
        visible.forEach(r => {
            wall.innerHTML += `
                <div class="rev-card">
                    <div class="rev-meta"><span>${r.city} • CRYPTO-SIGNED</span><span>${r.timeLabel}</span></div>
                    <div class="rev-u">${r.name}</div>
                    <div style="color:gold; font-size:0.7rem; margin-bottom:10px;">${"★".repeat(r.star)}</div>
                    <p class="rev-t">"${r.msg}"</p>
                </div>`;
        });

        // Bouton Load More
        if (filtered.length > this.display_limit) {
            wall.innerHTML += `<div style="text-align:center; width:100%;"><button onclick="B_ENGINE.loadMore()" class="btn-refine" style="margin: 20px auto;">LOAD PREVIOUS RECORDS</button></div>`;
        }
    },


    loadMore() { this.display_limit += 10; this.render(); }
};

B_ENGINE.init();

// --- FONCTIONS INTERFACE ---
function applyFilters() {
    // 1. Reset de la limite d'affichage
    B_ENGINE.display_limit = 10; 
    
    // 2. Lancement du moteur de rendu
    B_ENGINE.render(); 
    
    // 3. Fermeture du menu
    closeNav();
    
    // 4. Feedback console pour vérifier que l'ID est bien lu
    console.log("Archive Filtered for:", document.getElementById('f-city').value);
}


function pushReview() {
    const name = document.getElementById('g-name').value || "ANONYMOUS";
    const city = document.getElementById('g-city').value;
    const star = parseInt(document.getElementById('g-stars').value);
    const msg = document.getElementById('g-msg').value;
    if(!msg) return alert("YOUR TESTIMONY IS REQUIRED");

    const newEntry = { name: name.toUpperCase(), city: city, star: star, msg: msg, rawTime: 0, timeLabel: "JUST NOW" };
    let myMsgs = JSON.parse(localStorage.getItem("BRADFORD_MY_MSGS") || "[]");
    myMsgs.unshift(newEntry);
    localStorage.setItem("BRADFORD_MY_MSGS", JSON.stringify(myMsgs));
    B_ENGINE.db.unshift(newEntry);
    B_ENGINE.render();
    document.getElementById('g-msg').value = "";
    closeWriteForm();
}

function openNav() { document.getElementById("filterNav").style.right = "0"; }
function closeNav() { document.getElementById("filterNav").style.right = "-100%"; }
function openWriteForm() { document.getElementById("writePanel").style.right = "0"; }
function closeWriteForm() { document.getElementById("writePanel").style.right = "-100%"; }

class BradfordVisualEngine {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 450; 
        this.speed = 0.8; // Vitesse plus classe et fluide
        
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.rescale());
    }

    init() {
        this.rescale();
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: (Math.random() - 0.5) * this.canvas.width * 2,
                y: (Math.random() - 0.5) * this.canvas.height * 2,
                z: Math.random() * this.canvas.width,
                size: Math.random() * 1.5 + 0.5
            });
        }
    }

    rescale() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        // ON NETTOIE EN NOIR PUR (Pas de transparence qui fait clignoter)
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        for (let star of this.stars) {
            star.z -= this.speed;

            if (star.z <= 0) {
                star.z = this.canvas.width;
                star.x = (Math.random() - 0.5) * this.canvas.width * 2;
                star.y = (Math.random() - 0.5) * this.canvas.height * 2;
            }

            // Projection 3D vers 2D
            const focal = this.canvas.width * 0.8;
            const px = (star.x / star.z) * focal + centerX;
            const py = (star.y / star.z) * focal + centerY;

            // Taille dynamique
            const s = (1 - star.z / this.canvas.width) * 2.5;
            
            // Couleur OR pur sans effets de lueur qui saturent
            const opacity = (1 - star.z / this.canvas.width);
            this.ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;

            // On dessine le point (la météorite)
            if (px > 0 && px < this.canvas.width && py > 0 && py < this.canvas.height) {
                this.ctx.beginPath();
                this.ctx.arc(px, py, s, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Lancement propre
window.addEventListener('DOMContentLoaded', () => {
    new BradfordVisualEngine();
});

class BradfordNerveEngine {
    constructor() {
        this.canvas = document.getElementById('audio-wave-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.bpmElement = document.getElementById('bpm-counter');
        this.scrollPos = 0;
        this.velocity = 0;
        this.points = [];
        this.init();
    }

    init() {
        this.canvas.width = 160;
        this.canvas.height = 30;
        for(let i=0; i<20; i++) {
            this.points.push({ x: (160/20)*i, y: 15, targetY: 15 });
        }
        this.render();
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
    const currentScroll = window.scrollY;
    this.velocity = Math.abs(currentScroll - this.scrollPos);
    this.scrollPos = currentScroll;
    
    const bar = document.getElementById('bradford-nerve-center');
    const conciergeBtn = document.querySelector('.floating-concierge-btn');

    // On n'affiche les éléments que si on a scrollé de plus de 150px 
    // (ce qui garantit que l'utilisateur est sorti de l'écran d'accueil/loader)
    if(currentScroll > 150) {
        bar.style.transform = "translateY(0)";
        if(conciergeBtn) conciergeBtn.style.opacity = "1";
        if(conciergeBtn) conciergeBtn.style.pointerEvents = "auto";
    } else {
        bar.style.transform = "translateY(100%)";
        if(conciergeBtn) conciergeBtn.style.opacity = "0";
        if(conciergeBtn) conciergeBtn.style.pointerEvents = "none";
    }
}


    render() {
        this.ctx.clearRect(0, 0, 160, 30);
        
        // Simulation d'onde sonore basée sur le scroll
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#D4AF37';
        this.ctx.lineWidth = 1.5;
        this.ctx.lineCap = 'round';

        this.points.forEach((p, i) => {
            // Mathématiques de l'onde (Sinus + Bruit aléatoire + Vélocité de scroll)
            const noise = (Math.random() - 0.5) * (this.velocity * 0.5);
            p.targetY = 15 + Math.sin(Date.now() * 0.01 + i) * (this.velocity * 0.3) + noise;
            p.y += (p.targetY - p.y) * 0.2; // Lissage

            if(i === 0) this.ctx.moveTo(p.x, p.y);
            else this.ctx.lineTo(p.x, p.y);
        });
        
        this.ctx.stroke();

        // Mise à jour du BPM (Simulation de rythme de boîte de nuit)
        const targetBpm = 120 + Math.floor(this.velocity * 0.5);
        this.bpmElement.innerText = `${Math.min(targetBpm, 180)} BPM`;

        this.velocity *= 0.95; // Amortissement
        requestAnimationFrame(() => this.render());
    }
}

// Initialisation dès que le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new BradfordNerveEngine();
});

const orbit = document.getElementById('quantum-orbit');
const nodes = document.querySelectorAll('.nav-node');
let angle = 0;
let velocity = 0;
let isDragging = false;
let lastX = 0;

// Positionnement initial des nodes en cercle
nodes.forEach((node, i) => {
    const theta = (i / nodes.length) * (Math.PI * 2);
    const x = 150 + Math.cos(theta) * 130 - 25;
    const y = 150 + Math.sin(theta) * 130 - 25;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
});

// Gestion du Touch & Drag
window.addEventListener('touchstart', (e) => {
    isDragging = true;
    lastX = e.touches[0].clientX;
});

window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - lastX;
    velocity = deltaX * 0.1; // On génère de la vitesse
    lastX = e.touches[0].clientX;
});

window.addEventListener('touchend', () => {
    isDragging = false;
});

function updateRotation() {
    if (!isDragging) {
        velocity *= 0.95; // Friction : ralentit tout seul
    }
    angle += velocity;
    orbit.style.transform = `rotateY(${angle * 20}deg) rotateZ(${angle * 10}deg)`;
    
    // Contre-rotation pour que les icônes restent lisibles (Maths complexes)
    nodes.forEach(node => {
        node.style.transform = `rotateZ(${-angle * 10}deg) rotateY(${-angle * 20}deg)`;
    });

    requestAnimationFrame(updateRotation);
}

updateRotation();

class NeuralEventEngine {
    constructor() {
        this.canvas = document.getElementById('event-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.rescale();
        this.createFineGoldParticles();
        this.loadArtistData();
        this.startSequence();
        window.addEventListener('resize', () => this.rescale());
    }

    rescale() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createFineGoldParticles() {
        // On crée une "poussière d'or" (2000 particules très fines)
        for(let i=0; i<2000; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.2,
                color: `rgba(212, 175, 55, ${Math.random() * 0.6})`,
                speed: 0.2 + Math.random() * 0.5
            });
        }
    }

 loadArtistData() {
    try {
        const events = donneesEvenements;
        if (!events || events.length === 0) return; // Sécurité si tableau vide

        const maintenant = new Date();
        maintenant.setHours(0, 0, 0, 0);

        const megaStars = [
            "SKRILLEX", "FRED AGAIN", "RICK ROSS", "DJ KHALED", "JUSTICE", "DOJA CAT", "DRAKE", "RIHANNA", "BIEBER", "TRAVIS SCOTT", "KANYE", "WEEKND", "POST MALONE", "FUTURE", "21 SAVAGE",
            "ANYMA", "TALE OF US", "ERIC PRYDZ", "CALVIN HARRIS", "GUETTA", "TIESTO", "GARRIX", "PEGGY GOU", "BLACK COFFEE", "KEINEMUSIK", "ADAM PORT", "RAMPA", "CHARLOTTE DE WITTE", 
            "AMELIE LENS", "CARL COX", "SOLOMUN", "FISHER", "CHRIS LAKE", "MICHAEL BIBI", "PAWSA", "VINTAGE CULTURE", "BICEP", "RUFUS", "ARTBAT", "ADRIATIQUE", "MONOLINK", "TCHAMI", "MALAA",
            "SNAKE", "ALOK", "AFROJACK", "STEVE AOKI", "KYGO", "MALUMA", "BAD BUNNY", "BURNA BOY", "WIZKID", "ASAP ROCKY", "HONEY DIJON", "FOLAMOUR", "CLAPTONE", "BARRY CAN'T SWIM"
        ];

        let winner = null;
        let highestScore = -1;

        events.forEach(ev => {
            // Sécurité : on vérifie que ev.date existe bien
            if (!ev.date) return;

            const dateEv = new Date(ev.date); 
            // Si la date est valide et qu'elle est aujourd'hui ou dans le futur
            if (!isNaN(dateEv) && dateEv >= maintenant) {
                let score = 0;
                const artistUpper = (ev.artiste || "").toUpperCase();
                const detailsUpper = (ev.details || "").toUpperCase();

                megaStars.forEach(star => {
                    if (artistUpper.includes(star)) score += 1000;
                });

                if (detailsUpper.includes("ACCÈS RESTREINT")) score += 500;
                if (detailsUpper.includes("VIP FULL") || detailsUpper.includes("SOLD OUT")) score += 400;
                if (detailsUpper.includes("EXCLUSIVE") || detailsUpper.includes("SPECIAL GUEST")) score += 300;
                if (detailsUpper.includes("B2B")) score += 200;
                if (ev.jour === "SAM.") score += 100;
                if (ev.jour === "VEN.") score += 50;

                if (score > highestScore) {
                    highestScore = score;
                    winner = ev;
                }
            }
        });

        // --- INJECTION AVEC SÉCURITÉ ---
        if (winner) {
            const nameEl = document.getElementById('neural-artist-name');
            const locationEl = document.getElementById('n-location');
            const priceEl = document.getElementById('n-price');
            const bioEl = document.getElementById('neural-bio-text');

            // Formatage date
            const options = { weekday: 'long', day: 'numeric', month: 'long' };
            const dateObj = new Date(winner.date);
            const dateFull = !isNaN(dateObj) ? dateObj.toLocaleDateString('fr-FR', options).toUpperCase() : "";

            if (nameEl) nameEl.innerText = winner.artiste;
            if (locationEl) locationEl.innerText = winner.ville + ", USA";

            const prixExtraite = (winner.details && winner.details.includes('$')) 
                ? winner.details.match(/\$\d+/)[0] 
                : "90$";
            if (priceEl) priceEl.innerText = prixExtraite;

            if (bioEl) {
                bioEl.innerHTML = `<span style="color: #D4AF37; display: block; margin-bottom: 5px;">${dateFull}</span>${winner.details}`;
            }
        } else {
            // SI AUCUN GAGNANT TROUVÉ (Ex: toutes les dates sont passées)
            // On affiche un message par défaut pour ne pas laisser de vide
            const nameEl = document.getElementById('neural-artist-name');
            if (nameEl) nameEl.innerText = "NEXT EVENT COMING SOON";
        }

    } catch (e) {
        // TRÈS IMPORTANT : Si le code plante, on l'affiche dans la console pour débugger
        console.error("Erreur critique loadArtistData :", e);
    }
}


    startSequence() {
        const engine = document.getElementById('neural-event-engine');
        engine.style.display = 'block';
        setTimeout(() => engine.style.opacity = "1", 100);
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Animation des particules (effet nébuleuse spatiale)
        this.particles.forEach(p => {
            p.y -= p.speed; // Elles montent lentement
            if(p.y < 0) p.y = this.canvas.height;
            
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Fonctions de contrôle mises à jour
function shutdownEngine() {
    const engine = document.getElementById('neural-event-engine');
    if (engine) {
        engine.style.opacity = "0";
        
        setTimeout(() => {
            engine.style.display = 'none';
            
            // --- DÉCLENCHEMENT DE L'ALERTE OFFICIELLE ---
            // On vérifie si la fonction existe avant de l'appeler pour éviter les bugs
            if (typeof triggerOfficialAlert === "function") {
                triggerOfficialAlert();
            }
            
        }, 1500);
    }
}

function teleportToBooking() {
    shutdownEngine();
    navigate('reservations');
    window.scrollTo(0,0);
}

// Lancement automatique au chargement
window.addEventListener('load', () => {
    setTimeout(() => { new NeuralEventEngine(); }, 3000);
});

let currentFilterCity = 'ALL';
let currentFilterDay = 'ALL';

function renderEventPage() {
    // 1. Filtrage intelligent
    const filteredEvents = donneesEvenements.filter(ev => {
        const cityMatch = currentFilterCity === 'ALL' || ev.ville === currentFilterCity;
        const dayMatch = currentFilterDay === 'ALL' || ev.jour === currentFilterDay;
        return cityMatch && dayMatch;
    });

    // Listes pour les boutons de filtres
    const cities = ['ALL', ...new Set(donneesEvenements.map(e => e.ville))];
    const days = ['ALL', ...new Set(donneesEvenements.map(e => e.jour))];

    let html = `
        <div class="event-page-wrapper">
            <h1 class="title-page">UPCOMING SHOWS & NIGHTLIFE EVENTS</h1>
            <p class="subtitle-page">Les rendez-vous incontournables de la scène mondiale.</p>

            <div style="max-width:900px; margin: 40px auto; color:#ccc; font-size:0.85rem; line-height:1.7; border-left: 1px solid var(--gold); padding-left:25px;">
                <h3 style="font-family:'Cinzel'; color:var(--gold); margin-bottom:10px; font-size:1rem;">RÉSIDENCES DE DJS INTERNATIONAUX</h3>
                <p>Chaque week-end, le Bradford accueille une résidence de DJs de renommée mondiale, sélectionnés pour leur capacité à créer une énergie sophistiquée et exclusive. Les billets d\'entrée générale et les réservations de tables sont fortement recommandés, car ces événements se remplissent rapidement. Consultez notre calendrier pour les prochains "Gold Label Residencies" avec les artistes les plus prestigieux.</p>
            </div>

            <div class="gold-pricing-grid">
                <div class="price-item-premium">
                    <span style="font-size:0.55rem; color:#666; display:block; letter-spacing:2px; margin-bottom:5px;">ENTRÉE STANDARD</span>
                    <span style="font-family:'Cinzel'; color:var(--gold); font-size:1.3rem; letter-spacing:1px;">$75 — $90</span>
                </div>
                <div class="price-item-premium">
                    <span style="font-size:0.55rem; color:#666; display:block; letter-spacing:2px; margin-bottom:5px;">VIP PRESTIGE</span>
                    <span style="font-family:'Cinzel'; color:var(--gold); font-size:1.3rem; letter-spacing:1px;">$125 — $200</span>
                </div>
            </div>

            <div class="smart-filter-bar">
                <div class="filter-group">
                    <span style="font-size:0.5rem; color:var(--gold); letter-spacing:2px; width:100%; text-align:center;">DESTINATIONS</span>
                    ${cities.map(c => `<button class="btn-filter ${currentFilterCity === c ? 'active' : ''}" onclick="currentFilterCity='${c}'; renderEventPage();">${c}</button>`).join('')}
                </div>
                <div class="filter-group">
                    <span style="font-size:0.5rem; color:var(--gold); letter-spacing:2px; width:100%; text-align:center;">CALENDRIER</span>
                    ${days.map(d => `<button class="btn-filter ${currentFilterDay === d ? 'active' : ''}" onclick="currentFilterDay='${d}'; renderEventPage();">${d}</button>`).join('')}
                </div>
            </div>

            <div class="artist-timeline-display" style="max-width:1000px; margin: 0 auto;">
                ${filteredEvents.length > 0 ? filteredEvents.map(ev => `
                    <div class="artist-card-exclusive">
                        <div class="city-badge-vertical">${ev.ville}</div>
                        <div class="artist-content">
                            <span style="color:var(--gold); font-size:0.65rem; font-weight:bold; letter-spacing:2px;">${ev.jour} ${ev.date.split('-')[2]} / ${ev.date.split('-')[1]}</span>
                            <h2 class="artist-artist-name">${ev.artiste}</h2>
                            <p style="color:#555; font-size:0.75rem; margin-top:5px;">${ev.details}</p>
                        </div>
                        <div>
                            <button class="cta-button" onclick="window.scrollTo(0,0); navigate('reservations')" 
                                    style="width:100%; padding:12px; font-size:0.65rem;">
                                BOOK TABLE
                            </button>
                        </div>
                    </div>
                `).join('') : `
                    <div style="text-align:center; padding:80px; color:#333; letter-spacing:3px; font-size:0.7rem;">AUCUNE PERFORMANCE TROUVÉE.</div>
                `}
            </div>
            
            <div style="text-align:center; margin-top:100px; opacity:0.1; font-size:0.5rem; letter-spacing:5px;">
                THE BRADFORD STORY • EXCELLENCE PROTOCOL
            </div>
        </div>
    `;

    APP_CONTENT.innerHTML = html;
}



function renderContactPage() {
    APP_CONTENT.innerHTML = '';

    const getLiveStats = () => {
        const m = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
        const h = m.getHours();
        
        // GÉNÉRATEUR DE LATENCE "NASA" (Entre 18.00 et 26.00 ms)
        const dynamicLat = (Math.random() * (26 - 18) + 18).toFixed(2) + 'ms';

        return {
            time: m.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit', second: '2-digit'}),
            status: h >= 10 && h < 24 ? 'ONLINE' : 'OFFLINE',
            lat: dynamicLat
        };
    };

    const s = getLiveStats();

    const html = `
    <div class="brdf-contact-portal fadeIn">

    <h1 class="title-page">CONTACT & CONCIERGE SUPPORT</h1>
        
        <div class="live-data-hub">
            <div class="data-node">NODE: <b>MIAMI_HQ</b></div>
            <div class="data-node">TIME: <b id="live-time">${s.time}</b></div>
            <div class="data-node">STATUS: <b style="color:${s.status === 'ONLINE' ? '#00ff88' : '#ff4d4d'}">${s.status}</b></div>
            <div class="data-node">LATENCY: <b id="live-lat">${s.lat}</b></div>
        </div>



            <section class="main-info-grid">
            <div class="info-node">
                <span class="label-discret">Main Line</span>
                <span class="info-value">+1 305 VIP BRAD</span>
            </div>
            
            <div class="info-node">
                <span class="label-discret">General Inquiries</span>
                <span class="info-value">Bradford Headquarters</span>
            </div>

            <div class="info-node">
                <span class="label-discret">Business Hours</span>
                <span class="info-value">THU — SUN<br>00:00 — 06:00</span>
            </div>

            <div class="info-node">
                            <div class="info-node">
                <span class="label-discret">Navigation</span>
                <a href="https://www.google.com/maps/dir/?api=1&destination=1234+Collins+Ave+Miami+Beach+FL+33139" 
                   target="_blank" 
                   class="btn-location-luxury">
                   VIEW LOCATION
                </a>
            </div>

            </div>

            <div class="info-node full-width">
                <span class="label-discret">Official Address</span>
                <span class="info-value">THE BRADFORD MIAMI — 1234 COLLINS AVE, MIAMI BEACH, FL 33139</span>
            </div>
        </section>


        <div class="contact-filter-bar" style="margin-top:80px;">
            <button class="filter-btn active" onclick="filterContact('all', this)">ALL UNITS</button>
            <button class="filter-btn" onclick="filterContact('vip', this)">VIP & TABLES</button>
            <button class="filter-btn" onclick="filterContact('events', this)">PRIVATE EVENTS</button>
            <button class="filter-btn" onclick="filterContact('media', this)">MEDIA OFFICE</button>
            <button class="filter-btn" onclick="filterContact('hr', this)">HUMAN RESOURCES</button>
        </div>

        <main class="contact-grid" id="contact-list">
            <article class="contact-card-v8" data-cat="vip">
                <h2 class="dept-name">VIP Concierge & Reservations</h2>
                <p class="dept-desc">Accès prioritaire aux tables de la Main Room et gestion des demandes bouteilles ultra-premium. Service disponible 7j/7.</p>
             <a href="mailto:reservations@bradfordnightclub.com?subject=VIP%20RESERVATION%20REQUEST" 
                   onclick="window.location.href='mailto:reservations@bradfordnightclub.com?subject=VIP%20RESERVATION%20REQUEST'; return false;"
                   class="contact-action-btn">
                    <span class="action-label">Digital Protocol</span>
                    <span class="action-value">reservations@bradfordnightclub.com</span>
                </a>
            </article>

            <article class="contact-card-v8" data-cat="events">
                <h2 class="dept-name">Private Events & Buy-outs</h2>
                <p class="dept-desc">Privatisation totale du club, événements corporate de luxe et tournages professionnels à Miami, Los Angeles, New York ou San Franscisco.</p>
               <a href="mailto:events@bradfordnightclub.com" 
                   onclick="window.location.href='mailto:events@bradfordnightclub.com'; return false;"
                   class="contact-action-btn">
                    <span class="action-label">Digital Protocol</span>
                    <span class="action-value">events@bradfordnightclub.com</span>
                </a>
            </article>

            <article class="contact-card-v8" data-cat="media">
                <h2 class="dept-name">Press & Media Relations</h2>
                <p class="dept-desc">Accréditations pour les résidences internationales et demandes d'interviews avec nos artistes résidents.</p>
                      <a href="mailto:media@bradfordnightclub.com" 
                   onclick="window.location.href='mailto:media@bradfordnightclub.com'; return false;"
                   class="contact-action-btn">
                    <span class="action-label">Digital Protocol</span>
                    <span class="action-value">media@bradfordnightclub.com</span>
                </a>
            </article>

            <article class="contact-card-v8" data-cat="hr">
                <h2 class="dept-name">Human Resources & Careers</h2>
                <p class="dept-desc">Rejoignez l'élite du nightlife. Nous recherchons constamment des talents pour nos établissements.</p>
            <a href="mailto:careers@bradfordnightclub.com" 
                   onclick="window.location.href='mailto:careers@bradfordnightclub.com'; return false;"
                   class="contact-action-btn">
                    <span class="action-label">Digital Protocol</span>
                    <span class="action-value">careers@bradfordnightclub.com</span>
                </a>
            </article>
        </main>

        <section class="secure-form-container">
            <h2 style="font-family:'Cinzel'; text-align:center; letter-spacing:5px; margin-bottom:40px; font-size: 1.2rem; color: #fff;">SECURE INQUIRY</h2>
            <div style="max-width:500px; margin:0 auto; display:flex; flex-direction:column; gap:25px;">
                <div class="form-input-box">
                    <label style="font-family:'Cinzel'; font-size:0.6rem; color:#D4AF37; letter-spacing:2px;">IDENTIFICATION</label>
                    <input type="text" placeholder="FULL NAME" style="background:none; border:none; color:#fff; width:100%; padding-top:10px; outline:none; font-family:'Inter';">
                </div>
                <div class="form-input-box">
                    <label style="font-family:'Cinzel'; font-size:0.6rem; color:#D4AF37; letter-spacing:2px;">CONTACT PROTOCOL</label>
                    <input type="email" placeholder="EMAIL ADDRESS" style="background:none; border:none; color:#fff; width:100%; padding-top:10px; outline:none; font-family:'Inter';">
                </div>
                <div class="form-input-box">
                    <label style="font-family:'Cinzel'; font-size:0.6rem; color:#D4AF37; letter-spacing:2px;">MESSAGE</label>
                    <textarea placeholder="DESCRIBE YOUR REQUEST..." style="background:none; border:none; color:#fff; width:100%; height:80px; padding-top:10px; outline:none; resize:none; font-family:'Inter';"></textarea>
                </div>
                    <button 
    onclick="renderSecureInquiry()" 
    style="background:transparent; border:1px solid #D4AF37; color:#D4AF37; padding:20px; font-family:'Cinzel'; letter-spacing:5px; font-size: 0.7rem; cursor: pointer; transition: 0.3s;"
    onmouseover="this.style.background='rgba(212,175,55,0.1)'" 
    onmouseout="this.style.background='transparent'">
    TRANSMIT DATA
</button>
            </div>
        </section>

   
    </div>
    `;

    APP_CONTENT.innerHTML = html;
    window.scrollTo(0,0);

    const contactInt = setInterval(() => {
    const clock = document.getElementById('live-time');
    const latDisplay = document.getElementById('live-lat'); // On cible la latence
    
    if(!clock) { clearInterval(contactInt); return; }

    const stats = getLiveStats(); // On génère de nouvelles stats (nouveau temps + nouvelle latence)
    
    clock.innerText = stats.time;    // On met à jour l'heure
    latDisplay.innerText = stats.lat; // ON MET À JOUR LA LATENCE ICI
    
}, 1000);

}

function filterContact(cat, btn) {
    const cards = document.querySelectorAll('.contact-card-v8');
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    cards.forEach(card => {
        if(cat === 'all' || card.getAttribute('data-cat') === cat) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


function renderDressCodePage() {
    APP_CONTENT.innerHTML = `
    <div class="dress-code-wrapper fadeIn">
        
        <h1 class="title-page">THE RULES OF ELEGANCE</h1>
        <p class="subtitle-page">L'ÉLÉGANCE EST NOTRE UNIQUE PASSE D'ENTRÉE.</p>

        <div class="style-category" onclick="toggleStyle(this)">
            <div class="category-header" style="display:flex; justify-content:space-between; align-items:center;">
                <span class="category-title">01. L'ESPRIT BRADFORD</span>
                <span style="color:#D4AF37;">+</span>
            </div>
            <div class="category-content">
                <p style="text-align:justify; margin-bottom:15px;">
                    Le Bradford transcende la notion classique de boîte de nuit pour s'imposer comme un sanctuaire de l'esthétique contemporaine. Ici, l'habit n'est pas un accessoire, c'est un langage. Notre vision rejette catégoriquement l'uniformité rigide du costume traditionnel au profit d'une "curation" personnelle de haut vol. Nous célébrons l'audace architecturale, la pureté des lignes et la noblesse des matériaux. 
                </p>
                <p style="text-align:justify;">
                    Franchir nos portes exige une conscience aiguë de son image : chaque texture, chaque coupe et chaque détail doit témoigner d'une intention. Que vous optiez pour le minimalisme radical d'un créateur d'avant-garde ou pour la sophistication d'un tailoring italien déconstruit, votre silhouette doit incarner une vision du luxe qui ne hurle pas, mais qui s'impose par son évidence. Au Bradford, l'excellence est la norme, et l'impeccabilité, votre seule accréditation.
                </p>
            </div>
        </div>

        <div class="style-category" onclick="toggleStyle(this)">
            <div class="category-header" style="display:flex; justify-content:space-between; align-items:center;">
                <span class="category-title">02. SÉLECTION MASCULINE (EXEMPLES)</span>
                <span style="color:#D4AF37;">+</span>
            </div>
            <div class="category-content">
                          <div class="visual-item">Blazers de créateurs</div>
                <div class="visual-item">Chemises à col Mao</div>
                <div class="visual-item">Pantalon large en laine</div>
                <div class="visual-item">Sneakers d'archives (Clean)</div>
                <div class="visual-item">Cuir & Daim</div>

 <p style="margin-top:15px; font-size:0.75rem; color:#666;">
            Cette sélection n'est qu'un aperçu des standards acceptés.
        </p>
            </div>
        </div>

     <div class="style-category">
    <div class="category-header" onclick="toggleStyle(this.parentElement)" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
        <span class="category-title">03. SÉLECTION FÉMININE (EXEMPLES)</span>
        <span style="color:#D4AF37;">+</span>
    </div>
    
    <div class="category-content">
        <div class="visual-item">Robes architecturales</div>
        <div class="visual-item">Silk Slip Dresses</div>
        <div class="visual-item">Ensembles Tailoring</div>
        <div class="visual-item">Talons Sculpturaux</div>
        <div class="visual-item">Minimalisme 90s</div>
        
        <p style="margin-top:15px; font-size:0.75rem; color:#666;">
            Cette sélection n'est qu'un aperçu des standards acceptés.
        </p>
    </div>
</div>

        <div class="analyzer-unit">
            <span class="analyzer-label">BRADFORD STYLE ANALYZER v5.0</span>
            
            <select id="select-top" class="brdf-select">
                <option value="none">-- CHOISIR LE HAUT --</option>
                <option value="premium">Blazer Double-Breasted (Laine froide)</option>
                <option value="premium">Veste en Cuir Grainé (Archive)</option>
                <option value="premium">Chemise en Soie (Col Italien/Mao)</option>
                <option value="premium">Pull Cachemire (Coupe Ajustée)</option>
                <option value="premium">Top Architectural (Designer)</option>
                <option value="ban">T-shirt Oversize / Logo massif</option>
                <option value="ban">Hoodie / Sweat-shirt</option>
            </select>

            <select id="select-bottom" class="brdf-select">
                <option value="none">-- CHOISIR LE BAS --</option>
                <option value="premium">Pantalon Tailoring Large (Flanelle)</option>
                <option value="premium">Denim Brut Japonais (Noir)</option>
                <option value="premium">Pantalon en Cuir / Daim</option>
                <option value="premium">Jupe Midi en Satin</option>
                <option value="ban">Short / Bermuda</option>
                <option value="ban">Jogging / Pantalon de sport</option>
            </select>

            <select id="select-shoes" class="brdf-select">
                <option value="none">-- CHOISIR LES SOULIERS --</option>
                <option value="premium">Mocassins Vernis / Derbies</option>
                <option value="premium">Baskets de Luxe (Limited/Impeccables)</option>
                <option value="premium">Talons Aiguilles / Sculptés</option>
                <option value="premium">Bottines Chelsea (Cuir Noble)</option>
                <option value="ban">Sandales / Tongs / Claquettes</option>
            </div>

            <p style="font-family:'Cinzel'; font-size:0.55rem; color:#444; margin: 20px 0 10px; letter-spacing:1px;">OU DÉCRIRE VOTRE COMPOSITION LIBREMENT :</p>
            <textarea id="text-analyzer" class="analyzer-input" placeholder="Ex: Ensemble Margiela noir, chemise col cassé, bottines en cuir poli..."></textarea>
            
            <button onclick="runUltimateAnalysis()" style="width:100%; background:#D4AF37; color:#000; border:none; padding:18px; font-family:'Cinzel'; font-weight:bold; letter-spacing:3px; cursor:pointer; margin-top:20px;">
                VALIDER LE PROTOCOLE
            </button>

            <div id="final-verdict" style="margin-top:25px; text-align:center; font-family:'Cinzel'; letter-spacing:4px; display:none;"></div>
        </div>

           <div class="ban-zone">
            <h4 style="font-family:'Cinzel'; font-size:0.7rem; color:#ff4d4d; letter-spacing:2px; margin-bottom:20px;">ZONE DE REFUS AUTOMATIQUE</h4>
            <p style="font-size:0.75rem; color:#666; line-height:2;">
                Tout vêtement de sport, hoodie, casquette, short ou sandale entraînera un refus définitif. Les logos "monogrammes" excessifs sont jugés incompatibles avec l'esthétique du club.
            </p>
        </div>

        <div style="margin-top:40px; border-left: 2px solid #D4AF37; padding-left:20px;">
            <h3 style="font-family:'Cinzel'; font-size:0.85rem; color:#fff; letter-spacing:3px; margin-bottom:15px;">DISCRÉTION & MARQUE DE LUXE</h3>
            <p style="color:#888; font-size:0.8rem; line-height:1.8; text-align:justify;">
                Nous encourageons nos invités à exprimer leur style personnel, à condition qu’il soit en harmonie avec le ton ultra-luxe du club. Les logos ostentatoires doivent être minimisés. Notre équipe se réserve le droit souverain de juger de la conformité de toute tenue. Ce jugement est final et non négociable. Nous vous remercions d'être des ambassadeurs de notre image.
            </p>
        </div>

       <button onclick="renderContactPage()" style="background:none; border:1px solid #D4AF37; color:#D4AF37; padding:15px 30px; font-family:'Cinzel'; font-size:0.6rem; letter-spacing:3px; cursor:pointer; width:100%; margin: 40px 0;">
    Doute sur votre tenue ? Contactez-nous
</button>

    </div>

<div style="font-family:'Courier New'; font-size:0.7rem; color:#D4AF37; letter-spacing:2px; text-align: center; width: 100%; margin-top: 20px;">
    MANAGEMENT DECISION IS FINAL — NO NEGOTIATION
</div>


    `;
    window.scrollTo(0,0);
}

function runUltimateAnalysis() {
    const t = document.getElementById('select-top').value;
    const b = document.getElementById('select-bottom').value;
    const s = document.getElementById('select-shoes').value;
    const text = document.getElementById('text-analyzer').value.toLowerCase();
    const result = document.getElementById('final-verdict');

    
    
      // Base de données de mots-clés colossale (Marques + Matières)
    const bad = [
  "short", "shorts", "bermuda", "jogging", "survetement", "legging", "nike", "adidas", "puma", "reebok", "under armour", "casquette", "snapback", "bonnet", "beanie", "hoodie", "sweat", "sweatshirt", "tong", "tongs", "claquette", "claquettes", "slides", "sandales sport", "crocs", "tee-shirt large", "oversize cheap", "debardeur", "tank top", "marcel", "jean troue", "jean dechire", "distressed", "baggy", "pantalon large street", "cargo large", "cargo militaire", "basket running", "chaussures sport", "air force", "air max", "yeezy", "new balance", "asics", "chaussettes apparentes", "flip flop", "polo cheap", "contrefacon", "logo XXL", "gros logo", "imprime cartoon", "print manga", "fluo", "flashy", "jaune fluo", "vert fluo", "ensemble sport", "veste de sport", "doudoune", "anorak", "kway", "capuche", "sac banane", "sac a dos", "chaines voyantes", "bijoux bling", "montre plastique", "lunettes sport", "lunettes cycliste", "claquettes chaussettes", "pyjama", "pantacourt", "tenue plage", "chemise ouverte torse nu", "marques fast fashion", "shein", "primark", "imitation cuir", "faux daim", "imprime animal excessif", "tiger print", "leopard cheap", "camouflage", "workwear sale", "vieux sneakers", "baskets usees", "tenue froissee", "sale", "neglige", "non repasse", "odeur", "casual excessif", "streetwear basique", "tenue festival", "tenue rave", "tenue after beach", "tong cuir", "espadrilles usagees", "tee shirt publicitaire", "slogan choque", "message vulgaire", "provocant", "politique", "religieux ostentatoire", "mitaines", "tenue bricolage", "tenue sport collective",
  "kappa", "fila", "le coq sportif", "diadora", "lotto", "umbro", "jordan", "air jordan", "dunk", "tn", "requins", "vapormax", "shox", "huarache", "stansmith", "superstar", "gazelle", "converse sale", "vans usee", "dc shoes", "etnies", "ecko", "fubu", "rocawear", "karl kani", "sean john", "pelle pelle", "avirex", "von dutch", "ed hardy", "supreme fake", "off-white fake", "bape", "stussy", "thrasher", "palace", "fear of god", "essentials", "antisocial social club", "gymshark", "lululemon", "decathlon", "quechua", "kalenji", "domyos", "kipsta", "artengo", "tribord", "bohoo", "fashion nova", "aliexpress", "temu", "wish", "cider", "pretty little thing", "misguided", "forever 21", "bershka", "pull and bear", "stradivarius", "kiabi", "la halle", "gemo", "tati", "lidl brand", "crocs classic", "clogs", "mules", "espadrilles plastiques", "sandales velcro", "teva", "chacos", "keen", "jelly shoes", "méduse", "ballerines", "uget", "moonboots", "bottes de pluie", "waders", "cuissardes vulgaires", "talons trop hauts", "plateformes excessives", "stripper shoes", "doc martens sales", "rangers usees", "bottes de chantier", "caterpillar", "timberland sales", "shoes with holes", "dirty laces", "semelle decollee", "sweat a capuche", "pull de sport", "fleece", "polar", "fleece jacket", "softshell", "windbreaker", "coupe vent", "blouson de ski", "combinaison de ski", "veste sans manche sport", "puffer jacket", "bomber nylon", "maillot de foot", "maillot de basket", "jersey", "nba jersey", "nfl jersey", "cycling jersey", "maillot cycliste", "cuissard", "short de cyclisme", "running tights", "collants de sport", "yoga pants", "leggings", "jeggings", "treillis militaire", "fatique pants", "tactical pants", "gilet tactique", "veste de chasse", "tenue de camouflage", "hunting gear", "fishing vest", "gilet de peche", "overalls", "salopette", "combinaison de garagiste", "apron", "tablier", "scrubs", "tenue medicale", "blouse", "lab coat", "uniforme", "costume de deguisement", "cosplay", "fancy dress", "onesie", "kigurumi", "peignoir", "bathrobe", "nightgown", "chemise de nuit", "boxer apparent", "slip", "underpants showing", "sagging", "pantalon tombe", "fesses apparentes", "low waist excessif", "micro short", "daisy dukes", "mini jupe vulgaire", "crop top homme", "brassiere", "sport bra", "string apparent", "whale tail", "poitrail poilu", "torse bombant", "muscle shirt", "stringer tank", "cut-off shirt", "tee shirt dechire", "burned look", "worn out", "washed out", "faded denim cheap", "acid wash cheap", "bleached", "taches de peinture", "taches de graisse", "taches de nourriture", "taches de sueur", "sweat stains", "yellow pits", "armpit stains", "bad breath", "halitose", "body odor", "smelly", "stinky", "strong cologne", "too much perfume", "dirty hair", "greasy hair", "dandruff", "pellicules", "uncombed", "mal coiffe", "bed head", "barbe sale", "untrimmed beard", "dirty fingernails", "ongles noirs", "yellow teeth", "dents jaunes", "tatouage cou vulgaire", "tatouage main agressif", "face tattoo", "grillz", "dents en or", "dents en argent", "piercing arcade", "piercing levre", "septum excessif", "ecarteur", "gauges", "chaines de pantalon", "wallet chain", "studded belt", "ceinture a clous", "grosse boucle", "big buckle", "rhinestone belt", "bb simon fake", "western belt cheap", "cowboy hat", "stetson", "sombrero", "turban", "durag", "do-rag", "wave cap", "skull cap", "balaclava", "cagoule", "mask", "surgical mask", "gas mask", "ski goggles", "masque de ski", "lunettes de piscine", "swimming goggles", "bouée", "armbands", "flippers", "palmes", "tuba", "snorkel", "sac de sport", "duffle bag", "gym bag", "plastic bag", "sac en plastique", "tote bag sale", "sacoche de ceinture", "fanny pack", "bum bag", "crossbody bag sport", "chest bag", "tactical bag", "rucksack", "hiking pack", "suitcase", "valise", "malette", "briefcase cheap", "parapluie mouille", "wet clothes", "vêtements trempés", "muddy shoes", "mud", "boue", "poussiere", "dusty", "lint", "peluches", "bouloches", "pilling", "animal hair", "poils de chat", "poils de chien", "pattes d'eph cheap", "flare jeans vulgaire", "low rise denim", "ultra skinny", "meggings", "marching band uniform", "police uniform", "military uniform", "fireman uniform", "stripper outfit", "bondage gear", "latex", "leather subculture", "goth extreme", "cyber goth", "steampunk", "emo look", "scene kid", "skater boy cheap", "e-boy", "e-girl", "vsco girl", "soft boy", "hypebeast fake", "reseller outfit", "stockx tag left on", "etiquette apparente", "price tag", "security tag", "antivol oublie", "vetement de nuit", "loungewear cheap", "pajamas", "slippers", "house shoes", "pantoufles", "babouches", "clog", "crocs charms", "jibbitz", "light up shoes", "chaussures qui brillent", "heelys", "chaussures a roulettes", "skate", "skateboard", "rollerblades", "scooter", "trottinette", "helmet", "casque", "headphones", "beats fake", "gaming headset", "airpods visibles", "bluetooth earpiece", "oreillette bluetooth", "walkie talkie", "body cam", "gopro", "selfie stick", "perche a selfie", "tripod", "camera", "appareil photo", "flash", "megaphone", "vuvuzela", "air horn", "noise maker", "pétards", "cigarettes", "vape", "vaporeuse", "e-cigarette", "litter", "trash", "déchets", "food", "boisson exterieure", "bouteille d'eau", "canette", "alcohol bottle", "flasque", "flask", "drugs", "paraphernalia", "weed leaf print", "bob marley print", "che guevara print", "political slogan", "maga hat", "protest sign", "flag", "drapeau", "banner", "banderole", "megaphone", "whistle", "sifflet", "ballon", "frisbee", "beach ball", "umbrella", "parasol", "deckchair", "chaise pliante", "cooler", "glaciere", "picnic basket", "panier de pique nique", "backpacking gear", "tent", "tente", "sleeping bag", "sac de couchage", "matelas", "camping gear", "fishing rod", "canne a peche", "gun", "weapon", "knife", "couteau", "knuckle duster", "poing americain", "pepper spray", "lacrymo", "taser", "handcuffs", "menottes", "chains", "leash", "laisse", "collar", "collier de chien", "choker spikes", "collier a pointes", "harness", "harnais", "corset", "bustier vulgaire", "lingerie visible", "transparent clothes", "vetement transparent", "see through", "mesh shirt", "filet", "fishnet", "résille", "top résille", "naked", "nu", "topless", "barefoot", "pieds nus", "socks only", "chaussettes seules", "dirty socks", "stinky socks", "holes in socks", "mismatched socks", "chaussettes depareillees", "safety pin", "epingle de nourrice", "tape on clothes", "scotch", "duct tape", "reparation de fortune", "stapled clothes", "agrafes", "safety vest", "gilet jaune", "reflective gear", "neon colors", "high-vis", "work boots", "steel toe", "embout acier", "cloven shoes", "tabi shoes", "vibram five fingers", "toe shoes", "pointy shoes extreme", "poulaines", "clown shoes", "platform boots", "goth boots", "buffalo shoes", "platform sneakers", "creepers", "oversized jewelry", "fake gold", "toc", "plastique doré", "medallion", "medaillon", "clock necklace", "flavor flav style", "crown", "couronne", "tiara", "tiare", "scepter", "sceptre", "cape", "cloak", "toge", "mask", "masquerade", "face paint", "glitter", "paillettes", "body paint", "fake blood", "faux sang", "bandage", "cast", "platre", "crutches", "bequilles", "wheelchair (non-medical)", "stroller", "poussette", "shopping cart", "caddie", "laundry bag", "sac a linge", "trash bag", "sac poubelle", "cardboard box", "carton", "pancarte", "megaphone", "speaker", "enceinte bluetooth", "boombox", "radio", "walkman", "discman", "ipod", "tablet", "ipad", "laptop", "ordinateur", "keyboard", "mouse", "wires", "cables", "charger", "powerbank", "batterie externe", "extension cord", "rallonge", "tools", "outils", "hammer", "marteau", "screwdriver", "tournevis", "perceuse", "saw", "scie", "axe", "hache", "shovel", "pelle", "rake", "rateau", "broom", "balai", "mop", "serpillère", "bucket", "seau", "cleaning products", "produits d'entretien", "bleach", "javel", "paint", "peinture", "ink", "encre", "oil", "huile", "grease", "graisse", "mud", "boue", "dirt", "salete", "dust", "poussiere", "sand", "sable", "grass", "leaves", "feuilles", "branches", "flowers", "fleurs", "pollen", "bugs", "insectes", "spider webs", "toiles d'araignee", "animal waste", "excrements", "vomit", "vomis", "spit", "crachat", "blood", "sang", "sweat", "sueur", "tears", "larmes", "urine", "feces", "pus", "scab", "croute", "wound", "blessure", "scar", "cicatrice (vulgaire)", "bruise", "rash", "eruption", "pimple", "bouton", "acne", "blackhead", "wart", "verrue", "fungus", "mycose", "mold", "moisissure", "rot", "pourriture", "decay", "decomposition", "smell", "odeur", "stink", "puanteur", "aroma", "scent", "fragrance (excessive)", "musk", "body odor", "halitosis", "flatulence", "burp", "cough", "toux", "sneeze", "eternuement", "sniffle", "runny nose", "nez qui coule", "mucus", "phlegm", "saliva", "drool", "bave", "sweaty palms", "mains moites", "greasy skin", "peau grasse", "oily hair", "cheveux gras", "unwashed", "mal lave", "dirty", "sale", "filthy", "crado", "degoutant", "rebutant", "gross", "nasty", "vile", "foul", "putrid", "rancid", "rank", "fetid", "noisome", "malodorous", "stinking", "smelly", "whiff", "pong", "stench", "reek", "niff", "hum", "stale", "musty", "fusty", "moldy", "mildewed", "rotten", "decayed", "putrified", "spoiled", "tainted", "corrupt", "polluted", "contaminated", "infected", "diseased", "toxic", "hazardous", "dangerous", "unsafe", "unhealthy", "unclean", "impure", "dirty", "soiled", "stained", "spotted", "smudged", "streaked", "smeared", "blurred", "blurry", "faded", "worn", "shabby", "tattered", "ragged", "torn", "ripped", "shredded", "mangled", "crushed", "crumpled", "wrinkled", "creased", "folded", "bent", "twisted", "warped", "misshapen", "distorted", "deformed", "ugly", "hideous", "unsightly", "unattractive", "unappealing", "repulsive", "revolting", "abhorrent", "loathsome", "detestable", "despicable", "contemptible", "paltry", "miserable", "wretched", "sorry", "pitiful", "pathetic", "lame", "weak", "feeble", "poor", "cheap", "shoddy", "tacky", "trashy", "garish", "gaudy", "loud", "flashy", "showy", "ostentatious", "pretentious", "vulgar", "crude", "coarse", "gross", "indecent", "improper", "unbecoming", "unseemly", "inappropriate", "unsuitable", "unfit", "unqualified", "ineligible", "disqualified", "banned", "barred", "excluded", "prohibited", "forbidden", "verboten", "taboo", "off-limits", "restricted", "censored", "blocked", "stopped", "halted", "rejected", "denied", "refused", "turned away", "blacklisted", "ostracized", "shunned", "evicted", "expelled", "ejected", "removed", "deleted", "erased", "cancelled", "voided", "invalidated", "nullified", "annulled", "revoked", "rescinded", "repealed", "abrogated", "quashed", "vacated", "overturned", "reversed", "undone", "scrapped", "abandoned", "discarded", "jettisoned", "ditched", "dumped", "trashed", "junked", "scuttled", "destroyed", "demolished", "wrecked", "ruined", "smashed", "broken", "damaged", "impaired", "spoiled", "marred", "disfigured", "defaced", "vandalized", "sabotaged", "corrupted", "debased", "degraded", "devalued", "depreciated", "cheapened", "vulgarized", "mass-produced", "generic", "brandless", "no-name", "knock-off", "rip-off", "counterfeit", "phony", "sham", "bogus", "fraudulent", "spurious", "ersatz", "imitation", "artificial", "man-made", "plastic", "faux", "mock", "dummy", "pseudo", "so-called", "alleged", "nominal", "token", "superficial", "shallow", "empty", "hollow", "vacuous", "vapid", "insipid", "bland", "dull", "boring", "tedious", "monotonous", "repetitive", "redundant", "superfluous", "excessive", "extreme", "radical", "drastic", "severe", "harsh", "rigid", "strict", "stern", "tough", "hard", "solid", "firm", "stiff", "inflexible", "unyielding", "unbending", "uncompromising",   "new-balance", "under-armour", "north-face", "patagonia", "columbia", "napapijri", "hollister", "abercrombie", "superdry", "vans", "converse", "dc-shoes", "element", "volcom", "billabong", "quiksilver", "ripcurl", "obey", "carhartt", "dickies", "bench", "wrung", "com8", "unkut", "distinct", "paname", "project-x", "sixth-june", "lonsdale", "everlast", "sergio-tacchini", "ellesse", "von-dutch", "ed-hardy", "christian-audigier", "affliction", "tapout", "venum", "ufc", "bad-boy", "no-fear", "animal-house", "g-star", "diesel-industry", "replays", "kaporal", "le-temps-des-cerises", "redskins", "chevignon", "jack-and-jones", "celio", "jules", "brice", "bonobo", "izac", "devred", "mango-man", "pull-and-bear", "stradivarius", "forever-21", "missguided", "pretty-little-thing", "asos-design", "fruit-of-the-loom", "gildan", "hanes", "b&c", "stanley-stella", "sol-s", "decathlon", "quechua", "kalenji", "domyos", "kipsta", "artengo", "tribord", "forclaz", "wedze", "simond", "btwin", "doudoune-sans-manche", "puffer-vest", "anorak", "kway", "windbreaker", "softshell", "hardshell", "poncho", "coupe-vent", "parka-sport", "veste-de-ski", "pantalon-de-ski", "combinaison-integrale", "tracksuit", "trackpants", "sweatpants", "jogging-pants", "fleece-pants", "fleece-jacket", "polaire", "moumoute", "sherpa-cheap", "velours-peche", "matiere-brillante", "nylon-sport", "polyester-brillant", "lycra", "spandex", "elastane-excessif", "compression-shirt", "baselayer", "rashguard", "maillot-de-foot", "football-shirt", "soccer-jersey", "nba-jersey", "basketball-vest", "jersey-flocke", "maillot-equipe-nationale", "survetement-club", "ensemble-de-sport", "tenue-de-gym", "crossfit-outfit", "tenue-de-combat", "short-de-boxe", "short-mma", "short-muay-thai", "cycliste", "cuissard", "legging-sport", "running-tights", "debardeur-sport", "stringer-tank", "tank-top-muscu", "dos-nageur", "marcel-blanc", "bob-publicitaire", "bucket-hat", "visiere", "snapback", "casquette-filet", "trucker-hat", "bonnet-pompon", "beanie-sport", "cagoule", "balaclava", "masque-neoprene", "bandana-gang", "durag", "wave-cap", "skull-cap", "serre-tete", "poignet-eponge", "sac-banane", "fanny-pack", "bum-bag", "chest-bag", "chest-rig", "sacoche-bandouliere", "sacoche-nike", "sacoche-lacoste", "sac-a-dos-sport", "backpack-trekking", "besace-toile", "sac-de-frappe", "sac-de-sport", "gym-bag", "duffle-bag-nylon", "valise-cabine", "sac-de-courses", "sac-plastique", "tote-bag-sale", "tongs", "flip-flops", "claquettes", "slides", "benassi", "adilette", "crocs", "sabots-plastique", "mules-caoutchouc", "espadrilles-usees", "sandales-velcro", "teva", "chacos", "keen", "chaussures-bateau-cheap", "chaussures-de-securite", "safety-shoes", "bottes-de-chantier", "rangers-militaires", "bottes-de-pluie", "waders", "cuissardes-peche", "moonboots", "apres-ski", "bottes-fourrees-cheap", "chaussons", "pantoufles", "slippers-house", "babouches", "sneakers-running", "baskets-de-salle", "chaussures-de-tennis", "chaussures-de-foot", "crampons", "heelys", "chaussures-a-roulettes", "light-up-shoes", "led-shoes", "tabi-shoes", "vibram-five-fingers", "chaussettes-blanches-hautes", "chaussettes-sport", "chaussettes-nike", "chaussettes-logo", "chaussettes-depareillees", "chaussettes-trouees", "bas-de-contention", "chevilliere", "genouillere", "attelle", "platre", "bandage-visible", "piercing-arcade", "piercing-nez-anneau", "piercing-levre", "septum-gros", "ecarteur", "dilatateur", "grillz", "dents-or", "dents-diamant", "chaine-de-pantalon", "wallet-chain", "collier-de-chien", "choker-spikes", "collier-gros-maillons", "bijoux-bling-bling", "faux-diamants", "zirconium-excessif", "montre-plastique", "g-shock", "montre-digitale-cheap", "apple-watch-bracelet-sport", "connectee-sport", "casque-audio", "headphones", "gaming-headset", "oreillette-bluetooth", "talkie-walkie", "gopro-harnais", "perche-a-selfie", "sacoche-ventrale", "gilet-tactique", "veste-multipoches", "cargo-shorts", "bermuda-poches", "pantacourt-beige", "jean-troue", "ripped-jeans", "distressed-denim", "jean-dechire", "jean-delave-acide", "acid-wash", "jean-moustaches", "jean-brode", "baggy-pants", "pantalon-extra-large", "bas-elastique", "jogger-pants", "treillis-militaire", "camouflage-forest", "digital-camou", "desert-storm-print", "orange-fluo", "jaune-vif", "vert-neon", "rose-flashy", "imprime-cartoon", "t-shirt-manga", "t-shirt-anime", "t-shirt-jeu-video", "t-shirt-geek", "t-shirt-humoristique", "message-vulgaire", "insulte-print", "logo-geant", "branding-excessif", "t-shirt-de-corps", "undershirt-visible", "calecon-depassant", "underwear-showing", "boxer-apparent", "ceinture-a-clous", "ceinture-scratch", "ceinture-tissu", "bretelles-fantaisie", "cravate-rigolote", "noeud-papillon-bois", "lunettes-de-soleil-sport", "lunettes-miroir", "lunettes-cycliste", "lunettes-plastique-couleur", "cordon-lunettes", "vape-pen", "e-cigarette", "chicha-portable", "briquet-autour-du-cou", "porte-cles-massif", "mousqueton-ceinture", "outils-poche", "leatherman", "couteau-suisse", "tache-de-gras", "tache-de-vin", "tache-de-sueur", "sweat-stains", "aureoles", "odeur-corporelle", "body-odor", "haleine-alcool", "odeur-tabac", "odeur-cannabis", "vetement-froisse", "wrinkled-clothes", "vetement-sale", "dirty-laundry", "vetement-de-nuit", "pajamas", "pyjama-chemise", "chemise-de-nuit", "nuisette", "deguisement", "costume-carnaval", "masque-visage", "peinture-faciale", "paillettes-corps", "tatouage-ephemere", "tatouage-cou", "tatouage-mains", "tatouage-visage", "barbe-negligee", "cheveux-gras", "greasy-hair", "pellicules-visibles", "ongles-sales", "mains-cambouis", "vetement-travail", "bleu-travail", "workwear-dirty", "uniforme-securite", "gilet-pare-balle", "harnais-securite", "baudrier-travail", "combinaison-peintre", "tablier-cuisine", "blouse-medicale", "scrubs-hospital", "vêtement-publicitaire", "t-shirt-evenement", "t-shirt-staff", "bottes-caoutchouc", "sabots-jardin", "meduses-plage", "combinaison-plongee", "shorty-neoprene", "lycra-surf", "gilet-sauvetage", "bouee", "accessoires-plage", "serviette-cou", "marcel-filet", "top-resille", "poitrail-apparent", "torse-nu", "chemise-ouverte-nombril", "jean-bas-taille", "low-waist-extreme", "fesses-visibles", "micro-short", "daisy-dukes", "jupe-trop-courte", "vetement-transparent-cheap", "lingerie-apparente", "string-depassant", "harnais-cuir-fetiche", "accessoires-bdsm", "museliere", "laisse-chien", "collier-force", "gants-musculation", "ceinture-lombaire", "protege-dent", "coquille-sport", "chaussures-catch", "chaussures-boxe", "chaussures-bowling", "chaussures-golf-crampons", "patins-a-roulettes", "roller-blades", "skate-board", "trottinette", "casque-velo", "sacoche-velo", "sac-isotherme", "glaciere", "bouteille-alcool-main", "canette-ouverte", "nourriture-main", "sandwich-emballage", "odeur-friture", "odeur-oignon", "haleine-ail", "dents-noires", "yeux-injectes", "pupilles-dilatees", "comportement-agressif", "parole-incoherente", "vetement-dechire-accident", "bouton-manquant", "fermeture-eclair-cassee", "braguette-ouverte", "chaussettes-dans-sandales", "claquettes-chaussettes", "look-beauf", "look-shlag", "look-pouilleux", "look-neglige", "look-sale", "look-trop-sport", "total-look-adidas", "total-look-nike", "survetement-brillant", "matiere-synthetique-cheap", "faux-cuir-pele", "simili-cuir-plastique", "skaï-use", "fausse-fourrure-sale", "plumes-partout", "paillettes-decollees", "strass-manquants", "imprime-leopard-vulgaire", "imprime-serpent-flashy", "couleurs-qui-jurent", "faute-de-gout", "fringue-de-marche", "contrefacon-grossiere", "fake-luxury", "copie-chinoise", "logo-mal-fait", "couture-qui-depasse", "fil-qui-pend", "vetement-mal-taille", "trop-grand", "oversize-sale", "trop-petit-moulant", "effet-saucisson", "ventre-dehors", "poignées-amour-visibles", "look-plage", "look-camping", "look-randonnee", "look-chasse", "look-peche", "look-garage", "look-muscu", "look-mma", "look-hooligan", "look-skinhead", "look-punk-sale", "look-gothique-extreme", "look-rave", "look-teufeur", "look-hippie-sale", "dreadlocks-sales", "odeur-transpiration", "odeur-urine", "odeur-vomit", "vetement-souille", "vetement-tache-sang", "vetement-tache-boue", "vetement-tache-herbe", "vetement-tache-peinture", "vetement-tache-graisse", "vetement-tache-huile", "mains-noires", "visage-pas-lave", "traces-de-sommeil", "barbe-avec-miettes", "poils-de-nez-longs", "poils-oreilles-visibles"
];

    const good = [
  "prada","robe", "saint laurent", "ysl", "celine", "margiela", "loewe", "balenciaga", "givenchy", "tom ford", "brioni", "kiton", "zegna", "gucci", "hermes", "dior", "valentino", "bottega", "bottega veneta", "loro piana", "jacquemus", "archive", "tailoring", "sur mesure", "ajuste", "structure", "coupe droite", "coupe nette", "coupe elegante", "chemise repassee", "chemise blanche", "chemise noire", "chemise soie", "chemise coton", "pantalon habille", "pantalon laine", "pantalon soie", "slim chic", "veste blazer", "veste tailleur", "costume", "costume deux pieces", "costume trois pieces", "cuir", "cuir lisse", "cuir patine", "daim", "cachemire", "laine vierge", "soie", "velours", "tissu noble", "matiere premium", "boutons nacre", "details couture", "finition luxe", "minimalisme", "sobre", "monochrome", "noir", "blanc", "gris", "beige", "ivoire", "marine", "chaussures cuir", "richelieu", "derbies", "loafers", "mocassins", "chelsea boots", "bottines cuir", "semelle fine", "chaussures patinees", "ceinture cuir", "ceinture fine", "montre acier", "montre or", "montre classique", "lunettes acetate", "lunettes luxe", "silhouette elegante", "tenue soignee", "look coherent", "style europeen", "style milanais", "style parisien", "raffine", "haut de gamme", "discret", "classe", "prestige", "club ready", "evening wear", "after dark", "night elegance", "tenue de nuit", "tenue exclusive", "tenue premium", "clean", "sharp", "tailored", "luxury", "fashion forward", "editorial", "runway inspired", "private club style", "dress code respected",
  "lanvin", "fendi", "versace", "armani", "giorgio armani", "canali", "brunello cucinelli", "berluti", "charvet", "anderson & sheppard", "huntsman", "savile row", "etro", "missoni", "jil sander", "the row", "rick owens", "haider ackermann", "ann demeulemeester", "dries van noten", "comme des garcons", "yohji yamamoto", "issey miyake", "maison kitsune", "ami paris", "alexandre mattiussi", "lemaire", "officine generale", "casablanca", "rhude", "fear of god mainline", "visvim", "amiri", "lanvin", "balmain", "alexander mcqueen", "burberry", "dunhill", "hackett", "ralph lauren purple label", "rrl", "tod's", "hogan", "santoni", "john lobb", "edward green", "crockett & jones", "church's", "jm weston", "aubercy", "corthay", "stefano ricci", "vacheron constantin", "patek philippe", "audemars piguet", "rolex", "cartier", "omega", "jaeger-lecoultre", "iwc", "breitling", "panerai", "piaget", "chopard", "hublot", "bulgari", "tudor", "tag heuer link", "grand seiko", "montblanc", "longines", "bespoke", "handmade", "fait main", "cousu main", "cousu goodyear", "blake stitch", "full grain leather", "cuir pleine fleur", "nappa", "lambskin", "calfskin", "peau d'agneau", "veau velours", "suede", "nubuck", "exotic leather", "alligator", "crocodile chic", "vicuna", "merinos", "alpaga", "mohair", "flanelle", "twill", "popeline", "oxford chic", "lin lourd", "gabardine", "seersucker", "pied-de-poule", "prince de galles", "chevron", "herringbone", "pinstripe", "rayures tennis", "carreaux fenetre", "windowpane check", "double breasted", "croise", "col tailleur", "col pointe", "col officier", "col italien", "italian collar", "spread collar", "cutaway collar", "french cuff", "poignet mousquetaire", "boutons de manchette", "cufflinks", "pochette de costume", "pocket square", "cravate soie", "silk tie", "noeud papillon", "bow tie", "tuxedo", "smoking", "dinner jacket", "cummerbund", "opera pumps", "tassel loafers", "bit loafers", "horsebit", "double boucle", "double monkstrap", "monk shoes", "jodhpur boots", "desert boots chic", "derby simple", "oxford plain toe", "cap toe", "wholecut", "medallion toe", "brogues fines", "slim fit", "modern fit", "regular fit elegant", "high waisted trousers", "pantalon taille haute", "double pleats", "pinces", "revers de pantalon", "trouser cuff", "bretelles", "suspenders", "ceinture reversible luxe", "boucle discrete", "silent luxury", "quiet luxury", "old money", "stealth wealth", "minimalist chic", "monochrome look", "total black", "all white chic", "earth tones", "tons terre", "camel", "anthracite", "charcoal", "navy blue", "burgundy", "bordeaux", "emerald green", "vert sapin", "champagne", "silver", "gold", "platinum", "rose gold", "brushed metal", "polished leather", "high shine", "mirror shine", "glacage chaussures", "perfect grooming", "bien coiffe", "barbe tracee", "parfum de niche", "signature scent", "fragrance rare", "byredo", "le labo", "diptyque", "creed", "frederic malle", "serge lutens", "maison francis kurkdjian", "penhaligon's", "tom ford private blend", "louis vuitton haute parfumerie", "exclusif", "limite", "rare", "impeccable", "irreprochable", "prestance", "charisme", "allure", "port de tete", "distingue", "noble", "luxueux", "opulent", "grandiose", "majestueux", "raffine", "subtil", "delicat", "soyeux", "moelleux", "vaporeux", "aerien", "fluide", "galbe", "sculpte", "structure", "architectural", "avant-garde", "intemporel", "iconique", "legendaire", "mythique", "patrimoine", "heritage", "savoir-faire", "excellence", "perfection", "dandysme", "gentleman", "modern man", "urban elite", "jet set", "vip", "backstage", "front row", "red carpet", "gala", "vernissage", "soiree privee", "cocktail attire", "black tie", "white tie", "formal wear", "semi-formal", "smart casual luxe", "business professional", "executive", "ceo style", "power dressing", "suave", "debonair", "dashing", "gallant", "polished", "unblemished", "pristine", "spotless", "crisp shirt", "starched collar", "well-pressed", "steam ironed", "dry cleaned", "professional tailor", "alterations", "perfect fit", "made to measure", "personalized", "monogram", "initiales discretes", "signet ring", "chevaliere", "tie bar", "pin's luxe", "lapel pin", "boutonniere", "scarf silk", "echarpe cachemire", "gants cuir", "leather gloves", "trench coat luxe", "overcoat", "par-dessus laine", "manteau long", "chesterfield coat", "loden", "peacoat elegant", "caban laine", "harrington jacket suede", "bomber cuir luxe", "shearling premium", "peaux retournee luxe", "cardigan cachemire", "turtleneck", "col roule", "mock neck", "v-neck premium", "crew neck heavy", "knitwear luxe", "fine knit", "gauge 18", "sea island cotton", "giza cotton", "egyptian cotton", "supima", "waxed leather", "cordovan", "shell cordovan", "box calf", "museum calf", "reverse suede", "epsom leather", "togo leather", "clemence leather", "box leather", "saffiano", "epi leather", "intrecciato", "cannage", "monogram subtle", "low key branding", "no logo", "if you know you know", "iykyk", "discerning", "refined taste", "connoisseur", "curated wardrobe", "capsule collection", "investment piece", "high end", "top shelf", "premier", "supreme quality", "unmatched", "peerless", "exquisite", "splendid", "magnificent", "stunning", "striking", "impressive", "stately", "regal", "princely", "lordly", "aristocratic", "patrician", "blue blood", "old soul", "vintage luxe", "retro chic", "mid-century modern", "art deco influence", "minimalist master", "dark academia", "light academia", "preppy chic", "ivy league style", "oxbridge look", "sartorialist", "pitti uomo", "street style luxe", "high fashion", "couture", "atelier", "maison", "flagship style", "boutique", "limited edition", "numbered piece", "one of a kind", "bespoke experience", "concierge", "white glove", "exclusive access", "member only", "invitation only", "priority", "gold standard", "platinum status", "elite circles", "high society", "upper crust", "well-bred", "mannered", "civilized", "cultured", "educated", "sophisticate", "world traveler", "cosmopolitan", "jet-setter", "globetrotter", "elegant traveler", "weekender leather", "duffle bag leather luxe", "briefcase leather premium", "portfolio", "document holder", "card holder luxury", "wallet exotic", "money clip", "luxury accessories", "finishing touches", "last detail", "perfectionist", "flawless", "immaculate", "spotless", "radiant", "luminous", "glowing", "polished", "burnished", "varnished", "lacquered", "enameled", "gilded", "silver-plated", "gold-plated", "solid gold", "diamond pave", "sapphire", "emerald", "ruby", "precious stones", "gems", "jewelry masterpiece", "horological marvel", "complication", "tourbillon", "perpetual calendar", "moon phase", "chronograph chic", "automatic movement", "mechanical watch", "skeleton watch", "leather strap", "alligator strap", "steel bracelet", "integrated bracelet", "deployant clasp", "butterfly buckle", "luxury craft", "artisan", "masterpiece", "work of art", "gallery", "museum quality", "heirloom", "timeless investment", "legacy", "tradition", "innovation", "modernity", "visionary", "influential", "trendsetter", "style icon", "muse", "divine", "heavenly", "sublime", "transcendent", "ethereal", "dreamy", "magical", "enchanting", "captivating", "alluring", "seductive", "charming", "charismatic", "magnetic", "irresistible", "breath-taking", "wonderful", "splendid", "gorgeous", "beautiful", "handsome", "attractive", "stunning", "radiant", "elegant", "graceful", "poised", "composed", "confident", "bold", "daring", "sophisticated", "intellectual", "refined", "polished", "civilized", "urbane", "suave", "smooth", "slick", "sharp", "crisp", "clean", "minimal", "essential", "pure", "authentic", "genuine", "real", "original", "unique", "distinctive", "personal", "individual", "custom", "tailor-made", "bespoke", "handcrafted", "artisanal", "boutique", "niche", "specialized", "expert", "masterful", "skilled", "trained", "educated", "knowledgeable", "informed", "aware", "conscious", "ethical luxe", "sustainable luxury", "slow fashion", "conscious luxury", "responsible style", "future of luxury", "new elegance", "post-modern chic", "hyper-luxury", "ultra-luxe", "beyond premium", "pinnacle", "summit", "peak", "apex", "zenith", "acme", "climax", "crescendo", "mastery", "perfection",  "lanvin", "fendi", "versace", "armani", "giorgio-armani", "canali", "brunello-cucinelli", "berluti", "charvet", "anderson-sheppard", "huntsman", "savile-row", "etro", "missoni", "jil-sander", "the-row", "rick-owens", "haider-ackermann", "ann-demeulemeester", "dries-van-noten", "comme-des-garcons", "yohji-yamamoto", "issey-miyake", "maison-kitsune", "ami-paris", "alexandre-mattiussi", "lemaire", "officine-generale", "casablanca", "rhude", "fear-of-god-mainline", "visvim", "amiri-luxury", "balmain", "alexander-mcqueen", "burberry", "dunhill", "hackett", "ralph-lauren-purple-label", "rrl", "tod-s", "hogan", "santoni", "john-lobb", "edward-green", "crockett-jones", "church-s", "jm-weston", "aubercy", "corthay", "stefano-ricci", "vacheron-constantin", "patek-philippe", "audemars-piguet", "rolex", "cartier", "omega", "jaeger-lecoultre", "iwc", "breitling", "panerai", "piaget", "chopard", "hublot", "bulgari", "tudor", "grand-seiko", "montblanc", "longines", "bespoke", "handmade", "fait-main", "cousu-main", "cousu-goodyear", "blake-stitch", "full-grain-leather", "cuir-pleine-fleur", "nappa", "lambskin", "calfskin", "peau-d-agneau", "veau-velours", "suede", "nubuck", "exotic-leather", "alligator", "crocodile-chic", "vicuna", "merinos", "alpaga", "mohair", "flanelle", "twill", "popeline", "oxford-chic", "lin-lourd", "gabardine", "seersucker", "pied-de-poule", "prince-de-galles", "chevron", "herringbone", "pinstripe", "rayures-tennis", "carreaux-fenetre", "windowpane-check", "double-breasted", "croise", "col-tailleur", "col-pointe", "col-officier", "col-italien", "italian-collar", "spread-collar", "cutaway-collar", "french-cuff", "poignet-mousquetaire", "boutons-de-manchette", "cufflinks", "pochette-de-costume", "pocket-square", "cravate-soie", "silk-tie", "noeud-papillon", "bow-tie", "tuxedo", "smoking", "dinner-jacket", "cummerbund", "opera-pumps", "tassel-loafers", "bit-loafers", "horsebit", "double-boucle", "double-monkstrap", "monk-shoes", "jodhpur-boots", "desert-boots-chic", "derby-simple", "oxford-plain-toe", "cap-toe", "wholecut", "medallion-toe", "brogues-fines", "slim-fit", "modern-fit", "regular-fit-elegant", "high-waisted-trousers", "pantalon-taille-haute", "double-pleats", "pinces", "revers-de-pantalon", "trouser-cuff", "bretelles", "suspenders", "ceinture-reversible-luxe", "boucle-discrete", "silent-luxury", "quiet-luxury", "old-money", "stealth-wealth", "minimalist-chic", "monochrome-look", "total-black", "all-white-chic", "earth-tones", "tons-terre", "camel", "anthracite", "charcoal", "navy-blue", "burgundy", "bordeaux", "emerald-green", "vert-sapin", "champagne", "silver", "gold", "platinum", "rose-gold", "brushed-metal", "polished-leather", "high-shine", "mirror-shine", "glacage-chaussures", "perfect-grooming", "bien-coiffe", "barbe-tracee", "parfum-de-niche", "signature-scent", "fragrance-rare", "byredo", "le-labo", "diptyque", "creed", "frederic-malle", "serge-lutens", "maison-francis-kurkdjian", "penhaligon-s", "tom-ford-private-blend", "louis-vuitton-haute-parfumerie", "exclusif", "limite", "rare", "impeccable", "irreprochable", "prestance", "charisme", "allure", "port-de-tete", "distingue", "noble", "luxueux", "opulent", "grandiose", "majestueux", "raffine", "subtil", "delicat", "soyeux", "moelleux", "vaporeux", "aerien", "fluide", "galbe", "sculpte", "structure", "architectural", "avant-garde", "intemporel", "iconique", "legendaire", "mythique", "patrimoine", "heritage", "savoir-faire", "excellence", "perfection", "dandysme", "gentleman", "modern-man", "urban-elite", "jet-set", "vip", "backstage", "front-row", "red-carpet", "gala", "vernissage", "soiree-privee", "cocktail-attire", "black-tie", "white-tie", "formal-wear", "semi-formal", "smart-casual-luxe", "business-professional", "executive", "ceo-style", "power-dressing", "suave", "debonair", "dashing", "gallant", "polished", "unblemished", "pristine", "spotless", "crisp-shirt", "starched-collar", "well-pressed", "steam-ironed", "dry-cleaned", "professional-tailor", "alterations", "perfect-fit", "made-to-measure", "personalized", "monogram", "initiales-discretes", "signet-ring", "chevaliere", "tie-bar", "lapel-pin", "boutonniere", "scarf-silk", "echarpe-cachemire", "gants-cuir", "leather-gloves", "trench-coat-luxe", "overcoat", "par-dessus-laine", "manteau-long", "chesterfield-coat", "loden", "peacoat-elegant", "caban-laine", "harrington-jacket-suede", "bomber-cuir-luxe", "shearling-premium", "peaux-retournee-luxe", "cardigan-cachemire", "turtleneck", "col-roule", "mock-neck", "v-neck-premium", "crew-neck-heavy", "knitwear-luxe", "fine-knit", "gauge-18", "sea-island-cotton", "giza-cotton", "egyptian-cotton", "supima", "waxed-leather", "cordovan", "shell-cordovan", "box-calf", "museum-calf", "reverse-suede", "epsom-leather", "togo-leather", "clemence-leather", "box-leather", "saffiano", "epi-leather", "intrecciato", "cannage", "monogram-subtle", "low-key-branding", "no-logo", "if-you-know-you-know", "iykyk", "discerning", "refined-taste", "connoisseur", "curated-wardrobe", "capsule-collection", "investment-piece", "high-end", "top-shelf", "premier", "supreme-quality", "unmatched", "peerless", "exquisite", "splendid", "magnificent", "stunning", "striking", "impressive", "stately", "regal", "princely", "lordly", "aristocratic", "patrician", "blue-blood", "old-soul", "vintage-luxe", "retro-chic", "mid-century-modern", "art-deco-influence", "minimalist-master", "dark-academia", "light-academia", "preppy-chic", "ivy-league-style", "oxbridge-look", "sartorialist", "pitti-uomo", "street-style-luxe", "high-fashion", "couture", "atelier", "maison", "flagship-style", "boutique", "limited-edition", "numbered-piece", "one-of-a-kind", "bespoke-experience", "concierge", "white-glove", "exclusive-access", "member-only", "invitation-only", "priority", "gold-standard", "platinum-status", "elite-circles", "high-society", "upper-crust", "well-bred", "mannered", "civilized", "cultured", "educated", "sophisticate", "world-traveler", "cosmopolitan", "jet-setter", "globetrotter", "elegant-traveler", "weekender-leather", "duffle-bag-leather-luxe", "briefcase-leather-premium", "portfolio", "document-holder", "card-holder-luxury", "wallet-exotic", "money-clip", "luxury-accessories", "finishing-touches", "last-detail", "perfectionist", "flawless", "immaculate", "spotless", "radiant", "luminous", "glowing", "polished", "burnished", "varnished", "lacquered", "enameled", "gilded", "silver-plated", "gold-plated", "solid-gold", "diamond-pave", "sapphire", "emerald", "ruby", "precious-stones", "gems", "jewelry-masterpiece", "horological-marvel", "complication", "tourbillon", "perpetual-calendar", "moon-phase", "chronograph-chic", "automatic-movement", "mechanical-watch", "skeleton-watch", "leather-strap", "alligator-strap", "steel-bracelet", "integrated-bracelet", "deployant-clasp", "butterfly-buckle", "luxury-craft", "artisan", "masterpiece", "work-of-art", "gallery", "museum-quality", "heirloom", "timeless-investment", "legacy", "tradition", "innovation", "modernity", "visionary", "influential", "trendsetter", "style-icon", "muse", "divine", "heavenly", "sublime", "transcendent", "ethereal", "dreamy", "magical", "enchanting", "captivating", "alluring", "seductive", "charming", "charismatic", "magnetic", "irresistible", "breath-taking", "wonderful", "splendid", "gorgeous", "beautiful", "handsome", "attractive", "stunning", "radiant", "elegant", "graceful", "poised", "composed", "confident", "bold", "daring", "sophisticated", "intellectual", "refined", "polished", "civilized", "urbane", "suave", "smooth", "slick", "sharp", "crisp", "clean", "minimal", "essential", "pure", "authentic", "genuine", "real", "original", "unique", "distinctive", "personal", "individual", "custom", "tailor-made", "handcrafted", "artisanal", "boutique", "niche", "specialized", "expert", "masterful", "skilled", "trained", "educated", "knowledgeable", "informed", "aware", "conscious", "ethical-luxe", "sustainable-luxury", "slow-fashion", "conscious-luxury", "responsible-style", "future-of-luxury", "new-elegance", "post-modern-chic", "hyper-luxury", "ultra-luxe", "beyond-premium", "pinnacle", "summit", "peak", "apex", "zenith", "acme", "climax", "crescendo", "mastery", "perfection"
];

    const critical = [
    "jogging", "survetement", "survet", "tracksuit", "sweatpants", "joggers", "fleece", "techfleece",
    "hoodie", "sweat", "capuche", "casquette", "snapback", "beanie", "bonnet", "bob", "sacoche", 
    "banane", "sac-a-dos", "backpack", "tongs", "claquettes", "slides", "crocs", "birkenstock", 
    "mules", "sandales", "running", "runnings", "crampons", "vapormax", 
    "airmax", "tn", "requins", "bermuda", "cycliste", "legging", "debardeur", "marcel", 
    "tanktop", "maillot-de-foot", "maillot-nba", "jersey", "sac-de-sport", "survet-lacoste", 
    "jogging-gris", "jean-troue", "jean-sale", "habits-sales", "camouflage", "treillis", "cargo", 
    "pyjama", "deguisement", "fluo", "flashy", "claquette-chaussette", "casquette-envers", 
    "bob-chapeau", "durag", "cagoule", "balaclava", "visiere", "sac-de-frappe", "kway", "bob-hat",
    "trainers", "chandal", "tuta", "trakksuit", "sweat-shirt", "pantacourt", "tong", "claquette",
    "fannypack", "crossbody", "bum-bag", "cap", "bonnets", "snapbacks", "fitted", "trucker",
    "espadrilles", "nu-pieds", "mule", "savate", "chausson", "pantoufle", "flipflop", "flipflops",
    "air-max", "vapo", "requin", "tn-nike", "tunique-sport", "maillot-sport", "t-shirt-sport"
];

let score = 0;

    // 1. On vérifie d'abord les menus déroulants (Sécurité de base)
    let approved = true;
    if (t === 'ban' || b === 'ban' || s === 'ban') {
        approved = false;
    }
// SECTION CRITICAL : Refus direct
    critical.forEach(w => {
        const regex = new RegExp("\\b" + w + "\\b", "g");
        if (regex.test(text)) {
            approved = false;
        }
    });
    // 2. Si les menus sont OK, on analyse le texte avec le système de score
    if (approved) {
        // Analyse du GOOD (+2 points par mot entier)
        good.forEach(w => {
            const regex = new RegExp("\\b" + w + "\\b", "g");
            const count = (text.match(regex) || []).length;
            if (count > 0) score += (count * 2);
        });

        // Analyse du BAD (-3 points par mot entier)
        bad.forEach(w => {
            const regex = new RegExp("\\b" + w + "\\b", "g");
            const count = (text.match(regex) || []).length;
            if (count > 0) score -= (count * 3);
        });

               // Verdict final : on refuse seulement si le score est en dessous de 0
        if (score < 0) {
            approved = false;
        }

    }

    // --- L'ESTHÉTIQUE DU VERDICT ---
    result.style.display = "block";
    result.innerHTML = "<span style='color:#444'>ALGORITHM SCANNING...</span>";

    setTimeout(() => {
        if (approved) {
            result.innerHTML = "<span style='color:#00ff88'>STATUS: APPROVED</span>";
        } else {
            result.innerHTML = "<span style='color:#ff4d4d'>STATUS: DECLINED</span>";
        }
    }, 1200);
}

// Cette fonction reste à part car elle gère l'affichage des listes, pas le scan
function toggleStyle(element) {
    const content = element.querySelector('.category-content');
    const symbol = element.querySelector('span:last-child');
    document.querySelectorAll('.category-content').forEach(item => {
        if (item !== content) {
            item.classList.remove('active');
            item.parentElement.querySelector('span:last-child').innerText = '+';
        }
    });
    if(content) {
        content.classList.toggle('active');
        symbol.innerText = content.classList.contains('active') ? '-' : '+';
    }
}

    

function updateSplitResult(total) {
    const guests = document.getElementById('guest-count').value || 1;
    const share = total / guests;
    document.getElementById('split-result').innerHTML = `
        <span style="font-size: 0.65rem; color: #fff; letter-spacing: 1px;">PART INDIVIDUELLE :</span>
        <span style="font-family: 'Cinzel'; color: var(--gold); font-size: 1.1rem;">$${share.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
    `;
}

           
const BRADFORD_FULL_DATA = {
    "CHAMPAGNE": [
        ["Veuve Clicquot Yellow", "0.75L", 550], ["Moët Impérial Brut", "0.75L", 575], ["Moët Ice Impérial", "0.75L", 650], ["Dom Pérignon Brut", "0.75L", 950], ["Dom Pérignon Rosé", "0.75L", 1350], ["Dom Pérignon Luminous", "0.75L", 1500], ["Cristal Roederer", "0.75L", 1600], ["Cristal Rosé", "0.75L", 2200], ["Armand de Brignac Gold", "0.75L", 1800], ["Armand de Brignac Rosé", "0.75L", 2500], ["Armand Brut Magnum", "1.5L", 3800], ["Armand Jeroboam", "3L", 9000], ["P-J Belle Époque", "0.75L", 1100], ["P-J Belle Époque Rosé", "0.75L", 1450], ["Cristal Magnum", "1.5L", 3200], ["Dom Pérignon Magnum", "1.5L", 2400], ["Dom Pérignon Jeroboam", "3L", 6500], ["Krug Grande Cuvée", "0.75L", 1350], ["Krug Rosé", "0.75L", 1550]
    ],
    "VODKA": [
        ["Grey Goose", "1L", 750], ["Belvedere", "1L", 700], ["Cîroc (All Flavors)", "1L", 750], ["Cîroc Magnum", "1.75L", 1400], ["Cîroc Jeroboam", "3L", 3000], ["Absolut Elyx", "1L", 680], ["Tito’s Handmade", "1L", 650], ["Crystal Head", "0.75L", 950], ["Beluga Gold Line", "0.75L", 1200], ["Grey Goose Magnum", "1.75L", 1350], ["Grey Goose Jeroboam", "3L", 3400], ["Stolichnaya Elit", "0.75L", 550], ["Chopin Potato", "0.75L", 475], ["Smirnoff No.21", "1L", 300]
    ],
    "WHISKEY & BOURBON": [
        ["Jack Daniel’s No.7", "1L", 650], ["Jameson Irish", "1L", 700], ["Crown Royal", "1L", 750], ["Woodford Reserve", "1L", 780], ["JW Black Label", "1L", 850], ["JW Blue Label", "0.75L", 1300], ["Macallan 12 Years", "0.75L", 1000], ["Macallan 18 Years", "0.75L", 1900], ["Macallan Rare Cask", "0.75L", 2400], ["Glenfiddich 18", "0.75L", 1400], ["Hibiki Harmony", "0.75L", 1100], ["Yamazaki 18 Years", "0.75L", 2800], ["Blanton’s Original", "0.75L", 580], ["Bulleit Bourbon", "0.75L", 420], ["Lagavulin 16 Years", "0.75L", 690]
    ],
    "COGNAC": [
        ["Hennessy VS", "0.75L", 650], ["Hennessy VSOP", "0.75L", 850], ["Hennessy XO", "0.75L", 1300], ["Hennessy Paradis", "0.75L", 3200], ["Rémy Martin XO", "0.75L", 1250], ["Louis XIII", "0.7L", 9500], ["Courvoisier XO", "0.75L", 1100], ["D’USSÉ XO", "0.75L", 950], ["Martell XO", "0.7L", 950], ["Camus Borderies XO", "0.7L", 1050]
    ],
    "TEQUILA": [
        ["Patrón Silver", "1L", 750], ["Patrón Añejo", "1L", 850], ["Don Julio 1942", "0.75L", 1250], ["Don Julio 70", "0.75L", 950], ["Clase Azul Reposado", "0.75L", 1600], ["Clase Azul Ultra", "0.75L", 6500], ["Casa Dragones Blanco", "0.75L", 1000], ["Avión Reserva 44", "0.75L", 1400], ["Cincoro Reposado", "0.75L", 1200], ["Cincoro Extra Añejo", "0.75L", 3800], ["818 Tequila Añejo", "0.75L", 550], ["Teremana Añejo", "0.75L", 480]
    ],
    "RUM": [
        ["Bacardi Superior", "1L", 600], ["Captain Morgan Spiced", "1L", 650], ["Malibu Coconut", "1L", 600], ["Diplomático Reserva Exclusiva", "0.75L", 850], ["Ron Zacapa 23", "0.75L", 1000], ["Don Papa", "0.75L", 850], ["Havana Club 7 Años", "0.7L", 450], ["Flor de Caña 18 Years", "0.75L", 560], ["Mount Gay XO", "0.7L", 480], ["Appleton Estate 21 Years", "0.75L", 650]
    ],
    "GIN": [
        ["Bombay Sapphire", "1L", 700], ["Tanqueray No.10", "1L", 750], ["Hendrick’s", "1L", 850], ["Monkey 47", "0.75L", 1000], ["The Botanist", "0.7L", 490], ["Sipsmith London Dry", "0.7L", 460], ["Nolet’s Reserve", "0.7L", 850]
    ],
    "LIQUEURS & SPECIALS": [
        ["Baileys Irish Cream", "1L", 600], ["Kahlúa", "1L", 600], ["Sambuca Molinari", "1L", 650], ["Jägermeister", "1L", 650], ["Amaretto Disaronno", "1L", 650], ["Jet 27", "1L", 600], ["Midori Melon", "1L", 650], ["Grand Marnier", "1L", 750], ["Cointreau", "1L", 700], ["B52 Mix Set (3 bottles mini)", "—", 800], ["Chartreuse Verte", "0.7L", 420], ["Frangelico", "0.7L", 390], ["Drambuie", "0.7L", 400], ["Limoncello Luxardo", "0.7L", 370], ["Sambuca Molinari Extra", "0.7L", 390], ["Southern Comfort", "0.75L", 360]
    ],
    "OFFICIAL SHOT MENU (SHOT / TRAY)": [
        ["Patrón Silver", "25", 220], ["Don Julio 1942", "40", 360], ["Clase Azul Reposado", "50", 450], ["Clase Azul Plata", "35", 310], ["Clase Azul Añejo", "60", 540], ["Casamigos Blanco", "28", 250], ["Casamigos Reposado", "32", 280], ["Casamigos Añejo", "35", 310], ["Cincoro Blanco", "30", 270], ["Cincoro Añejo", "48", 420], ["Jose Cuervo Reserva Familia", "38", 340], ["1800 Cristalino", "30", 270], ["Teremana Añejo", "25", 220], ["818 Añejo", "28", 250], ["Gran Patrón Platinum", "70", 620], ["Avión Reserva 44", "50", 450], ["El Tesoro Añejo", "36", 320], ["Herradura Ultra", "33", 300], ["Don Pilar Añejo", "38", 340], ["Milagro Select Barrel", "34", 300], ["Espolòn Blanco", "20", 180], ["Tromba Reposado", "24", 210], ["Hennessy VSOP", "32", 280], ["Hennessy XO", "45", 400], ["Rémy Martin XO", "40", 360], ["Rémy Martin Louis XIII", "400", 3600], ["Martell Cordon Bleu", "38", 340], ["Courvoisier XO", "36", 320], ["D’Ussé VSOP", "28", 250], ["Beluga Noble Vodka", "22", 190], ["Grey Goose Original", "20", 180], ["Belvedere", "20", 180], ["Cîroc (all flavors)", "22", 190], ["Absolut Elyx", "25", 220], ["Ketel One", "18", 160], ["Tito’s Handmade Vodka", "16", 140], ["Crystal Head Vodka", "28", 250], ["Beluga Gold Line", "45", 400], ["Haku Japanese Vodka", "20", 180], ["The Macallan 12", "30", 270], ["The Macallan 18", "55", 490], ["The Macallan Rare Cask", "85", 760], ["JW Blue Label", "60", 540], ["JW King George V", "150", 1350], ["Glenfiddich 21", "55", 490], ["Lagavulin 16", "50", 450], ["Chivas Regal 18", "35", 310], ["Jameson Black Barrel", "25", 220], ["Bushmills 21", "50", 450], ["Jack Daniel’s No.7", "18", 160], ["JD Sinatra Select", "45", 400], ["Woodford Reserve", "28", 250], ["Bulleit Bourbon", "25", 220], ["Maker’s Mark 46", "27", 240], ["Hibiki Japanese Harmony", "50", 450], ["Yamazaki 12", "55", 490], ["Hakushu 18", "70", 630], ["Ron Zacapa 23", "30", 270], ["Diplomático Reserva", "28", 250], ["Bacardi 8", "22", 190], ["Flor de Caña 25", "40", 360], ["Don Papa 10", "35", 310], ["Havana Club Selección", "38", 340], ["Mount Gay XO", "32", 280], ["Malibu Coconut", "15", 130], ["Captain Morgan Spiced", "18", 160], ["Bombay Sapphire Gin", "20", 180], ["Tanqueray No. Ten", "25", 220], ["Hendrick’s Gin", "25", 220], ["Monkey 47 Gin", "35", 310], ["The Botanist Islay Gin", "28", 250], ["Beefeater", "18", 160], ["Baileys Irish Cream", "18", 160], ["Sambuca Molinari", "20", 180], ["Kahlúa", "18", 160], ["Frangelico", "20", 180], ["Jet 27 Mint Liqueur", "18", 160], ["Jägermeister", "20", 180], ["B52 Layered Shot", "25", 220], ["Fireball Cinnamon", "18", 160], ["Goldschläger", "22", 190], ["Limoncello Luxardo", "20", 180], ["Fernet-Branca", "22", 190], ["Amarula Cream", "18", 160]
    ],
    "LIMITED EDITION / PRESTIGE": [
        ["Armand de Brignac Platinum", "0.75L", 3500], ["Armand de Brignac Midas", "30L", 210000], ["Clase Azul Master Artisans", "1L", 18000], ["Clase Azul Master Art Ed.", "0.75L", 25000], ["Dom Pérignon Lady Gaga", "0.75L", 2800], ["Hennessy Paradis Imperial", "0.7L", 12000], ["Hennessy Beauté du Siècle", "0.7L", 265000], ["Macallan 1926 Fine & Rare", "0.7L", 1900000], ["Macallan The Reach 81y", "0.7L", 125000], ["Crystal Head Aurora", "0.75L", 2000], ["Louis XIII Black Pearl", "0.7L", 38000]
    ],
    "PREMIUM MIXERS & SOFTS": [
        ["Fiji / VOSS Still", "Bottle", 12], ["Perrier / Pellegrino", "Bottle", 12], ["Coca-Cola (All)", "Can", 10], ["Sprite (All)", "Can", 10], ["Ginger Ale Canada Dry", "Can", 10], ["Tonic Fever-Tree", "Bottle", 12], ["Club Soda Fever-Tree", "Can", 10], ["Red Bull (All)", "Can", 14], ["Monster Energy (All)", "Can", 14], ["Cranberry Ocean Spray", "Glass", 10], ["Orange Fresh Pressed", "Glass", 12], ["Pineapple Dole Premium", "Glass", 10], ["Grapefruit Fresh", "Glass", 12], ["Coconut Water Vita Coco", "Bottle", 12], ["Lime / Lemon Juice", "Fresh", 8]
    ],
    "SIGNATURE VIP COCKTAILS": [
        ["Azure Wave", "Grey Goose/Coconut", 45], ["Golden Mirage", "1942/Gold", 60], ["Palm Nights", "Hendrick's/Cucumber", 40], ["Scarlet Sunset", "Belvedere/Orange", 45], ["The Billionaire", "Louis XIII/Champagne", 950], ["Electric Sky", "Clase Azul Plata", 65], ["Royal Heat", "Hennessy XO", 70], ["Midnight Jewel", "Veuve Rosé/Vodka", 55], ["Black Sand Mojito", "Diplomático", 40], ["Miami Gold Rush", "Bulleit Gold", 75]
    ],
    "LUXURY ADD-ONS": [
        ["Ice Bucket (Crystal)", "Premium", 20], ["Dry Ice Smoke", "VIP Service", 35], ["Gold Straw Set", "Reusable", 25], ["Edible Gold Leaf", "Garnish", 30], ["Silver Rim Upgrade", "Edible", 20], ["Diamond Spark Cup", "LED", 40], ["Luxury Coaster Set", "Engraved", 50]
    ],
    "FRESH GARNISHES": [
        ["Lime / Lemon Wedges", "Bowl", 10], ["Orange Twists", "Bowl", 10], ["Pineapple Spears", "Bowl", 12], ["Fresh Berries Mix", "Bowl", 18], ["Mint Leaves", "Fresh", 10], ["Cucumber Slices", "Bowl", 10], ["Maraschino Cherries", "Premium", 12], ["Cocktail Olives", "Castelvetrano", 14]
    ],
    "BOOSTERS & LIFESTYLE": [
        ["5-Hour Energy", "Shot", 12], ["Celsius Energy", "Can", 14], ["Red Bull Editions", "Can", 14], ["Liquid IV", "Pack", 10], ["Gatorade Fierce", "Bottle", 10], ["Vitamin Water", "Bottle", 12], ["Monster Energy Gold", "Ltd Ed.", 16]
    ],
    "BOTTLE ENHANCEMENTS": [
        ["Sparkler Show", "LED + Sparkles", 60], ["Confetti Burst", "Show", 100], ["LED Ice Bucket", "Display", 80], ["Neon Tray Service", "10 shots", 120], ["Personal Host Presentation", "VIP", 250]
    ],
    "EXCLUSIVE TABLE ADD-ONS": [
        ["Hookah (Standard)", "Service", 150], ["Hookah (Luxury)", "Service", 200], ["Premium Cigars", "Unit", "100-250"], ["Private Table Butler", "Night", 300], ["Bottle Engraving", "Custom", 180], ["Luxury Candle Set", "Set", 80], ["Ice Carving Display", "Custom", 600]
    ]
};


function openOfficialMenu() {
    const overlay = document.createElement('div');
    overlay.style = `position:fixed; top:0; left:0; width:100%; height:100%; background:#000; z-index:100000; overflow-y:auto; padding:40px 15px; box-sizing:border-box; color:#fff; font-family:'Inter', sans-serif;`;

    let html = `
    <div style="max-width:500px; margin:0 auto; position:relative;">
        
        <div onclick="this.parentElement.parentElement.remove()" 
             style="position:fixed; top:20px; right:20px; cursor:pointer; z-index:100001; background:rgba(0,0,0,0.5); padding:10px; border-radius:50%; display:flex; align-items:center; justify-content:center;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </div>

            <header style="text-align:center; margin-bottom:60px; padding-top:20px;">
                <h1 style="font-family:'Cinzel'; font-size:1.8rem; letter-spacing:12px; margin:0;">BRADFORD</h1>
                <p style="font-family:'Cinzel'; color:var(--gold); font-size:0.55rem; letter-spacing:5px; margin-top:15px;">OFFICIAL ESTABLISHMENT MENU</p>
            </header>
    `;

    for (const [category, items] of Object.entries(BRADFORD_FULL_DATA)) {
        html += `<h2 style="font-family:'Cinzel'; color:var(--gold); font-size:0.8rem; letter-spacing:6px; border-bottom:1px solid #111; padding-bottom:10px; margin:40px 0 25px 0; text-align:center;">${category}</h2>`;
        items.forEach(item => {
            html += `
                <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:12px; width:100%;">
                    <div style="display:flex; flex-direction:column; max-width:70%;">
                        <span style="font-family:'Cinzel'; font-size:0.7rem; letter-spacing:1px; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item[0]}</span>
                        <span style="font-size:0.5rem; color:#444; text-transform:uppercase;">${item[1]}</span>
                    </div>
                    <div style="flex-grow:1; border-bottom:1px dotted #222; margin:0 8px; position:relative; top:-4px;"></div>
                    <span style="font-size:0.75rem; color:var(--gold); font-weight:300;">$${item[2].toLocaleString()}</span>
                </div>
            `;
        });
    }

    html += `
            <footer style="margin-top:60px; text-align:center; padding-bottom:40px;">
                <p style="color:#222; font-size:0.45rem; letter-spacing:2px; line-height:2;">
                    ALL PRICES IN USD. TAXES & 20% SERVICE CHARGE NOT INCLUDED.<br>
                    MIAMI • LOS ANGELES • NEW YORK • SAN FRANCISCO
                </p>
            </footer>
        </div>
    `;

    overlay.innerHTML = html;
    document.body.appendChild(overlay);
}

function selectMethod(el) {
    // 1. Gestion visuelle des onglets
    document.querySelectorAll('.method-card').forEach(m => m.classList.remove('active'));
    el.classList.add('active');

    const type = el.innerText.trim(); // On récupère CARD, CRYPTO ou APPLE PAY
    const displayZone = document.getElementById('payment-display-zone');

    // 2. Injection du contenu selon le choix
    if (type.includes("CARD")) {
        displayZone.innerHTML = `
            <div style="animation: fadeIn 0.3s ease;">
                <div style="margin-bottom:20px;">
                    <label style="font-size:0.6rem; color:var(--gold); letter-spacing:1px; display:block; margin-bottom:5px;">INFORMATION DE FACTURATION</label>
                    <input type="text" class="payment-input" placeholder="NOM COMPLET DU DÉTENTEUR">
                    <input type="email" class="payment-input" placeholder="EMAIL DE RÉCEPTION">
                </div>
                <div style="margin-bottom:20px;">
                    <label style="font-size:0.6rem; color:var(--gold); letter-spacing:1px; display:block; margin-bottom:5px;">DÉTAILS DE LA CARTE</label>
                    <input type="text" class="payment-input" placeholder="0000 0000 0000 0000">
                    <div style="display:flex; gap:15px;">
                        <input type="text" class="payment-input" placeholder="MM/YY" style="flex:1;">
                        <input type="text" class="payment-input" placeholder="CVC" style="flex:1;">
                    </div>
                </div>
            </div>`;
    } 
    else if (type.includes("CRYPTO")) {
        displayZone.innerHTML = `
            <div style="animation: fadeIn 0.3s ease; text-align:center; padding: 10px 0;">
                <div style="display:flex; justify-content:center; align-items:center; gap:8px; margin-bottom:15px;">
                    <span style="color:#26A17B; font-size:0.7rem; font-weight:bold; letter-spacing:1px;">USDT TETHER</span>
                    <span style="background:#26A17B; color:white; font-size:0.4rem; padding:2px 5px; border-radius:3px; font-weight:bold;">TRC20</span>
                </div>
                <div style="background:white; padding:10px; display:inline-block; border-radius:12px; margin-bottom:15px;">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x71C7656EC7ab88b098defB751B7401B5f6d8976F" style="width:110px; display:block;">
                </div>
                <div style="background:rgba(255,255,255,0.03); border:1px solid #222; border-radius:8px; padding:12px; text-align:left;">
                    <p style="font-size:0.45rem; color:#555; margin-bottom:5px; letter-spacing:1px;">ADRESSE DE DÉPÔT OFFICIELLE</p>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <code style="font-size:0.5rem; color:var(--gold); letter-spacing:0.5px;">0x71C7656EC7ab88b...d8976F</code>
                        <span onclick="alert('Copié!')" style="font-size:0.45rem; color:#fff; background:#333; padding:4px 8px; border-radius:4px; cursor:pointer;">COPIER</span>
                    </div>
                </div>
            </div>`;
    } 
    else if (type.includes("APPLE")) {
        displayZone.innerHTML = `
            <div style="animation: fadeIn 0.3s ease; text-align:center; padding: 20px 0;">
                <p style="font-size:0.6rem; color:#888; letter-spacing:2px; margin-bottom:25px; text-transform:uppercase;">Bradford Express Checkout</p>
                <div style="background:#fff; border-radius:12px; height:60px; width:100%; display:flex; align-items:center; justify-content:center; cursor:pointer;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/512px-Apple_Pay_logo.svg.png" style="height:26px;">
                </div>
                <div style="margin-top:30px; display:flex; flex-direction:column; align-items:center; gap:10px;">
                    <div style="width:35px; height:35px; border:1px solid #222; border-radius:10px; position:relative; display:flex; align-items:center; justify-content:center;">
                         <div style="width:12px; height:12px; border:2px solid var(--gold); border-radius:2px; animation: pulse 1.5s infinite;"></div>
                    </div>
                    <p style="font-size:0.5rem; color:#444; letter-spacing:2px; text-transform:uppercase;">Face ID requis pour confirmer</p>
                </div>
            </div>`;
    }
}


window.onscroll = function() {
    const header = document.getElementById('mainHeader');
    
    // Seuil de 100px : parfait pour la transition sur iPhone 13
    // On passe en mode "scrolled" dès qu'on a un peu bougé
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

function toggleEliteMenu(show) {
    const overlay = document.getElementById('navOverlay');
    if (!overlay) return;

    if (show) {
        overlay.style.display = 'flex'; // On l'affiche d'abord
        setTimeout(() => {
            overlay.classList.add('active'); // Puis on lance le fondu
        }, 10);
        document.body.style.overflow = 'hidden';
    } else {
        overlay.classList.remove('active'); // On lance le fondu sortant
        setTimeout(() => {
            overlay.style.display = 'none'; // On cache après 400ms
        }, 400);
        document.body.style.overflow = 'auto';
    }
}


function closeAndNav(page) {
    // 1. On ferme le menu
    toggleEliteMenu(false);
    // 2. On change de page
    navigate(page);
    // 3. On remonte instantanément en haut pour que le header reprenne sa taille XXL
    window.scrollTo(0, 0);
}

// Fonction spéciale pour l'overlay car Policy n'est pas une page "navigate"
function openPolicyFromMenu() {
    toggleEliteMenu(false); // Ferme d'abord le menu noir
    if (typeof openPolicyMenu === "function") {
        openPolicyMenu(); // Appelle ta fonction qui affiche les règles
    }
}

// Cette fonction sert UNIQUEMENT à faire le pont entre le menu noir et la Policy
function triggerPolicyFromMenu(e) {
    if (e) e.preventDefault(); 
    
    // 1. Fermer le menu noir Elite
    toggleEliteMenu(false); 
    
    // 2. Ouvrir le menu Policy après un petit délai
    setTimeout(() => {
        if (typeof openPolicyMenu === "function") {
            openPolicyMenu();
        }
    }, 200);
}

// GARDE TES AUTRES FONCTIONS (openPolicyMenu, closePolicyMenu, handlePolicyClick) 
// TELLES QUELLES, ELLES SONT TRÈS BIEN.

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const prestigeBar = document.querySelector('.floating-prestige-bar');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        // On la baisse un chouïa au scroll (100px pour qu'elle respire sous le header)
        if(prestigeBar) prestigeBar.style.top = "100px"; 
    } else {
        header.classList.remove('scrolled');
        // On la remonte au repos (48vh pour qu'elle soit plus proche du logo)
        if(prestigeBar) prestigeBar.style.top = "48vh";
    }
});

function renderBradfordGallery() {
    // L'adresse directe vers ton dossier GitHub
    const BASE_URL = "https://raw.githubusercontent.com/BradfordOfficial/bradfordnightclub/main/";

    const galleryDatabase = {
        "INSIDE": [
            'LA_Bradford_inside_01.png', 'LA_Bradford_inside_02.jpeg',
            'LA_Bradford_inside_03.jpeg', 'LA_Bradford_inside_04.jpeg',
            'LA_Bradford_inside_05.jpeg', 'LA_Bradford_inside_06.jpeg',
            'LA_Bradford_inside_07.jpeg', 'LA_Bradford_inside_08.jpeg'
        ],
        "ARCHITECTURE": [
            'LA_Bradford_devanture_01.jpeg', 'LA_Bradford_devanture_02.jpeg',
            'LA_Bradford_devanture_03.jpeg', 'Miami_Bradford_devanture_01.jpeg',
            'Miami_Bradford_devanture_02.jpeg', 'Miami_Bradford_devanture_03.jpeg',
            'Miami_Bradford_devanture_04.jpeg', 'Miami_Bradford_devanture_05.jpeg',
            'Miami_Bradford_devanture_06.jpeg', 'Miami_Bradford_devanture_07.jpeg',
            'NY_Bradford_devanture_01.jpeg', 'NY_Bradford_devanture_02.jpeg',
            'NY_Bradford_devanture_03.jpeg', 'NY_Bradford_devanture_04.jpeg',
            'SF_Bradford_devanture_01.jpeg', 'SF_Bradford_devanture_02.jpeg',
            'SF_Bradford_devanture_03.jpeg'
        ],
        "ATMOSPHERE": [
            'LA_Bradford_devanture_foule_01.jpeg', 'LA_Bradford_devanture_foule_02.jpeg',
            'Miami_Bradford_devanture_foule_01.jpeg', 'Miami_Bradford_devanture_foule_02.jpeg',
            'Miami_Bradford_devanture_foule_03.jpeg', 'NY_Bradford_devanture_foule_01.jpeg',
            'SF_Bradford_devanture_foule_01.jpeg', 'SF_Bradford_devanture_foule_02.jpeg'
        ]
    };

    const style = `
    <style>
        #b-gal-root { background: #000; min-height: 100vh; padding-bottom: 50px; }
        .g-description { max-width: 600px; margin: 0 auto 3rem; text-align: center; padding: 2rem 20px 0; color: #ccc; font-size: 0.9rem; font-family: 'Inter', sans-serif; font-style: italic; border-top: 1px solid rgba(212,175,55,0.2); }
        .filter-wrapper { display: flex; justify-content: center; gap: 20px; margin-bottom: 3rem; flex-wrap: wrap; }
        .b-nav-btn { background: none; border: none; color: #555; font-family: 'Cinzel', serif; font-size: 0.8rem; letter-spacing: 3px; cursor: pointer; padding: 10px 0; border-bottom: 1px solid transparent; transition: 0.4s; }
        .b-nav-btn.active { color: var(--gold); border-bottom: 1px solid var(--gold); text-shadow: 0 0 8px rgba(212,175,55,0.3); }
        .g-main-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 0 15px; max-width: 1200px; margin: 0 auto; }
        .g-card { aspect-ratio: 1/1; overflow: hidden; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.03); }
        .g-card img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8); transition: 1s; }
        .g-card:hover img { transform: scale(1.05); filter: brightness(1.1); }
        .g-footer { text-align: center; padding: 60px 20px; color: #444; font-size: 0.6rem; letter-spacing: 2px; border-top: 1px solid #111; margin-top: 40px; }
    </style>`;

    APP_CONTENT.innerHTML = style + `
    <div id="b-gal-root">
        <h1 class="title-page">THE BRADFORD VISUAL EXPERIENCE</h1>
        <p class="subtitle-page">Immortaliser l'éphémère du luxe.</p>
        <div class="g-description">"Chaque détail du Bradford, de nos lustres en cristal noir à nos banquettes en velours sur mesure, est conçu pour stimuler l'opulence."</div>
        <div class="filter-wrapper">
            <button class="b-nav-btn active" onclick="updateView('ALL')">ALL ARCHIVES</button>
            <button class="b-nav-btn" onclick="updateView('INSIDE')">INTERIOR</button>
            <button class="b-nav-btn" onclick="updateView('ARCHITECTURE')">ARCHITECTURE</button>
            <button class="b-nav-btn" onclick="updateView('ATMOSPHERE')">ATMOSPHERE</button>
        </div>
        <div class="g-main-grid" id="bradfordGrid"></div>
        <div class="g-footer">
            PHOTOGRAPHED BY OFFICIAL BRADFORD PHOTOGRAPHER ONLY<br>
            © 2026 THE BRADFORD - PRIVATE ACCESS
        </div>
    </div>`;

    window.updateView = (filter) => {
        const grid = document.getElementById('bradfordGrid');
        const btns = document.querySelectorAll('.b-nav-btn');

        btns.forEach(b => b.classList.toggle('active', b.innerText.includes(filter) || (filter === 'ALL' && b.innerText === 'ALL ARCHIVES')));

        grid.innerHTML = "";
        
        for (const cat in galleryDatabase) {
            if (filter === 'ALL' || filter === cat) {
                galleryDatabase[cat].forEach(fileName => {
                    const card = document.createElement('div');
                    card.className = 'g-card';
                    // Ici on utilise l'URL GitHub directe combinée au nom du fichier
                    card.innerHTML = `<img src="${BASE_URL + fileName}" loading="lazy" onerror="this.parentElement.style.display='none'">`;
                    grid.appendChild(card);
                });
            }
        }
    };

    updateView('ALL');
    window.scrollTo(0, 0);
}


// GARDE BIEN CE NOM DE FONCTION
function renderSecureInquiry() {
    const style = `
    <style>
        /* Overlay de chargement haute technologie */
        #protocol-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #000; z-index: 10000; display: none;
            align-items: center; justify-content: center; flex-direction: column;
        }
        
        .pulse-loader {
            width: 80px; height: 80px; border: 1px solid var(--gold);
            border-radius: 50%; position: relative;
            animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        @keyframes pulse-ring {
            0% { transform: scale(0.33); opacity: 1; }
            80%, 100% { opacity: 0; }
        }

        /* La Page de Succès Royale */
        #bradford-success-page {
            background: #000; min-height: 100vh; width: 100%;
            display: flex; flex-direction: column; align-items: center;
            justify-content: center; padding: 20px; box-sizing: border-box;
            font-family: 'Cinzel', serif; overflow: hidden;
        }

        .success-content {
            max-width: 800px; width: 100%; text-align: center;
            position: relative; padding: 4rem 2rem;
            border-left: 1px solid rgba(212,175,55,0.3);
            border-right: 1px solid rgba(212,175,55,0.3);
            background: linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(10,10,10,0.8) 50%, rgba(5,5,5,0) 100%);
        }

        .protocol-title {
            font-size: clamp(1.2rem, 5vw, 2.5rem); color: var(--gold);
            letter-spacing: 15px; text-transform: uppercase; margin-bottom: 30px;
            text-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
            opacity: 0; transform: translateY(20px);
        }

        .status-confirmed {
            color: var(--teal); font-size: 0.7rem; letter-spacing: 5px;
            margin-bottom: 50px; display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        .protocol-body {
            font-family: 'Inter', sans-serif; color: #888; line-height: 2.2;
            font-size: 0.85rem; letter-spacing: 1px; max-width: 500px; margin: 0 auto 60px;
            opacity: 0;
        }

        /* Bouton Retour Premium */
        .btn-home {
            background: transparent; border: 1px solid var(--gold); color: var(--gold);
            padding: 20px 50px; font-family: 'Cinzel'; font-size: 0.7rem;
            letter-spacing: 6px; cursor: pointer; transition: 0.6s cubic-bezier(0.19, 1, 0.22, 1);
            position: relative; overflow: hidden;
        }

        .btn-home:hover {
            background: var(--gold); color: #000; box-shadow: 0 0 40px rgba(212, 175, 55, 0.4);
        }

        /* Animations de texte type Matrix/Terminal */
        .reveal-text { animation: revealText 1.5s ease forwards; }
        @keyframes revealText { to { opacity: 1; transform: translateY(0); } }
        
        .grid-bg {
            position: absolute; width: 100%; height: 100%; top: 0; left: 0;
            background-image: linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px);
            background-size: 50px 50px; pointer-events: none; opacity: 0.3;
        }
    </style>
    <div id="protocol-overlay"><div class="pulse-loader"></div><p id="overlay-status" style="font-family:'Cinzel'; color:var(--gold); margin-top:20px; font-size:0.6rem; letter-spacing:4px;"></p></div>
    `;

    // 1. ANIMATION DU BOUTON (L'effet que tu kiffes)
    const btn = document.querySelector('.transmit-btn') || event.target;
    btn.disabled = true;
    btn.innerHTML = "ENCRYPTING...";
    btn.style.borderColor = "var(--gold)";

    setTimeout(() => {
        btn.innerHTML = "DATA TRANSMITTED";
        btn.style.color = "var(--teal)";
        btn.style.borderColor = "var(--teal)";

        // 2. LATENCE ET CHARGEMENT DE LA PAGE
        setTimeout(() => {
            const overlay = document.getElementById('protocol-overlay');
            if(!overlay) { // Si l'overlay n'est pas dans le DOM, on l'ajoute
                document.body.insertAdjacentHTML('afterbegin', style);
            }
            const activeOverlay = document.getElementById('protocol-overlay');
            activeOverlay.style.display = 'flex';
            
            // Simulation de séquence de boot
            const status = document.getElementById('overlay-status');
            const sequences = ["ESTABLISHING UPLINK...", "SECURING DATA PACKETS...", "BRADFORD SERVERS REACHED"];
            let seqIndex = 0;
            
            const seqInterval = setInterval(() => {
                status.innerText = sequences[seqIndex];
                seqIndex++;
                if(seqIndex >= sequences.length) {
                    clearInterval(seqInterval);
                    setTimeout(() => renderOfficialSuccess(), 800);
                }
            }, 600);

        }, 1200);
    }, 2000);
}

function renderOfficialSuccess() {
    // 1. Nettoyage et Reset Position
    const overlay = document.getElementById('protocol-overlay');
    if(overlay) overlay.remove();
    window.scrollTo(0, 0);

    // 2. Génération des données dynamiques
    const now = new Date();
    const timestamp = now.getHours() + ":" + (now.getMinutes()<10?'0':'') + now.getMinutes();
    const dateStr = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

    const style = `
    <style>
        #bradford-success-page {
            background: #000; min-height: 100vh; width: 100%; position: relative;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            padding: 20px; box-sizing: border-box; color: #fff;
        }

        .interface-frame {
            width: 100%; max-width: 450px; border: 1px solid rgba(212,175,55,0.15);
            background: #050505;
            padding: 50px 25px; position: relative; box-shadow: 0 0 40px rgba(0,0,0,1);
            animation: frameEntry 0.8s ease-out;
        }

        @keyframes frameEntry { from { opacity: 0; } to { opacity: 1; } }

        .metrics-bar {
            display: flex; justify-content: space-between; border-bottom: 1px solid rgba(212,175,55,0.1);
            padding-bottom: 12px; margin-bottom: 35px; font-family: 'Inter', sans-serif; font-size: 0.55rem;
            color: #555; letter-spacing: 2px;
        }

        .main-title-luxury {
            font-family: 'Cinzel', serif; font-size: 1.5rem; color: var(--gold);
            letter-spacing: 6px; text-transform: uppercase; margin: 25px 0;
            line-height: 1.4;
        }

        .data-viz {
            width: 100%; height: 1px; background: #1a1a1a; margin: 35px 0; position: relative;
        }
        .data-progress {
            position: absolute; left: 0; top: 0; height: 100%; width: 0%;
            background: var(--gold);
            animation: progressFill 2s ease-in-out forwards;
        }
        @keyframes progressFill { to { width: 100%; } }

        .info-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 25px; text-align: left;
            margin: 40px 0; font-family: 'Inter', sans-serif;
        }
        .info-item label { display: block; font-size: 0.5rem; color: #444; letter-spacing: 2px; margin-bottom: 5px; text-transform: uppercase; }
        .info-item span { font-size: 0.65rem; color: #aaa; letter-spacing: 1px; }

        .btn-home-secure {
            width: 100%; background: transparent; border: 1px solid var(--gold);
            color: var(--gold); padding: 22px; font-family: 'Cinzel';
            font-size: 0.7rem; letter-spacing: 5px; cursor: pointer;
            transition: 0.4s; margin-top: 10px; text-transform: uppercase;
        }
        .btn-home-secure:active { background: var(--gold); color: #000; }
    </style>`;

    APP_CONTENT.innerHTML = style + `
    <div id="bradford-success-page">
        <div class="interface-frame">
            
            <div class="metrics-bar">
                <span>INQUIRY ID: #${Math.floor(1000 + Math.random() * 9000)}</span>
                <span>STATUS: ARCHIVED</span>
            </div>

            <div style="color:#aaa; font-family:'Cinzel'; font-size:0.6rem; letter-spacing:3px;">CONFIRMATION PRÉFECTORALE</div>
            <h1 class="main-title-luxury">REQUÊTE<br>ENREGISTRÉE</h1>

            <div class="data-viz"><div class="data-progress"></div></div>

            <div class="info-grid">
                <div class="info-item">
                    <label>HEURE D'ENVOI</label>
                    <span>${timestamp} LMT</span>
                </div>
                <div class="info-item">
                    <label>DATE DE RÉCEPTION</label>
                    <span>${dateStr}</span>
                </div>
                <div class="info-item">
                    <label>BUREAU</label>
                    <span>BRADFORD HEADQUARTERS</span>
                </div>
                <div class="info-item">
                    <label>DOSSIER</label>
                    <span>#${Math.floor(Math.random() * 1000)}/VIP</span>
                </div>
            </div>

            <p style="font-size:0.7rem; color:#555; line-height:2; margin-bottom:45px; font-family:'Inter'; font-style: italic;">
                Votre demande a été transmise avec succès aux archives privées du Bradford. Un responsable de la conciergerie traitera votre dossier dans les plus brefs délais.
            </p>

            <button class="btn-home-secure" onclick="window.scrollTo(0,0); navigate('home')">
                RETURN TO HOME
            </button>
        </div>

        <div style="margin-top:40px; font-family:'Cinzel'; font-size:0.5rem; color:#333; letter-spacing:4px;">
            THE BRADFORD — OFFICIAL CONCIERGERIE 2026
        </div>
    </div>`;
}


function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'fr',
        autoDisplay: false
    }, 'google_translate_element');
}

// Fonction pour changer de langue
function changeLanguage(langCode) {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
        document.getElementById('active-lang').innerText = langCode.toUpperCase().split('-')[0];
        toggleLangList();
    }
}

function toggleLangList() {
    const list = document.getElementById('lang-list');
    list.classList.toggle('show');
}

// Fermeture au clic extérieur
document.addEventListener('click', (e) => {
    if (!e.target.closest('.luxury-lang-switcher')) {
        document.getElementById('lang-list').classList.remove('show');
    }
});

function launchEliteOverlay() {
    if(document.getElementById('elite-sas')) return;

    const sas = document.createElement('div');
    sas.id = 'elite-sas';
    // On bloque le scroll quand l'overlay est là
    document.body.style.overflow = 'hidden'; 

    sas.innerHTML = `
        <div class="sas-content">
            <p class="sas-label">VERIFICATION D'ACCÈS</p>
            <h1 class="sas-title">MEMBRE MAJEUR</h1>
            <div class="sas-body">
                <p>Pour accéder à la carte des spiritueux, veuillez confirmer que vous avez l'âge légal de consommation dans votre pays.</p>
            </div>
            <button class="sas-confirm" onclick="confirmEliteAccess()">CONFIRMER</button>
            <p class="sas-exit" onclick="handleEliteExit()">QUITTER</p>
        </div>
    `;
    document.body.appendChild(sas);
}

// Nouvelle fonction dédiée pour le bouton QUITTER (plus propre et sans bug)
function handleEliteExit() {
    window.scrollTo(0, 0);
    if (typeof navigate === 'function') {
        navigate('home');
    }
    const sas = document.getElementById('elite-sas');
    if (sas) {
        sas.remove();
    }
    document.body.style.overflow = '';
    document.body.style.position = '';
}

function confirmEliteAccess() {
    sessionStorage.setItem('vip_auth_confirmed', 'true');
    const sas = document.getElementById('elite-sas');
    
    if (sas) {
        sas.style.opacity = '0';
        sas.style.transition = 'opacity 0.5s ease';
    }
    
    setTimeout(() => {
        if (sas) sas.remove();
        document.body.style.overflow = ''; 
        document.body.style.position = '';
        window.scrollTo(0, 0);
        
        // On vérifie si la fonction existe avant de l'appeler
        if (typeof renderBottleMenuPage === 'function') {
            renderBottleMenuPage(); 
        }
    }, 500);
}




/** Charge le JSON et démarre l'application */
async function initApp() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            // Tentative de lecture en ligne si le fichier local échoue (problème Koder/navigateur)
            throw new Error('Erreur de chargement JSON. Assurez-vous que config.json est bien dans le même dossier.');
        }
        APP_DATA = await response.json();
        
        // Rendu du Footer et Démarrage
        renderFooter(); 
        navigate(DEFAULT_PAGE);
        
        // Active l'animation du logo au scroll
        window.addEventListener('scroll', handleScrollAnimation);

    } catch (error) {
        APP_CONTENT.innerHTML = `<h1 class="title-page" style="color: red;">ERREUR CRITIQUE: JSON</h1><p style="text-align: center; color: #999;">Impossible de charger les données du club. Vérifiez votre fichier config.json. Message: ${error.message}</p>`;
        console.error("Erreur critique d'initialisation:", error);
    }
}

/** Effet interactif : changement de couleur du logo au scroll */
function handleScrollAnimation() {
    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo');
    const scrollPosition = window.scrollY;

    // Change la couleur du logo quand on a scrollé au-delà du header
    if (scrollPosition > 100) {
        logo.style.color = 'var(--teal)'; // Devient teal après le scroll
        logo.style.fontSize = '2rem';
    } else {
        logo.style.color = 'var(--gold)'; // Reste gold en haut de page
        logo.style.fontSize = '1.8rem';
    }
}

// AJOUTER L'ÉCOUTEUR D'ÉVÉNEMENT (à mettre au début de initApp)
// window.addEventListener('scroll', handleScrollAnimation);

// Lancer le script au chargement de la page
window.onload = initApp;
