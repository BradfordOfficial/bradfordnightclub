let selectionPreremplie = { lieu: '', date: '', artiste: '' };

window.reserverEvenement = function(lieu, date, artiste) {
    selectionPreremplie = { lieu: lieu, date: date, artiste: artiste };
    window.scrollTo(0,0);
    navigate('reservations');
};

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
    // LA FAQ DOIT ÊTRE ICI ET STOPPER TOUT LE RESTE
if (pageId === 'faq') {
    renderFAQPage();
    return; // INDISPENSABLE pour ne pas tomber dans le switch plus bas
}
    if (pageId === 'careers') {
    renderCareersPage(); 
    return; 
}
    if (pageId === 'legal')  {
    renderLegalPage(); 
    return; 
}
    if (pageId === 'press') {
    renderPressPage(); 
    return; 
}
    if (pageId === 'location') {
    renderLocationPage(); 
    return; 
}
    if (pageId === 'entry_policy') {
    renderEntryPolicy(); 
    return; 
}
    
    if (pageId === 'vip_policy') {
    renderVIPPolicy(); 
    return; 
}
    if (pageId === 'bottle_service_req') {
    renderBottleRequirements(); 
    return; 
}

    if (pageId === 'house_rules') {
    renderHouseRules(); 
    return; 
}
    if (pageId === 'about_bradford') {
    renderAboutBradford(); 
    return; 
}
    if (pageId === 'guest_guidelines') {
    renderGuestGuidelines(); 
    return; 
}
    if (pageId === 'press_mentions') {
    renderPressMentions(); 
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
         case 'faq': renderFAQPage(); break; 
         case 'careers': // AJOUTE ÇA
            renderCareersPage();
            break;
            case 'press_mentions': renderPressMentions(); break;
            case 'guest_guidelines': renderGuestGuidelines(); break;
            case 'about_bradford': renderAboutBradford(); break;
            case 'bottle_service_req': renderBottleRequirements(); break;
            case 'vip_policy': renderVIPPolicy(); break;
            case 'entry_policy': renderEntryPolicy(); break;
            case 'house_rules': renderHouseRules(); break;
         case 'legal': renderLegalPage(); break;
         case 'press': renderPressPage(); break;
        case 'location': renderLocationPage(); break; // Utilisation de la fonction spécifique
case 'concierge': renderConciergePage(); break; 
        default: navigate('home');
    }
}


function renderFooter() {
    APP_FOOTER.innerHTML = `
        <div class="footer-container">
            <div class="footer-brand">
                <h2 class="f-logo">BRADFORD</h2>
                <p class="f-cities">MIAMI • LOS ANGELES • NEW YORK • SAN FRANCISCO</p>
                <div class="f-socials">
                     <a href="https://www.instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.youtube.com" target="_blank"><i class="fab fa-youtube"></i></a>
                    <a href="https://www.x.com" target="_blank"><i class="fab fa-x-twitter"></i></a>
                    <a href="https://www.threads.net" target="_blank"><i class="fab fa-threads"></i></a>
                </div>
            </div>

            <div class="footer-grid">
                <div class="f-col">
                    <span class="f-title">EXPERIENCE</span>
                    <a href="#" onclick="navigate('location')">LOCATIONS & HOURS</a>
                    <a href="#" onclick="navigate('events')">EVENTS CALENDAR</a>
                    <a href="#" onclick="navigate('gallery')">MEDIA GALLERY</a>
                    <a href="#" onclick="navigate('press_mentions')">PRESS MENTIONS</a>
                </div>

                <div class="f-col">
                    <span class="f-title">PROTOCOLS</span>
                    <a href="#" onclick="navigate('dress_code')">DRESS CODE</a>
                    <a href="#" onclick="navigate('vip_policy')">VIP POLICY</a>
                    <a href="#" onclick="navigate('house_rules')">HOUSE RULES</a>
                    <a href="#" onclick="navigate('faq')">FAQ</a> </div>

                <div class="f-col">
                    <span class="f-title">CORPORATE</span>
                    <a href="#" onclick="navigate('about_bradford')">ABOUT BRADFORD</a>
                    <a href="#" onclick="navigate('careers')">CAREERS</a>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="f-legal">
                <a href="#" onclick="navigate('legal')">LEGAL NOTICE</a>
                <a href="#" onclick="navigate('press')">PRESS & MEDIA</a> </div>
            <p class="f-copy">&copy; ${new Date().getFullYear()} BRADFORD NIGHTCLUB. ALL RIGHTS RESERVED.</p>
        </div>
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

    <div style="text-align: center; margin: 50px 0 50px 0;">
    <button onclick="openOfficialMenu()" style="
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
        position: relative;
    "
    onmouseenter="
        this.querySelector('.vfm-inner').style.borderColor='rgba(212,175,55,0.5)';
        this.querySelector('.vfm-inner').style.boxShadow='0 0 40px rgba(212,175,55,0.08)';
        this.querySelector('.vfm-title').style.color='var(--gold)';
        this.querySelector('.vfm-arrow').style.opacity='1';
        this.querySelector('.vfm-arrow').style.transform='translateY(3px)';
    "
    onmouseleave="
        this.querySelector('.vfm-inner').style.borderColor='rgba(212,175,55,0.15)';
        this.querySelector('.vfm-inner').style.boxShadow='none';
        this.querySelector('.vfm-title').style.color='var(--ivory, #f8f5e6)';
        this.querySelector('.vfm-arrow').style.opacity='0.3';
        this.querySelector('.vfm-arrow').style.transform='translateY(0)';
    "
    >
        <div class="vfm-inner" style="
            border: 1px solid rgba(212,175,55,0.15);
            border-radius: 4px;
            padding: 20px 50px;
            position: relative;
            transition: border-color 0.4s, box-shadow 0.4s;
            overflow: hidden;
        ">
            <div style="
                position: absolute;
                top: 0; left: 0; right: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, var(--gold), transparent);
            "></div>

            <span class="vfm-title" style="
                font-family: 'Cinzel', serif;
                font-size: 0.9rem;
                letter-spacing: 7px;
                color: var(--ivory, #f8f5e6);
                text-transform: uppercase;
                font-weight: 400;
                transition: color 0.4s;
                display: block;
                white-space: nowrap;
            ">VIEW FULL MENU</span>

            <div style="
                position: absolute;
                bottom: 0; left: 0; right: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(0,178,169,0.4), transparent);
            "></div>
        </div>

        <span class="vfm-arrow" style="
            color: rgba(212,175,55,0.3);
            font-size: 0.7rem;
            margin-top: 12px;
            opacity: 0.3;
            transition: opacity 0.4s, transform 0.4s;
        ">↓</span>
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
            html += `<div class="menu-grid reveal">`;

            items.forEach(item => {
                const isLimited = item.isLimited;
                const basePrice = item.price;
                const finalPrice = calculateFinalPrice(basePrice);
                const priceText = formatPrice(basePrice);
                
                
html += `
    <div class="menu-item-card reveal ${isLimited ? 'premium-limited-card' : ''}" 
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
    // --- BLOC ANIMATION SCROLL ---
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
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
            <h1 class="tit-page" style="font-size: 1.8rem;">BOTTLE SERVICE</h1>
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
                    
                      <div style="text-align: center; margin-bottom: 10px;">
            <label style="font-size: 0.55rem; color: #D4AF37; letter-spacing: 1px; text-transform: uppercase;">Table Reservation Required</label>
        </div>
        <div style="display: flex; align-items: center; background: rgba(212, 175, 55, 0.05); border: 1px dashed rgba(212, 175, 55, 0.3); padding: 5px 12px; border-radius: 4px; margin-bottom: 25px;">
            <span style="color: #D4AF37; font-family: 'Courier New', monospace; font-weight: bold; letter-spacing: 1px; padding-right: 5px;">BRD-</span>
            <input type="text" id="tableCode" placeholder="SERIE NUMBER" style="flex: 1; background: transparent; border: none; color: #fff; padding: 10px 0; font-family: 'Courier New', monospace; font-size: 0.9rem; outline: none; text-transform: uppercase;">
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

                <div style="max-width:350px; margin:60px auto; text-align:left; font-size:0.7rem; color:rgba(255,255,255,0.7); border-left:1px solid var(--gold); padding-left:20px;">
                    <p style="margin-bottom:10px;"><b style="color:var(--gold);">01.</b> PRÉSENTEZ CE QR CODE AU COMPTOIR VIP HOST.</p>
                    <p style="margin-bottom:10px;"><b style="color:var(--gold);">02.</b> VOTRE TABLE SERA DRESSÉE À VOTRE ARRIVÉE.</p>
                    <p style="margin-bottom:10px;"><b style="color:var(--gold);">03.</b> UNE PIÈCE D'IDENTITÉ EST REQUISE.</p>
                </div>

 <button class="cta-button" onclick="window.scrollTo(0,0); navigate('home')" style="width:100%; max-width:350px; background:var(--gold); color:#000; font-weight:bold; height:50px; margin-top:60px; border:none; cursor:pointer; margin-left:auto; margin-right:auto; display:block;">
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
   const elCity = document.getElementById('res-city');
    const elDate = document.getElementById('res-date');

    // 2. Si on vient d'un clic sur un artiste
    if (selectionPreremplie.artiste !== '') {
        
        // --- LE DICTIONNAIRE COMPLET ---
        const traducteur = {
            'LA': 'Los Angeles',
            'NYC': 'New York',
            'SF': 'San Francisco',
            'MIAMI': 'Miami'
        };

        // On récupère le nom complet propre (ex: "NYC" -> "New York")
        const villeCible = traducteur[selectionPreremplie.lieu] || selectionPreremplie.lieu;

        if (elCity) {
            let trouve = false;
            const cibleNettoyee = villeCible.toLowerCase().trim();

            // On scanne tout le menu déroulant
            for (let i = 0; i < elCity.options.length; i++) {
                const texteOption = elCity.options[i].text.toLowerCase().trim();
                
                // Si l'option du menu correspond à notre ville traduite
                if (texteOption === cibleNettoyee || texteOption.includes(cibleNettoyee)) {
                    elCity.selectedIndex = i;
                    elCity.dispatchEvent(new Event('change')); // On force le site à se mettre à jour
                    trouve = true;
                    break;
                }
            }
            
            if (!trouve) console.warn("La ville '" + villeCible + "' n'est pas dans ton menu.");
        }

        // On remplit la date
        if (elDate) elDate.value = selectionPreremplie.date;

        // On affiche le nom de l'artiste dans le titre (Confirmation visuelle)
        const subtitle = document.querySelector('.subtitle-page');
        if (subtitle) {
            subtitle.innerHTML = `TABLE VIP: <span style="color:var(--gold)">${selectionPreremplie.artiste}</span>`;
        }

        // On vide la mémoire
        selectionPreremplie = { lieu: '', date: '', artiste: '' };

    } else {
        // Mode manuel (date du jour par défaut)
        if (elDate && !elDate.value) {
            elDate.value = new Date().toISOString().split('T')[0];
        }
    }
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
            <div class="menu-item-card reveal">
                <h3 class="item-name" style="color: var(--teal);">Heures d'Ouverture</h3>
                <p>Queue dès 23:30. Ouverture des portes à 00:00. L'entrée peut être limitée après 02:00.</p>
            </div>
            <div class="menu-item-card reveal">
                <h3 class="item-name" style="color: var(--teal);">Service Obligatoire</h3>
                <p>Une charge de service de 20% est automatiquement appliquée au sous-total de toutes les commandes (bottles, add-ons).</p>
            </div>
            <div class="menu-item-card reveal">
                <h3 class="item-name" style="color: var(--teal);">Min Spend / Table</h3>
                <p>Minimum Bottle Spend obligatoire. $3000 (Jeu/Dim) et $5000 (Ven/Sam) pour sécuriser la table.</p>
            </div>
            <div class="menu-item-card reveal">
    <h3 class="item-name" style="color: var(--teal);">Contrôle d'Identité</h3>
    <p>Accès strictement réservé aux personnes de 21 ans et plus. Une pièce d'identité originale et valide est exigée à l'entrée (pas de photocopies).</p>
</div>

        </div>

<!-- FAQ CTA - Mobile : inchangé / Tablette+PC : layout 2 colonnes -->
<div style="
    display: flex;
    justify-content: center;
    margin: 50px 0 40px;
">
    <!-- VERSION MOBILE (< 768px) — identique à avant -->
    <div id="faq-cta-mobile" onclick="navigate('faq')" style="
        cursor: pointer;
        background: linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(0,178,169,0.06) 100%);
        border: 1px solid rgba(212,175,55,0.25);
        border-radius: 20px;
        padding: 30px 50px;
        text-align: center;
        max-width: 560px;
        width: 100%;
        transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        position: relative;
        overflow: hidden;
    "
    onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 50px rgba(212,175,55,0.15)'; this.style.borderColor='rgba(212,175,55,0.6)';"
    onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='rgba(212,175,55,0.25)';"
    >
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);"></div>
        <p style="font-family:'Cinzel',serif;color:var(--gold);font-size:0.7rem;letter-spacing:5px;text-transform:uppercase;margin:0 0 10px;opacity:0.7;">BRADFORD SERVICE</p>
        <h3 style="font-family:'Cinzel',serif;color:var(--ivory);font-size:1.4rem;margin:0 0 10px;font-weight:400;">Questions & Réponses</h3>
        <p style="color:#999;font-size:0.88rem;letter-spacing:1px;margin:0 0 22px;line-height:1.6;">Dress code, politique d'annulation,<br>accès VIP et bien plus.</p>
        <div style="display:inline-flex;align-items:center;gap:10px;background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.3);border-radius:50px;padding:10px 24px;color:var(--gold);font-size:0.78rem;letter-spacing:3px;text-transform:uppercase;font-family:'Cinzel',serif;">
            Consulter la FAQ <span style="font-size:1rem;opacity:0.8;">→</span>
        </div>
        <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,178,169,0.4),transparent);"></div>
    </div>

    <!-- VERSION TABLETTE + PC (>= 768px) — layout 2 colonnes -->
    <div id="faq-cta-desktop" style="
        display: none;
        width: 100%;
        background: linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(0,178,169,0.06) 100%);
        border: 1px solid rgba(212,175,55,0.25);
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        transition: border-color 0.3s, box-shadow 0.3s;
    "
    onmouseenter="this.style.borderColor='rgba(212,175,55,0.5)'; this.style.boxShadow='0 20px 60px rgba(212,175,55,0.12)';"
    onmouseleave="this.style.borderColor='rgba(212,175,55,0.25)'; this.style.boxShadow='none';"
    >
        <!-- Ligne dorée haut -->
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);"></div>

        <div style="display:flex;align-items:stretch;">

            <!-- COLONNE GAUCHE -->
            <div style="
                flex: 0 0 42%;
                padding: 45px 40px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-right: 1px solid rgba(212,175,55,0.1);
            ">
                <p style="font-family:'Cinzel',serif;color:var(--gold);font-size:0.65rem;letter-spacing:5px;text-transform:uppercase;margin:0 0 14px;opacity:0.7;">BRADFORD SERVICE</p>
                <h3 style="font-family:'Cinzel',serif;color:var(--ivory);font-size:1.6rem;margin:0 0 14px;font-weight:400;line-height:1.3;">Questions<br>& Réponses</h3>
                <p style="color:#999;font-size:0.85rem;letter-spacing:0.5px;margin:0 0 30px;line-height:1.7;">Dress code, politique d'annulation, accès VIP et bien plus.</p>
                <div onclick="navigate('faq')" style="
                    display:inline-flex;
                    align-items:center;
                    gap:10px;
                    background:rgba(212,175,55,0.1);
                    border:1px solid rgba(212,175,55,0.35);
                    border-radius:50px;
                    padding:12px 28px;
                    color:var(--gold);
                    font-size:0.75rem;
                    letter-spacing:3px;
                    text-transform:uppercase;
                    font-family:'Cinzel',serif;
                    cursor:pointer;
                    width:fit-content;
                    transition:background 0.3s, box-shadow 0.3s;
                "
                onmouseenter="this.style.background='rgba(212,175,55,0.2)'; this.style.boxShadow='0 5px 20px rgba(212,175,55,0.2)';"
                onmouseleave="this.style.background='rgba(212,175,55,0.1)'; this.style.boxShadow='none';"
                >
                    Consulter la FAQ <span style="font-size:1rem;opacity:0.8;">→</span>
                </div>
            </div>

            <!-- COLONNE DROITE — questions -->
            <div style="
                flex: 1;
                padding: 35px 35px 0 35px;
                position: relative;
                overflow: hidden;
                max-height: 280px;
            ">
                <!-- Questions cliquables -->
                <div id="faq-questions-list">
                    ${[
                        "Comment devenir Member au Bradford ?",
                        "Quel est l'âge minimum requis ?",
                        "Quel est le Minimum Spend pour une table ?",
                        "Quelle est la bouteille la plus rare de votre cave ?",
                        "Quels sont les avantages exclusifs des Members ?",
                        "Puis-je entrer après 2h du matin ?",
                        "Comment fonctionne le dépôt de garantie ?",
                        "Proposez-vous des cocktails signature ?"
                    ].map(q => `
                        <div onclick="navigate('faq')" style="
                            display:flex;
                            align-items:center;
                            justify-content:space-between;
                            padding:14px 0;
                            border-bottom:1px solid rgba(212,175,55,0.1);
                            cursor:pointer;
                            transition:color 0.2s;
                            color:#bbb;
                            font-size:0.88rem;
                            letter-spacing:0.3px;
                            gap:12px;
                        "
                        onmouseenter="this.style.color='var(--ivory)'; this.querySelector('span').style.color='var(--gold)';"
                        onmouseleave="this.style.color='#bbb'; this.querySelector('span').style.color='rgba(212,175,55,0.4)';"
                        >
                            ${q}
                            <span style="color:rgba(212,175,55,0.4);font-size:1.1rem;flex-shrink:0;transition:color 0.2s;">→</span>
                        </div>
                    `).join('')}
                </div>

                <!-- Dégradé disparition bas -->
                <div style="
                    position:absolute;
                    bottom:0;left:0;right:0;
                    height:90px;
                    background:linear-gradient(to bottom, transparent, rgba(5,8,20,0.97));
                    pointer-events:none;
                "></div>
            </div>

        </div>

        <!-- Ligne teal bas -->
        <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,178,169,0.4),transparent);"></div>
    </div>
</div>

       

        
         <div class="hero-section"
style="
background-image:
linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.65)),
url('https://images.pexels.com/photos/14275473/pexels-photo-14275473.jpeg');
height: 360px;
background-size: cover; /* léger dézoom pour voir plus de contexte */
background-position: center 40%; /* garde la verticalité originale */
background-repeat: no-repeat;
display: flex;
align-items: center;
justify-content: center;
margin: 50px 0;
border-radius: 30px 30px 90px 90px;
box-shadow: 0 25px 60px rgba(0,0,0,0.6);
overflow: hidden;
position: relative;
">
      <div style="text-align: center; padding: 20px;">
             <h2 style="
color: #f8f5e6;
font-family: 'Cinzel', serif;
font-size: 2.3rem;
text-align: center;
text-shadow: 0 10px 40px rgba(0,0,0,0.8);
">L'Exclusivité Redéfinie.</h2>
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

<div id="concierge-cta-section" style="margin:70px auto 30px;max-width:1000px;padding:0 20px;">

    <!-- MOBILE -->
    <div id="concierge-mobile-view" style="
        position:relative;border-radius:20px;overflow:hidden;
        min-height:460px;display:flex;flex-direction:column;justify-content:flex-end;
        background-image:linear-gradient(to top,rgba(0,0,0,0.96) 0%,rgba(0,0,0,0.55) 55%,rgba(0,0,0,0.25) 100%),
        url('https://images.pexels.com/photos/35925508/pexels-photo-35925508.jpeg');
        background-size:cover;background-position:center;
        box-shadow:0 30px 70px rgba(0,0,0,0.7);
    ">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);"></div>
        <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,178,169,0.4),transparent);"></div>

        <div style="position:absolute;top:22px;right:22px;display:inline-flex;align-items:center;gap:7px;background:rgba(0,0,0,0.6);border:1px solid rgba(0,178,169,0.2);border-radius:50px;padding:6px 14px;backdrop-filter:blur(10px);">
            <div style="width:5px;height:5px;border-radius:50%;background:var(--teal,#0AA6A6);"></div>
            <span style="font-family:'Cinzel',serif;font-size:0.48rem;letter-spacing:4px;color:rgba(0,178,169,0.8);text-transform:uppercase;">24h · 7j/7</span>
        </div>

        <div style="padding:34px 28px;">
          
            <h2 style="font-family:'Cinzel',serif;font-size:2.1rem;color:var(--ivory,#f8f5e6);font-weight:400;letter-spacing:4px;margin:0 0 4px;line-height:1.1;">CONCIERGE</h2>
            <h2 style="font-family:'Cinzel',serif;font-size:0.95rem;color:var(--gold);font-weight:400;letter-spacing:10px;margin:0 0 18px;">PRIVÉ</h2>
            <p style="color:rgba(255,255,255,0.45);font-size:0.79rem;line-height:1.85;margin:0 0 26px;letter-spacing:0.3px;max-width:320px;">Une équipe dédiée pour orchestrer chaque détail de votre soirée, de votre arrivée en Uber Black jusqu'aux requêtes les plus exclusives.</p>

            <div onclick="navigate('concierge');window.scrollTo(0,0);"
            onmouseenter="this.style.background='rgba(212,175,55,0.18)';this.style.borderColor='rgba(212,175,55,0.6)';"
            onmouseleave="this.style.background='rgba(0,0,0,0.5)';this.style.borderColor='rgba(212,175,55,0.3)';"
            style="align-self:center;display:flex;align-items:center;gap:11px;background:rgba(0,0,0,0.5);border:1px solid rgba(212,175,55,0.3);border-radius:50px;padding:12px 28px;color:var(--gold);font-family:'Cinzel',serif;font-size:0.68rem;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all 0.35s;white-space:nowrap;backdrop-filter:blur(8px);">
                Accéder au Concierge <span style="opacity:0.6;font-size:0.9rem;">→</span>
            </div>
        </div>
    </div>

    <!-- TABLETTE + PC -->
    <div id="concierge-desktop-view" style="display:none;">
        <div style="display:grid;grid-template-columns:1fr 1fr;border:1px solid rgba(212,175,55,0.15);border-radius:20px;overflow:hidden;position:relative;">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);"></div>
            <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,178,169,0.4),transparent);"></div>

            <!-- Image gauche -->
            <div style="
                min-height:480px;
                background-image:linear-gradient(to right,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.55) 100%),
                url('https://images.pexels.com/photos/35925508/pexels-photo-35925508.jpeg');
                background-size:cover;background-position:center;
                position:relative;
            ">
                <div style="position:absolute;top:24px;left:24px;display:inline-flex;align-items:center;gap:7px;background:rgba(0,0,0,0.6);border:1px solid rgba(0,178,169,0.2);border-radius:50px;padding:7px 16px;backdrop-filter:blur(10px);">
                    <div style="width:5px;height:5px;border-radius:50%;background:var(--teal,#0AA6A6);"></div>
                    <span style="font-family:'Cinzel',serif;font-size:0.48rem;letter-spacing:4px;color:rgba(0,178,169,0.8);text-transform:uppercase;">24h · 7j/7</span>
                </div>
            </div>

            <!-- Texte droite -->
            <div style="padding:55px 48px;background:linear-gradient(135deg,rgba(212,175,55,0.04) 0%,rgba(0,0,0,0) 100%);display:flex;flex-direction:column;justify-content:center;">
                <p style="font-family:'Cinzel',serif;font-size:0.52rem;letter-spacing:6px;color:rgba(212,175,55,0.5);text-transform:uppercase;margin:0 0 12px;">SERVICE EXCLUSIF</p>
                <h2 style="font-family:'Cinzel',serif;font-size:2.3rem;color:var(--ivory,#f8f5e6);font-weight:400;letter-spacing:4px;margin:0 0 4px;line-height:1.1;">CONCIERGE</h2>
                <h2 style="font-family:'Cinzel',serif;font-size:0.95rem;color:var(--gold);font-weight:400;letter-spacing:10px;margin:0 0 22px;">PRIVÉ</h2>
                <p style="color:rgba(255,255,255,0.4);font-size:0.81rem;line-height:1.9;margin:0 0 30px;letter-spacing:0.3px;">Une équipe dédiée orchestre chaque détail de votre soirée, des transferts Uber Black jusqu'aux spiritueux les plus rares de notre cave privée.</p>

                <!-- Services séparés par traits fins -->
                <div style="display:flex;flex-direction:column;gap:0;margin-bottom:34px;border-top:1px solid rgba(212,175,55,0.1);">
                    <div style="padding:14px 0;border-bottom:1px solid rgba(212,175,55,0.08);">
                        <p style="font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:3px;color:var(--gold);margin:0 5px 4px;text-transform:uppercase;">Ligne Privée</p>
                        <p style="font-size:0.74rem;color:rgba(255,255,255,0.3);margin:0;line-height:1.5;">Votre hôte personnel Bradford, joignable à tout moment.</p>
                    </div>
                    <div style="padding:14px 0;border-bottom:1px solid rgba(212,175,55,0.08);">
                        <p style="font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:3px;color:var(--gold);margin:0 5px 4px;text-transform:uppercase;">Uber Black · Partenariat Exclusif</p>
                        <p style="font-size:0.74rem;color:rgba(255,255,255,0.3);margin:0;line-height:1.5;">Transfert VIP depuis votre adresse: Miami, New York, Los Angeles, San Francisco.</p>
                    </div>
                    <div style="padding:14px 0;">
                        <p style="font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:3px;color:var(--gold);margin:0 5px 4px;text-transform:uppercase;">Requêtes Prestige</p>
                        <p style="font-size:0.74rem;color:rgba(255,255,255,0.3);margin:0;line-height:1.5;">Spiritueux hors-menu, privatisation, groupes VIP & célébrités.</p>
                    </div>
                </div>

                <div onclick="navigate('concierge');window.scrollTo(0,0);"
                onmouseenter="this.style.background='rgba(212,175,55,0.14)';this.style.borderColor='rgba(212,175,55,0.55)';this.style.boxShadow='0 8px 30px rgba(212,175,55,0.12)';"
                onmouseleave="this.style.background='rgba(212,175,55,0.06)';this.style.borderColor='rgba(212,175,55,0.25)';this.style.boxShadow='none';"
                style="align-self:center;display:inline-flex;align-items:center;gap:12px;background:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.25);border-radius:50px;padding:13px 30px;color:var(--gold);font-family:'Cinzel',serif;font-size:0.7rem;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all 0.35s;white-space:nowrap;">

                    Accéder au Concierge <span style="opacity:0.6;font-size:0.9rem;">→</span>
                </div>
            </div>
        </div>
    </div>
</div>


`;
    // --- BLOC ANIMATION SCROLL ---
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });

}

// Définir la date actuelle pour la démo
// En production, vous utiliseriez 'new Date();'
const dateActuelle = new Date(); 

// --- BASE DE DONNÉES COMPLÈTE DES ÉVÉNEMENTS ---
const donneesEvenements = [
// --- JEUDI 28 MAI 2026 ---
    { date: '2026-05-28', jour: 'JEU.', ville: 'LA', artiste: 'TEEGRIZZLEY', details: 'Tee\'s Coney Island (Detroit Storytelling Rap - $90)' },
    { date: '2026-05-28', jour: 'JEU.', ville: 'MIAMI', artiste: 'CHIEF KEEF', details: 'Almighty So 2 (Chiraq Drill Legend - Accès restreint)' },
    { date: '2026-05-28', jour: 'JEU.', ville: 'NYC', artiste: 'LITTLE SIMZ', details: 'No Thank You Live (Lyrical Masterclass - $90)' },
    { date: '2026-05-28', jour: 'JEU.', ville: 'SF', artiste: 'SAMMY VIRJI', details: 'Find My Way Home (UK Garage / Bassline - $90)' },

    // --- VENDREDI 29 MAI 2026 ---
    { date: '2026-05-29', jour: 'VEN.', ville: 'LA', artiste: 'COCO JONES', details: 'What I Know Live (R&B/Soul Premium Sensation - Accès restreint)' },
    { date: '2026-05-29', jour: 'VEN.', ville: 'MIAMI', artiste: 'YOUNG NUDY', details: 'Gumbo Tour (Atlanta Slime Trap - Accès restreint)' },
    { date: '2026-05-29', jour: 'VEN.', ville: 'NYC', artiste: 'LOYLE CARNER', details: 'Hugo Experience (UK Conscious Rap - Accès sur liste VIP uniquement)' },
    { date: '2026-05-29', jour: 'VEN.', ville: 'SF', artiste: 'I HATE MODELS', details: 'Disco Inferno Set (Industrial Hard Techno - $90)' },

    // --- SAMEDI 30 MAI 2026 ---
    { date: '2026-05-30', jour: 'SAM.', ville: 'LA', artiste: 'DAVE', details: 'We\'re All Alone In This Together (UK Rap Star - Accès sur liste VIP uniquement)' },
    { date: '2026-05-30', jour: 'SAM.', ville: 'MIAMI', artiste: 'TIKTOK SENSATION SOUR', details: 'Global Beats Showcase (International Sound - $90)' },
    { date: '2026-05-30', jour: 'SAM.', ville: 'NYC', artiste: 'AMÉ', details: 'Innervisions Special (Deep Melodic Techno - Accès restreint)' },
    { date: '2026-05-30', jour: 'SAM.', ville: 'SF', artiste: 'BOU', details: 'Gossip Live (UK Drum & Bass Night - Accès sur liste VIP uniquement)' },

    // --- DIMANCHE 31 MAI 2026 ---
    { date: '2026-05-31', jour: 'DIM.', ville: 'LA', artiste: 'WESTSIDE BOOGIE', details: 'More Black Superhero (Shady Records Rap - $90)' },
    { date: '2026-05-31', jour: 'DIM.', ville: 'MIAMI', artiste: 'FRANCO ESCAMILLA', details: 'Special Guest Night (Stand-Up & Music Crossover - Accès restreint)' },
    { date: '2026-05-31', jour: 'DIM.', ville: 'NYC', artiste: 'KENNY BEATS', details: 'Louie & Friends (Producer DJ Set - $90)' },
    { date: '2026-05-31', jour: 'DIM.', ville: 'SF', artiste: 'SKREAM', details: '140 Dubstep Classics Set (UK Underground - $90)' }
];


// Index du jour affiché (0 = premier jour dispo)
let indexJourActuel = 0;
let datesDisponibles = [];

function mettreAJourWidget() {
    datesDisponibles = [...new Set(donneesEvenements.map(e => e.date))].sort();
    
    const heureMiami = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
    const dateActuelleEnMillis = heureMiami.setHours(0, 0, 0, 0);

    // Trouver l'index du premier jour à venir
    indexJourActuel = 0;
    for (let i = 0; i < datesDisponibles.length; i++) {
        const dateEvenement = new Date(datesDisponibles[i] + 'T00:00:00');
        if (dateEvenement.getTime() >= dateActuelleEnMillis) {
            indexJourActuel = i;
            break;
        }
    }

    afficherJour(indexJourActuel);
}

function afficherJour(index) {
    const listeElement = document.getElementById('evenement-liste');
    const titreElement = document.getElementById('widget-title');

    if (!datesDisponibles.length) {
        titreElement.textContent = "PAS D'ÉVÉNEMENTS À VENIR";
        listeElement.innerHTML = '';
        return;
    }

    const dateStr = datesDisponibles[index];
    const evenementsDuJour = donneesEvenements.filter(e => e.date === dateStr);
    const jourAffichage = evenementsDuJour[0].jour;
    const dateAffichage = new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long'
    });

    const peutAllerGauche = index > 0;
    const peutAllerDroite = index < datesDisponibles.length - 1;

titreElement.innerHTML = `
    <span onclick="${peutAllerGauche ? `naviguerJour(${index - 1})` : ''}" style="
        cursor:${peutAllerGauche ? 'pointer' : 'default'};
        opacity:${peutAllerGauche ? '1' : '0.2'};
        font-size:1.1rem;
        padding: 0 12px;
        color: var(--gold);
    ">‹</span>
    ${jourAffichage.substring(0,3).toUpperCase()}. ${dateAffichage.toUpperCase()}
    <span onclick="${peutAllerDroite ? `naviguerJour(${index + 1})` : ''}" style="
        cursor:${peutAllerDroite ? 'pointer' : 'default'};
        opacity:${peutAllerDroite ? '1' : '0.2'};
        font-size:1.1rem;
        padding: 0 12px;
        color: var(--gold);
    ">›</span>
`;


    listeElement.innerHTML = '';
    evenementsDuJour.forEach(evenement => {
        const item = document.createElement('div');
        item.classList.add('evenement-item');
        item.innerHTML = `
            <div class="evenement-ville">${evenement.ville}</div>
            <strong onclick="afficherDetailsArtiste('${evenement.artiste}', '${evenement.ville}', '${evenement.details}')" style="cursor:pointer;text-decoration:underline;text-decoration-color:var(--couleur-accent-cyan);">${evenement.artiste}</strong>
            <div class="evenement-details">${evenement.details}</div>
        `;
        listeElement.appendChild(item);
    });
}

function naviguerJour(index) {
    indexJourActuel = index;
    afficherJour(index);
}

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
    let naissance = "—";
    let activite = "Actif";
    let label = "Indépendant";

    try {
            // ============================================================
        // WIKIPEDIA LOOKUP — ULTRA SECURE v6 (Bradford Edition)
        // ============================================================

        const ARTIST_KEYWORDS = [
            "musicien", "chanteur", "chanteuse", "rappeur", "rappeuse",
            "DJ", "disc jockey", "producteur", "artiste", "groupe musical",
            "band", "singer", "rapper", "musician", "producer", "artist",
            "hip-hop", "r&b", "electronic", "pop", "jazz", "soul", "reggae",
            "dancehall", "afrobeats", "trap", "drill", "house", "techno",
            "record", "album", "single", "label", "tour", "concert",
            "songwriter", "compositeur", "interprète", "beatmaker"
        ];

        const BLACKLIST_KEYWORDS = [
            "film", "série télévisée", "roman", "livre",
            "sportif", "footballeur", "politicien", "homme politique",
            "personnage fictif", "télévision", "movie",
            "politician", "football", "basketball", "wrestler",
            "circonscription", "commune", "village", "rivière", "montagne",
            "oiseau", "animal", "espèce", "plante", "bird", "species"
        ];

        // Nettoyage du nom pour gérer $, chiffres, caractères spéciaux
        function normalizeArtistName(name) {
            return name
                .replace(/\$/g, 's')
                .replace(/[@!]/g, '')
                .trim();
        }

        function scoreCandidat(title, description, extract) {
            let score = 0;
            const corpus = (title + " " + description + " " + extract).toLowerCase();
            const artistLower = artiste.toLowerCase();
            const artistNorm = normalizeArtistName(artistLower);

            // 🏆 Titre exact
            if (title.toLowerCase() === artistLower || title.toLowerCase() === artistNorm) score += 60;
            else if (title.toLowerCase().includes(artistLower) || title.toLowerCase().includes(artistNorm)) score += 35;

            // 🔴 Nom absent de l'extrait = suspect
            const nameInExtract = extract.toLowerCase().includes(artistLower) || 
                                  extract.toLowerCase().includes(artistNorm);
            if (!nameInExtract) score -= 40;

            // ✅ Keywords musicaux
            for (const kw of ARTIST_KEYWORDS) {
                if (corpus.includes(kw.toLowerCase())) score += 12;
            }

            // ❌ Blacklist légère
            for (const bad of BLACKLIST_KEYWORDS) {
                if (corpus.includes(bad.toLowerCase())) score -= 8;
            }

            // ❌ Titres parasites
            const titleLower = title.toLowerCase();
            if (titleLower.includes("discography") || titleLower.includes("discographie")) score -= 30;
            if (titleLower.includes("filmography")) score -= 30;
            // "tour" et "album" retirés du malus titre car trop agressifs

            // 🎯 BONUS : description courte et directe = bonne page principale
            if (description && description.length < 80) score += 10;

            // 🎯 BONUS : Wikipedia catégorise directement comme artiste
            const directCategories = ["rapper", "singer", "musician", "dj", "producer", 
                                       "rappeur", "chanteur", "musicien", "artiste"];
            for (const cat of directCategories) {
                if ((description || "").toLowerCase().startsWith(cat)) score += 25;
            }

            return score;
        }

        async function searchWiki(lang, query, limit = 5) {
            try {
                const res = await fetch(
                    `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=${limit}&format=json&origin=*`
                );
                const json = await res.json();
                return json?.query?.search || [];
            } catch { return []; }
        }

        async function fetchSummary(lang, title) {
            try {
                const res = await fetch(
                    `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
                );
                if (res.ok) return await res.json();

                const otherLang = lang === "fr" ? "en" : "fr";
                const res2 = await fetch(
                    `https://${otherLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
                );
                if (res2.ok) return await res2.json();
                return null;
            } catch { return null; }
        }

        const artisteNormalise = normalizeArtistName(artiste);

        const strategies = [
            // Nom exact + musician EN (meilleur signal)
            { lang: "en", query: `${artiste} musician` },
            { lang: "en", query: `${artiste} rapper singer DJ artist` },
            // Nom normalisé si caractères spéciaux
            { lang: "en", query: `${artisteNormalise} musician` },
            // FR
            { lang: "fr", query: `${artiste} musicien` },
            { lang: "fr", query: `${artiste} chanteur rappeur DJ` },
            // Fallback nom seul
            { lang: "en", query: artiste },
            { lang: "fr", query: artiste },
            // Fallback nom normalisé seul
            { lang: "en", query: artisteNormalise },
        ];

        let bestScore = -Infinity;
        let bestData = null;

        for (const strategy of strategies) {
            const results = await searchWiki(strategy.lang, strategy.query, 5);

            for (const result of results) {
                const summary = await fetchSummary(strategy.lang, result.title);
                if (!summary) continue;

                const score = scoreCandidat(
                    summary.title || result.title,
                    summary.description || "",
                    summary.extract || ""
                );

                if (score > bestScore) {
                    bestScore = score;
                    bestData = summary;
                }
            }

            // Seuil de confiance élevé atteint = stop
            if (bestScore > 50) break;
        }

        if (bestData && bestScore > 15) {
            bioWiki = bestData.extract || "Biographie non disponible.";
            genreWiki = bestData.description || "Artiste";

            const dateMatch = bioWiki.match(/\b(19|20)\d{2}\b/);
            if (dateMatch) activite = `Depuis ${dateMatch[0]}`;
        } else {
            bioWiki = `Rejoignez-nous pour une performance exclusive de ${artiste} au Bradford.`;
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
    const bradfordNav = document.getElementById('bradford-nav-section');
if (bradfordNav) bradfordNav.style.display = 'none';
const spacers = document.querySelectorAll('#app-content');
if (spacers[1]) spacers[1].style.display = 'block';

    
    appContent.style.display = 'none';
    if (evenementWidget) evenementWidget.style.display = 'none'; 

  
    
detailPage.style.display = 'block';
detailPage.style.pointerEvents = 'auto'; 


// On calcule des données cohérentes
const dateDuJour = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });

detailPage.innerHTML = `
    <div class="luxury-wiki-container">
        <nav class="wiki-top-bar">
            <div class="wiki-back-btn" onclick="retourAccueil()">
                <span class="back-icon">✕</span>
            </div>
         <div class="wiki-header-simple">
    <div class="wiki-brand-title">BRADFORD</div>
    <div class="wiki-brand-subtitle">Season 2026</div>
</div>
        </nav>

        <div class="wiki-main-layout">
            
            <header class="wiki-header-section">
                <h1 class="artist-name-display">${artiste}</h1>
                <div class="artist-essential-meta">
                    <span class="meta-badge">${genreWiki}</span>
                    <span class="meta-separator">•</span>
                    <span class="meta-badge">${ville}</span>
                </div>
            </header>

                   <aside class="wiki-infocard">
                <div class="infocard-media">
                    <div class="bradford-seal">B</div>
                </div>
                
                <div class="infocard-content">
                    <div class="infocard-group">
                        <div class="infocard-row">
                            <span class="label">Artiste</span>
                            <span class="val">${artiste}</span>
                        </div>
                        <div class="infocard-row">
                            <span class="label">Genre</span>
                            <span class="val">${genreWiki}</span>
                        </div>
                        <div class="infocard-row">
                            <span class="label">Lieu</span>
                            <span class="val">${ville}</span>
                        </div>
                    </div>

                    <div class="infocard-group" style="border-top: 0.5px solid #1a1a1a; padding-top: 15px;">
                        <div class="infocard-row">
                            <span class="label">Activité</span>
                            <span class="val">${activite}</span>
                        </div>
                        <div class="infocard-row">
                            <span class="label">Label</span>
                            <span class="val">${label}</span>
                        </div>
                        <div class="infocard-row">
                            <span class="label">Management</span>
                            <span class="val">Official / Bradford</span>
                        </div>
                     
                    </div>

                    <div class="infocard-group gold-group">
                        <div class="infocard-row">
                            <span class="label">Statut</span>
                            <span class="val accent-gold">CONFIRMÉ</span>
                        </div>
                        <div class="infocard-row">
                            <span class="label">Admission</span>
                            <span class="val accent-gold">${prixTrouve}</span>
                        </div>
                    </div>
                </div>
            </aside>


            <main class="wiki-article-body">
                <section class="wiki-text-section">
                    <h2 class="section-heading">L'ÉVÉNEMENT</h2>
                    <p class="wiki-main-text">${details}</p>
                </section>

                <section class="wiki-text-section">
                    <h2 class="section-heading">L'ARTISTE</h2>
                    <p class="wiki-main-text">${bioWiki}</p>
                </section>


        <div id="dynamic-analysis-zone"></div>

    </main>


     
            <footer class="wiki-action-footer">
                <div class="footer-divider"></div>
                <p class="footer-disclaimer">SÉLECTION 2026 | BRADFORD COMMITTEE</p>
                <button class="booking-cta" onclick="allerReservations()">
                    RÉSERVER VOTRE TABLE VIP
                </button>
                <div class="verification-stamp">PROPERTY OF THE BRADFORD COMMIT: VERIFICATION ID: B- ${Math.random().toString(36).substring(7).toUpperCase()}</div>
            </footer>
        </div>
    </div>
`;

// On lance la recherche d'une section riche (Style ou Carrière) sans bloquer
fetch(`https://fr.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(nomFormate)}`)
    .then(res => res.json())
    .then(data => {
        // On cherche si une section intéressante existe
        const section = data.remaining.sections.find(s => 
            s.line.includes("Style") || s.line.includes("Influence") || s.line.includes("Carrière")
        );

        if (section) {
            // On nettoie le HTML pour n'avoir que le texte pur
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = section.text;
            const cleanText = tempDiv.textContent || tempDiv.innerText || "";
            
            // On injecte le bloc III seulement si on a de la vraie matière
            document.getElementById('dynamic-analysis-zone').innerHTML = `
                <section class="wiki-text-section" style="animation: fadeIn 0.8s ease-out;">
                    <h2 class="section-heading">III. RÉPERTOIRE & ANALYSE</h2>
                    <p class="wiki-main-text">${cleanText.substring(0, 450)}...</p>
                </section>
            `;
        }
    })
    .catch(err => console.log("Analyse indisponible, on reste sur l'essentiel."));

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
    const bradfordNav = document.getElementById('bradford-nav-section');
if (bradfordNav) bradfordNav.style.display = 'block';
const spacers = document.querySelectorAll('#app-content');
if (spacers[1]) spacers[1].style.display = 'none';


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
                    <div><span style="opacity:0.6;">GUESTS:</span> <br> <strong>${guests} PERSONNES</strong></div>
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
            <h2 style="font-family:'Cinzel'; color:var(--gold); margin-top:30px; letter-spacing:5px;">AUTHENTICATION...</h2>
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
                 <h1 style="font-family:'Cinzel'; color:var(--gold); margin:0; font-size:2.2rem !important; letter-spacing:5px;">BRADFORD</h1>
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
            <div class="addon-card-refined reveal" id="item-${item.id}">
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
        // --- BLOC ANIMATION SCROLL ---
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        prestigeCart.forEach(item => {
    const card = document.getElementById(`item-${item.id}`);
    if (card) card.classList.add('is-selected');
});

const total = prestigeCart.reduce((s, a) => s + a.price, 0);
document.getElementById('live-total').innerText = `$${total.toLocaleString()}`;
const btn = document.getElementById('main-validate-cta');
btn.disabled = total === 0;
btn.style.opacity = total === 0 ? "0.3" : "1";

    });
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
    closePolicyMenu();
    window.scrollTo(0, 0); 

    if (page === 'entry_policy') {
        renderEntryPolicy(); 
    } 
    else if (page === 'vip_policy') {
        renderVIPPolicy(); 
    }
    else if (page === 'bottle_service_req') {
        renderBottleRequirements(); // Ajout de la nouvelle page Bottle Service
    }
        else if (page === 'house_rules') {
        renderHouseRules(); // Ajout de la nouvelle page Bottle Service
    }
    else {
        // Pour les pages restantes (House Rules, Dress Code, etc.)
        navigate(page); 
    }
}

const B_ENGINE = {
    lex: {
      usernames: ["darknight92", "misterpauvre", "cryptobro2026", "sarahjls", "lebranleur", 
    "antisocialsocialclub", "user9928374", "kevinthegoat", "richkidproblems", "jeanmi la fete",
    "vroomvroom valet", "dark sasuke", "lil tequila", "madame lucie", "jason the don", 
    "bobylapointe", "anonymous user", "fckthetaxman", "zizou du 93", "emmavibe", 
    "therealshady", "monsieurlemaire", "badtripbilly", "lafouine officiel", "shutup n dance",
    "leroidunord", "dydylafamine", "princess cocktail", "alexcryptoadvisor", "momolasaumure",
    "bigpapi4k", "luxuryjunkie", "lemecaufond", "julien brussels", "lostmyphoneagain",
    "kikilafete", "benjivp", "tontonflingueur", "nathanthepro", "fat tony", 
    "lecheikhduparking", "yanistheplug", "marinadiamond", "tonymontana", "nocapbro",
    "serge lemythos", "lucas lambo", "claratechno queen", "papilevrai", "jeaneude finance",
    "thebassface", "misterbling", "sofianightlife", "enzofullgas", "lepetitprinceduvip",
    "grossemoula92", "shadow dj", "theonlyone", "labaronnedubradford", "felipecash",
    "marcelpatulacci", "kekelevrai", "technoshaman", "richordietrying", "valetpro",
    "louisvjunkie", "mistercashflow", "lepoetedumoshpit", "hugotheboss", "tessvibe",
    "lefouduvolant", "samlepompier", "cryptoczar88", "lealastar", "misteracid",
    "lebranleurofficiel", "samylamalice", "therealbaron", "donpedro66", "chloeluxe",
    "pabloescobar", "levigilesympa", "mistertequila", "sophietechno", "alexthelegend",
    "misternobody", "userunkown", "legeniedumal", "misterhype", "thebigbossman",
    "claudelaforce", "djkhaled fan", "pizzalover", "narcissist", "iamwealthy",
    "bobby6pack", "sandrine fete", "pierrotlefix", "kingofvip", "nocturnal animal",
    "fullmoon", "diamondhandz", "broke millionaire", "the architect", "sound addict",
    "bass hunter", "neon demon", "ghost in the club", "walter white", "seb le boss",
    "kylie style", "vince power", "money printer", "just a guest", "bradford regular",
"jordanmoney", "cryptokaleb", "austinvip", "tyler flex", "sarah.nyc", 
    "benny bundles", "brooklyn kid", "mike buckets", "jessica xoxo", "travisscott fan",
    "the real chad", "money making mitch", "ceo brian", "hustle hard kyle", "dylan dreamer",
    "king of queens", "bobby bags", "shane stacks", "claire couture", "vince vegas",
    "justin jet", "luxury liam", "mason millionaire", "noah night", "sophia star",
    "blake ballin", "chase cash", "derek diamond", "logan luxe", "hunter highlife",
    "skyler sky", "parker posh", "riley rich", "tanner top", "cooper cold",
    "miller money", "carter club", "brody boss", "walker wallst", "griffin gold",
    "trent trust", "reagan real", "hayden hype", "dakota drip", "skyler sleek",
    "morgan mint", "cameron cash", "peyton prime", "taylor tech", "jordy jetset",
    "austin aces", "blake bluechip", "casper crypto", "denver don", "easton elite",
    "forbes finn", "hudson high", "jaxson jet", "knox king", "lennon lord",
    "maverick master", "nash official", "otis official", "preston pro", "quinn queen",
    "reed real", "sawyer saint", "tatum vip", "upton ultra", "vance vip",
    "wyatt wealth", "xander x", "yates young", "zion zen", "ace of spades",
    "black card brian", "wall street wolf", "silicon valley kid", "cali vibe", "texas toast",
    "miami heat", "vegas high roller", "chicago chop", "la confidential", "boston boss",
    "seattle sound", "denver drip", "phoenix pharoah", "atlanta ace", "nashville night",
 "elboss", "wassuppppp", "bruh", "noobmaster69", "big d", "fat joe", 
    "yomama", "skibidi rizz", "gigachad", "shadow wizard", "glizzy gobbler",
    "finesser", "scammer get scammed", "lil bro", "main character", "npc energy",
    "ice in my veins", "gucci bucket hat", "fake news", "average enjoyer", "deez nutz",
    "bussin bussin", "sheeesh", "no cap", "fr fr", "ong", "deadass",
    "your girl favorite", "sugar daddy", "poker face", "trollface", "anon",
    "big stepper", "demon mode", "savage", "unhinged", "rat boy", "goblin",
    "the plug", "feds watching", "tax evader", "crypto scammer", "lost soul",
    "druski fan", "ishowspeed", "kai cenat", "mr beast", "t-series",
    "fart", "dumb and dumber", "zero brain cells", "smooth brain", "lovecat",
    "single n ready to mingle", "borat", "super mario", "batman", "joker",
    "homelander", "sigma", "alpha male", "beta male", "the milkman",
    "daddy chill", "bruh moment", "epic fail", "poggers", "omega lol",
    "u mad bro", "get good", "aimbot", "hacker", "vpn user", "john doe",
    "not a bot", "definitely human", "alien", "area 51 survivor", "vamp",
    "whole lotta red", "carti fan", "drake hater", "kanye west", "yeezy",
    "balenciaga", "off white", "supreme", "hypebeast", "reseller",
    "bot user", "verified", "clout chaser", "bad b", "city boy", "city girl",
  "yolo123", "swaglord", "picklerick", "dogewater", "cereal killer", 
    "ben dover", "dixon cyrus", "barry mckockinner", "hugh jass", "mike hawk",
    "fartmaster", "shrek2onblueray", "papi chulo", "hotgirl99", "lonelyboy",
    "gamer guy", "the goat 🐐", "troll 1", "troll 2", "password123",
    "admin", "root", "deleted user", "unknown", "system error",
    "bruh sound effect", "vine thud", "skype call", "discord mod", "reddit mod",
    "keyboard warrior", "internet explorer", "windows 95", "apple fanboy", "android user",
    "broke af", "money tall", "short king", "thick daddy", "papi",
    "mami", "baby cakes", "honey bun", "sugar plum", "poop head",
    "stupid kid", "ipad kid", "fortnite pro", "roblox king", "minecraft god",
    "dream stan", "kpop lover", "anime pfp", "weeb", "otaku",
    "cat dad", "dog mom", "pizza eater", "burger king", "taco bell",
    "mountain dew", "doritos", "gamer girl bath water", "simp", "incel",
    "femcel", "trad wife", "gaslight", "gatekeep", "girlboss",
    "hustle culture", "sigma grindset", "bateman fan", "literally me", "ryan gosling",
    "taxi driver", "fight club", "first rule", "project mayhem", "soap maker",
    "durden", "tuxedo", "suit and tie", "white collar", "blue collar",
    "working class", "unemployed", "job hunter", "linked in pro", "office drone",
    "coffee addict", "monster energy", "redbull wings", "sleep deprived", "zombie",
    "vampire kid", "emo boy", "goth girl", "scene kid", "rawr xd",
    "lofi hip hop", "study girl", "lofi beats", "vaporwave", "aesthetic",
    "glitch art", "corrupted", "error 404", "not found", "offline","josh", "joshua", "josh99", "josh x", "tyler", "tyler k", "tyler2024", 
    "sarah", "sarah j", "sarah.nyc", "mike", "big mike", "mike t", "jessica", 
    "jess", "jess p", "ashley", "ash", "ashley.v", "brandon", "b-ray", 
    "kyle", "kyle w", "kyle.hustle", "justin", "j-tin", "justin b", "austin", 
    "austin tx", "ryan", "ryan g", "ryan.r", "blake", "blake s", "chase", 
    "chase m", "derek", "derek j", "logan", "logan p", "hunter", "hunter x", 
    "parker", "parker.z", "riley", "riley r", "tanner", "tanner b", "cooper", 
    "miller", "miller j", "carter", "carter.v", "brody", "brody m", "walker", 
    "griffin", "trent", "hayden", "dakota", "morgan", "cameron", "cam", 
    "peyton", "taylor", "jordy", "casper", "hudson", "jaxson", "knox", 
    "maverick", "nash", "otis", "preston", "quinn", "reed", "sawyer", 
    "tatum", "vance", "wyatt", "zion", "chad", "giga chad", "brad", 
    "stacy", "becky", "karen", "tiffany", "brittany", "heather", "amber", 
    "megan", "meg", "lauren", "erin", "katie", "cody", "dustin", 
    "shane", "travis", "cory", "shawn", "shane m", "luke", "lucas", 
    "mason", "ethan", "noah", "liam", "jacob", "will", "william", 
    "chris", "christopher", "dan", "daniel", "matt", "matthew", "nick", 
    "nicholas", "sam", "samuel", "alex", "alexander", "ben", "benjamin",
"marco", "giovanni", "luca g", "mateo", "santiago", "diego f", "pablo", "juan",
    "vlad", "dimitri", "ivan b", "nikolai", "sven", "bjorn", "lars", "stefan",
    "ahmed", "ali h", "omar", "youssef", "mustafa", "hamza", "habibi", "zain",
    "akira", "kenji", "yuki", "hiroshi", "sang", "ji-hoon", "wei", "chen",
    "raj", "rohit", "arjun", "priya", "sanjay", "abhishek", "mohamed k", "nour",
    "sergio", "ricardo", "felipe", "tiago", "joao", "bruna", "camila", "valentina",
    "hans", "klaus", "jurgen", "dirk", "pieter", "jan k", "lars", "anders",
    "jean b", "pierre", "antoine", "nicolas", "mathieu", "clara p", "lea", "manon",
    "aleksandr", "pavel", "mikhail", "igor", "boris", "stojan", "dragan", "milos",
    "fatima", "layla", "mariam", "yasmin", "amina", "khadija", "farrah", "hassan",
    "saeed", "abdullah", "tariq", "idris", "malik", "kwame", "kofi", "chinua",
    "sasha", "misha", "anya", "tatiana", "olga", "elena", "svetlana", "natasha",
    "francesco", "alessandro", "paolo", "enrico", "claudio", "stefano", "roberto",
    "miguel m", "javier", "carlos r", "alejandro", "fernando", "pedro s", "hugo v",
    "kim", "lee", "park", "choi", "wong", "tan", "nguyen", "singh",
    "xavier", "jordi", "pau", "marc b", "oscar d", "adrian", "victor g", "ruben",
    "enzo p", "leonardo", "giuseppe", "antonio r", "salvatore", "domenico",
    "tariq", "faisal", "khalid", "rashid", "mansour", "nasser", "hamad", "zayd","igor99", "szymon", "kacper k", "mateusz", "dariusz", "pavel v", "lev", "artyom",
    "nikos", "george gr", "dimitris", "kostas", "yiannis", "stavros", "eleni",
    "magnus", "olav", "sigurd", "freja", "astrid", "eriksson", "niels", "johan s",
    "bastian", "mads", "mikkel", "thor", "odinn", "gunnar", "lukasz",
    "kwesi", "babajide", "olumide", "temitope", "zane", "tunde", "amadi", "obi",
    "chukwudi", "efe", "mensah", "boateng", "nnamdi", "lekos", "femi",
    "hiro", "takumi", "ryo", "daisuke", "sora", "kaito", "haruto", "misaki",
    "min-ho", "seo-jun", "do-yun", "si-woo", "ji-yoon", "hye-jin", "min-ji",
    "aravind", "vicky", "deepak", "animesh", "karthik", "rahul", "arun p",
    "thiago v", "lucas rj", "matheus", "gabriel b", "felipe sp", "rafael x",
    "sergio f", "esteban", "cristian", "matias", "facundo", "gonzalo", "nicolas s",
    "mehmet", "emre", "can", "burak", "ozan", "deniz", "mert", "selin",
    "leila", "soraya", "darius f", "cyrus", "amir h", "reza", "arash", "behzad",
    "lin", "hao", "zheng", "jian", "yu", "qiang", "bo", "xiaolong",
    "nguyen d", "tran", "phamm", "hoang", "vu", "le h", "dang", "bui",
    "anuar", "azamat", "ruslan", "timur", "armann", "serik", "bolat",
    "hugo s", "oscar v", "axel f", "felix k", "elias", "leon b", "noah g",
    "milo", "finley", "arthur h", "oscar w", "archie", "alfie", "freddie",
    "vincenzo", "rocco", "pietro", "gaetano", "pasquale", "mario b", "luigi",
    "jordi b", "pau s", "adria", "lluic", "oriol", "xavi h", "nil", "pol",   "papi chulo 69", "puto amo", "cabronazo", "el barto", "don pablo weed", "chupa cabra",
    "jean michel crapule", "tonton du bled", "moulaga king", "le z de zizou", "wesh mon pote",
    "ivan le terrible", "cyka blyat lover", "vodka connect", "boris the blade", "dimitri bottle",
    "kurwa boy", "polski power 2137", "hassan cehef", "habibi chill", "sheikh ur booty",
    "allah ouakbarbie", "vladimir poutine fan", "kim jong chill", "social credit god",
    "super idol", "bing chilling", "kpop trash", "bts army leader", "sushiboy",
    "hentai enjoyer", "uwu daddy", "senpai noticed me", "baka mitai", "despacito 2",
    "pedro racaille", "gringo loco", "narcos junior", "taco bell survivor", "nacho business",
    "pizza pasta vaffanculo", "mamma mia 🤌", "berlusconi party", "luigi l'arnaque",
    "hans auf der fete", "bratwurst king", "schnitzel lover", "sauerkraut 66",
    "stefan le fragile", "ikea builder", "bjorn to be wild", "viking drunk",
    "british teeth", "oi bruv", "mandem 420", "tea n crumpets", "sir lancelot lol",
    "wallaby dundee", "outback jack", "shrimp on the barbie", "kiwi fkr",
    "nigerian prince", "scam artist", "safari bob", "jungle fever", "voodoo child",
    "ali baba 40 thieves", "sinbad the sailor", "genie in a bottle", "magic carpet rider",
    "fat buddha", "kung fu panda", "shaolin drunk", "ninja turtle", "pokemon master",
    "digimon sucks", "tamagotchi dead", "nokia 3310", "msn messenger", "skyblog star",
    "kevin du 93", "beauf de france", "jacky tuning", "gregory le millionnaire",
    "mister v wannabe", "pnl fanboy", "jul le sang", "guignol", "abruti",
    "clown de service", "village idiot", "local loser", "no life", "touch grass",
    "basement dweller", "neckbeard", "m'lady", "fedora king", "stinky boy",
 "super idol", "bing chilling", "social credit max", "winnie the pooh lol", "egg fried rice",
    "shiba inu boss", "dogecoin killa", "hentai lord", "uwu 4 life", "waifu hunter",
    "senpai noticed me", "baka baka", "naruto run speed", "sasuke emo kid", "ichiraku ramen",
    "goku black", "vegeta pride", "one punch man", "saitama hair", "luffy meat",
    "zoro lost again", "pikachu i choose u", "charizard fire", "pokemon master 69", "nintendo fanboy",
    "sony pony", "samsung king", "kpop trash", "bts army bts", "blackpink blink",
    "gangnam style", "psy op", "kimchi lover", "soju bomb", "sake monster",
    "teriyaki boyz", "tokyo drift", "Initial D fan", "eurobeat intensifies", "fujiwara tofu",
    "godzilla rawr", "kaiju boy", "gundam pilot", "evangelion shinji", "get in the robot",
    "spirited away", "totoro hug", "studio ghibli chill", "miyazaki goat", "akira bike",
    "ghost in the shell", "cyberpunk 2077", "lofi girl", "study beats", "vaporwave japan",
    "neon lights", "harajuku girl", "kawaii desu", "desu ne", "yamete kudasai",
    "onii chan", "daddy chill", "tsundere 101", "yandere psycho", "waifu pillow",
    "body pillow enjoyer", "neckbeard asian", "rice cooker", "soy sauce", "wasabi heat",
    "sushi roll", "miso soup", "dim sum king", "dumpling boy", "bubble tea addict",
    "boba life", "vietnam coffee", "pho king good", "bahn mi master", "pad thai pro",
    "tuk tuk driver", "ladyboy hunter", "bangkok night", "pattaya party", "bali vibe",
    "shaolin monk", "kung fu hustle", "jackie chan fan", "bruce lee water", "ip man",
    "squid game survivor", "player 456", "gganbu", "red light green light", "parasite movie",
    "old boy hammer", "hard boiled", "john woo fan", "chow yun fat", "tony leung","jeffrey epstein", "epstein island guest", "lolita express", "ghislaine.maxwell", "little st james",
    "p diddy official", "puff daddy", "diddy party survivor", "baby oil dealer", "meek mill's daddy",
    "r kelly's lawyer", "i believe i can fly", "the golden shower", "harvey weinstein", "casting couch pro",
    "bill cosby's drink", "pudding pop", "oj simpson's glove", "the juice is loose", "white bronco",
    "kanye 2024", "ye is right", "alex jones fan", "infowars warrior", "lizard person",
    "elon's child", "zuckerberg robot", "bill gates vaccine", "fauci ouchie", "hunter biden's laptop",
    "donald trump real", "make america great", "sleepy joe", "obama's last name", "george bush 911",
    "clinton foundation", "hillary's emails", "monica lewinsky", "blue dress", "prince andrew",
    "royal sweat", "queen elizabeth ghost", "king charles fingers", "illuminati member", "new world order",
    "freemason spy", "rothschild heir", "rockefeller money", "deep state agent", "qanon shaman",
    "free britney", "kanye's medication", "kim k's tape", "ray j's camera", "perez hilton",
    "tmz leaker", "paparazzi hater", "hollywood sacrifice", "adrenochrome addict", "pineal gland",
    "dan schneider's feet", "nickelodeon survivor", "quiet on set", "miramax intern", "subliminal message",
    "mk ultra subject", "area 51 worker", "bob lazar", "joe rogan's dmt", "terrence howard math",
    "tiger king", "carole baskin", "joe exotic", "harambe's revenge", "tupac is alive",
    "elvis in vegas", "marilyn monroe", "jfk's convertible", "lee harvey oswald", "cia operative","jeffrey epstein", "p diddy", "kanye west", "elon musk", "donald trump",
    "bill gates", "ghislaine maxwell", "harvey weinstein", "r kelly", "bill cosby",
    "oj simpson", "hunter biden", "barack obama", "joe biden", "vladimir putin",
    "kim jong un", "andrew tate", "tristan tate", "joe rogan", "alex jones",
    "drake", "kendrick lamar", "travis scott", "asap rocky", "playboi carti",
    "justin bieber", "selena gomez", "taylor swift", "kim kardashian", "kylie jenner",
    "lebron james", "lionel messi", "cristiano ronaldo", "conor mcgregor", "mike tyson",
    "muhammad ali", "tupac shakur", "biggie smalls", "jay z", "beyonce",
    "rihanna", "eminem", "snoop dogg", "dr dre", "50 cent",
    "leonardo dicaprio", "brad pitt", "johnny depp", "tom cruise", "will smith",
    "keanu reeves", "the rock", "arnold schwarzenegger", "sylvester stallone", "bruce lee",
    "michael jackson", "elvis presley", "freddie mercury", "kurt cobain", "marilyn monroe",
    "princess diana", "prince andrew", "king charles", "pope francis", "dalai lama",
    "mark zuckerberg", "jeff bezos", "warren buffett", "steve jobs", "bill clinton",
    "hillary clinton", "george bush", "nicolas sarkozy", "emmanuel macron", "putin",
    "xi jinping", "narendra modi", "boris johnson", "angela merkel", "queen elizabeth",
    "tiger woods", "michael jordan", "kobe bryant", "neymar jr", "kylian mbappe",
    "lewis hamilton", "max verstappen", "floyd mayweather", "dana white", "logan paul",
    "jake paul", "mr beast", "kai cenat", "ishowspeed", "hasbulla",    "john smith", "michael jordan", "chris evans", "david miller", "james wilson",
    "robert davis", "johnny johnson", "william brown", "thomas jones", "kevin garcia",
    "anthony rodriguez", "matthew martinez", "daniel hernandez", "joshua lopez", "ryan gonzalez",
    "brian wilson", "justin anderson", "kevin thomas", "eric taylor", "adam moore",
    "brandon martin", "jackson white", "stephen lee", "andrew thompson", "jordan harris",
    "nathan clark", "sam lewis", "jesse walker", "aaron hall", "scott allen",
    "benjamin king", "henry scott", "jack young", "philip adams", "dennis hill",
    "patrick green", "frank baker", "peter gonzalez", "raymond nelson", "gregory carter",
    "douglas mitchell", "walter perez", "harold roberts", "karl turner", "albert phillips",
    "willie campbell", "arthur parker", "terry evans", "gerald edwards", "keith stewart",
    "lawrence flores", "sean morris", "christian nguyen", "austin murphy", "joe rivera",
    "noah cook", "jerry rogers", "bryan morgan", "billy peterson", "bruce cooper",
    "logan reed", "gabriel bailey", "wayne bell", "alan kelly", "juan howard",
    "louis ward", "randy cox", "howard diaz", "vincent richardson", "russell wood",
    "philip watson", "bobby brooks", "johnny bennett", "shane gray", "louis james",
    "victor reyes", "martin cruz", "bradley hughes", "fred price", "marcus myers",
    "samuel foster", "clarence sanders", "shawn ross", "phillip morales", "todd powell",
    "jorge sullivan", "dustin russell", "derrick ortiz", "dan jenkins", "herman gutierrez",
    "nathaniel perry", "curtis butler", "maurice barnes", "ricky fisher", "marvin henderson",
    "corey coleman", "ronald simmons", "glenn foster", "jeffery bryant", "travis alexander","liam", "noah", "oliver", "james", "elijah", "william", "henry", "lucas",
    "benjamin", "theodore", "mateo", "levi", "sebastian", "daniel", "jack", "wyatt",
    "alexander", "owen", "asher", "samuel", "ethan", "leo", "jackson", "mason",
    "ezra", "john", "hudson", "luca", "aidan", "maverick", "joshua", "kai",
    "gabriel", "christopher", "julian", "isaac", "anthony", "grayson", "charles", "thomas",
    "caleb", "josiah", "christopher", "andrew", "nathan", "miles", "logan", "adrian",
    "stewart", "dominic", "austin", "kevin", "brandon", "justin", "bryan", "jason",
    "robert", "jeff", "brian", "steven", "kyle", "tyler", "aaron", "eric",
    "emma", "olivia", "sophia", "amelia", "isabella", "mia", "evelyn", "harper",
    "luna", "camila", "gianna", "elizabeth", "eleanor", "ella", "mila", "sofia",
    "avery", "scarlett", "abigail", "layla", "chloe", "nora", "hazel", "madison",
    "lily", "grace", "aurora", "penelope", "aria", "zoey", "stella", "willow",
    "victoria", "riley", "emilia", "zoe", "naomi", "hannah", "lucy", "elena",
    "claire", "audrey", "maya", "alice", "skylar", "bella", "sophie", "genevieve",
    "mike", "chris", "alex", "nick", "dan", "matt", "ben", "sam",
    "jake", "will", "tom", "brad", "chad", "karl", "hans", "ivan",
    "pablo", "juan", "ali", "ahmed", "omar", "kenji", "wei", "raj",  "0x2849", "0xFA71", "0x9928", "0xBEEF", "0xDEAD", "0x666", "0x001", "0xALPHA",
    "0xKYLE", "0xVIP", "0xBOSS", "0xGOLD", "0xNULL", "0xROOT", "0xVOID", "0xACE",
    "ID_9928", "ID_0042", "ID_8817", "ID_7761", "ID_4432", "ID_USER", "ID_ADMIN", "ID_GUEST",
    "ID_B492", "ID_X99", "ID_Z01", "ID_K47", "ID_M10", "ID_V88", "ID_L66", "ID_S12",
    "RX-772", "RX-990", "RX-ZERO", "RX-PRIME", "RX-OXY", "RX-ELITE", "RX-DELTA", "RX-4",
    "RX-9", "RX-KING", "RX-VOID", "RX-GHOST", "RX-BLAST", "RX-7", "RX-1", "RX-99",
    "N_482", "N_SMITH", "N_JONES", "N_WALKER", "N_BROWN", "N_MILLER", "N_DAVIS", "N_WILSON",
    "N_88", "N_99", "N_01", "N_VIP", "N_PRO", "N_MASTER", "N_CHIEF", "N_AGENT",
    "M_STACKS", "M_MONEY", "M_MILLS", "M_BAGS", "M_CASH", "M_GOLD", "M_RICH", "M_BOSS",
    "M_992", "M_881", "M_007", "M_443", "M_KING", "M_LORD", "M_VIP", "M_ELITE",
    "VOLT_99", "VOLT_RX", "VOLT_XP", "VOLT_MAX", "VOLT_POWER", "VOLT_STRIKE", "VOLT_Z", "VOLT_X",
    "VOLT_01", "VOLT_CORE", "VOLT_PRIME", "VOLT_NEO", "VOLT_FLASH", "VOLT_UP", "VOLT_HIGH", "VOLT_66",
    "0x420", "0x69", "0x1337", "0xCODE", "0xSECRET", "0xBRADFORD", "0xCLUB", "0xMEMBERS",
    "ID_JACK", "ID_SARAH", "ID_CHRIS", "ID_EMMA", "ID_MIKE", "ID_ALEX", "ID_NICK", "ID_SAM",
    "RX-DRIP", "RX-FLIP", "RX-MOD", "RX-SYSTEM", "RX-FILE", "RX-DATA", "RX-NET", "RX-CORE",
    "N_ALPHA", "N_BETA", "N_GAMMA", "N_SIGMA", "N_OMEGA", "N_ZETA", "N_THETA", "N_PHI",
    "M_HUSTLE", "M_GRIND", "M_DEAL", "M_TRADE", "M_STOCK", "M_CRYPTO", "M_WALLST", "M_CEO",
    "VOLT_WAVE", "VOLT_SURGE", "VOLT_AMPS", "VOLT_BOLT", "VOLT_STATIC", "VOLT_SPARK", "VOLT_ENERGY", "VOLT_FULL","0x992B", "0x1337", "0xDEADBEEF", "0x777X", "0xALPHA_01", "0xROOT_USR", "0xVOID_9", "0xNULL_ID",
    "0x6969", "0x420X", "0xGOLD_88", "0xACE_HIGH", "0xSECRET_99", "0xPRIVATE", "0xOWNER", "0xADMIN_X",
    "ID_48291", "ID_0001", "ID_USER_44", "ID_MEMBER_99", "ID_GUEST_01", "ID_STAFF_X", "ID_B00S", "ID_X_V8",
    "ID_NOMAD", "ID_GHOST", "ID_PHANTOM", "ID_ECHO", "ID_ZULU", "ID_KILO", "ID_TANGO", "ID_VICTOR",
    "RX-992", "RX-MOD_7", "RX-UNIT_1", "RX-Z_CORE", "RX-BATT_X", "RX-PRIME_0", "RX-ALPHA", "RX-OMEGA",
    "RX-STRIKE", "RX-FORCE", "RX-VENOM", "RX-VIPER", "RX-RAVEN", "RX-BLADE", "RX-SHADOW", "RX-GHOST",
    "N_00283", "N_99182", "N_SERIES_X", "N_TYPE_Z", "N_PROTO_01", "N_FINAL_V", "N_MASTER", "N_CHIEF",
    "N_OPERATOR", "N_AGENT_00", "N_SQUAD_X", "N_ELITE_9", "N_COMMANDER", "N_GENERAL", "N_MAJOR", "N_PILOT",
    "M_9281", "M_CASH_88", "M_BAGS_01", "M_RICH_VIP", "M_BOSS_99", "M_KING_7", "M_LORD_X", "M_MINT_1",
    "M_TRADE_V", "M_COIN_0", "M_BLOCK_Z", "M_CHAIN_9", "M_CRYPTO_X", "M_DEAL_V", "M_STACKS", "M_MILLS",
    "VOLT_992", "VOLT_X1", "VOLT_Z2", "VOLT_MAX_P", "VOLT_STRIKE", "VOLT_CORE_9", "VOLT_PRIME", "VOLT_UP",
    "VOLT_SYSTEM", "VOLT_MOD", "VOLT_AMP", "VOLT_WATT", "VOLT_JOULE", "VOLT_GRID", "VOLT_CELL", "VOLT_BAT",
    "UNIT_88", "UNIT_99", "UNIT_B4", "UNIT_X9", "SYS_01", "SYS_ERR", "SYS_ROOT", "SYS_ADMIN",
    "X_429", "X_881", "X_772", "X_001", "Z_99", "Z_CORE", "Z_NODE", "Z_LINK",
    "DATA_01", "DATA_X", "DATA_VOID", "DATA_NULL", "LINK_99", "LINK_UP", "LINK_DOWN", "LINK_OFF",
    "CORE_X", "CORE_Z", "CORE_9", "CORE_0", "NET_X", "NET_WORK", "NET_VIP", "NET_BOSS",  "Baron", "Sheikh", "Lord", "Don", "Saint", "Vip", "Elite", "Pro", "Agent", "Sir", 
    "Excellency", "Master", "The", "Real", "Official", "Crypto", "Czar", "Archduke",
    "Senator", "Governor", "Captain", "Major", "Colonel", "General", "Chief", "Boss",
    "King", "Duke", "Prince", "Champ", "Coach", "Doctor", "Professor", "Judge", "Chairman",
    "CEO", "Director", "Founder", "President", "Executive", "Ambassador", "Sheikh",
    "Sultan", "Pharaoh", "Godfather", "Highness", "Majesty", "VIP Guest", "Black Card",
    "Whale", "Shark", "Wolf", "Alpha", "Omega", "Prime", "Legacy", "Legend", "Icon",
    "Don", "Donnie", "Big", "Young", "Lil", "Money", "Cash", "Gold", "Diamond", "Platinum",
    "Global", "International", "Universal", "Apex", "Zenith", "Summit", "Mastermind",
    "Architect", "Oracle", "Sentinel", "Guardian", "Warden", "Overlord", "Commander"],


        narratives: [    "I remember when the Bradford was just a basement. Now I'm spending 40k on a Tuesday.",
    "The manager recognized my shoes and skipped the 500 person line. That's power.",
    "I saw a guy lose his Rolex in the moshpit and he didn't even care, he just ordered another bottle of Ace of Spades.",
    "Security tried to talk to me about my behavior but then they saw my black card and apologized. Pure gold.",
    "The bass frequency was so low I could feel my teeth vibrating. I think I met God near the subwoofers.",
    "Ordered the 5-liter Belvedere and it came out with 10 girls and enough sparklers to start a forest fire.",
    "Waitress spilled a drop of Gin on my hand-made Italian leather loafers. I should have sued but the music was too good.",
    "Met a girl from Dubai who said this place is better than the Burj Al Arab rooftop. Facts.",
    "The line outside is a graveyard of dreams. Inside, it's a paradise of excess.",
    "Incredible. The lasers literally felt like they were cutting through my soul. 10/10 energy.",
    "90$ for water? Who cares. When you're in the elite hub, money is just paper.",
    "I saw a producer from LA crying in the VIP section because the drop was too beautiful.",
    "The bathroom mirrors have better lighting than most professional studios. I looked like a billion dollars.",
    "A guy at the bar tried to buy my table for 10k cash. I told him to double it or keep walking.",
    "The transition between the house set and the techno finale literally rewired my brain.",
    "You don't come here to party, you come here to ascend. The scent of expensive perfume and fog machines is addictive.",
    "Saw three NBA players in the back corner just chilling. Nobody bothered them. That's the vibe here.",
    "My ears are still ringing but my heart is full. The sound system is a biological weapon.",
    "The entrance fee is a filter. It keeps the energy pure and the crowd elite.",
    "Actually felt like I was in a movie. The way the lights hit the crystal glasses is cinematic.",
   "The waitlist for a table was three months, but one call from my concierge and we were center stage. Unmatched.",
    "Saw a tech mogul buying a round of 30 Don Julio 1942 shots for the entire front row. The energy was feral.",
    "The scent in the air—expensive oud mixed with high-end fog—is basically the smell of success. I’m addicted.",
    "Every time the CO2 cannons hit, it felt like a reset for my soul. Best sound engineering in the country, period.",
    "You know you’re in the right place when the bathroom attendant is wearing a watch that costs more than your car.",
    "The light show isn't just flashes; it's a choreographed masterpiece. I felt like I was inside a supernova.",
    "A billionaire from Monaco told me the Bradford is the only place that actually gets the 'European Summer' vibe right.",
    "Spent my entire bonus in four hours and I’d do it again next Tuesday without blinking. Pure adrenaline.",
    "The way the security team handles the crowd is surgical. They keep the trash out and the royalty in.",
    "I've been to Berghain, I've been to Hi Ibiza, but the Bradford's intimacy makes it feel like a private cult for the rich.",
    "The DJ didn't just play music; he conducted a ritual. The drop at 3 AM literally made the glasses on our table shatter.",
    "Met a group of models who flew in from Milan just for the closing set. This isn't a club, it's a destination.",
    "The VIP host knew my name, my drink, and my favorite table before I even pulled out my ID. That is service.",
    "I watched the sunrise from the valet stand and realized I haven't checked my phone once in six hours. Total immersion.",
    "The bass is tuned so perfectly you don't hear it with your ears, you hear it with your bones. Engineering at its finest.",
    "Saw a guy tip the waitress a stack of hundreds just for bringing extra napkins. The levels here are just different.",
    "There’s a specific moment when the lasers hit the disco ball and the whole room turns into a diamond. Magical.",
    "If you're not at a table, you're just a spectator. If you are, you're the main character of the city.",
    "The acoustics are so sharp I could hear the champagne bubbles popping over the 120-decibel techno set.",
    "Ordered the 'Legacy' platter and the parade of sparklers was so long it felt like a national holiday.",
    "They don't let just anyone in, and thank God for that. The crowd is curated like a high-end art gallery.",
    "I think I left a piece of my sanity on the dancefloor, but I found a new sense of purpose in the VIP lounge.",
    "The golden walls aren't just decor; they’re a statement. You’re either part of the Bradford legacy or you're watching from the street.",
    "Witnessed a secret set by a Grammy winner at 4 AM. No cameras, no phones, just pure, unadulterated talent.",
    "The ice in the buckets is clearer than my future. It’s the small details that justify the four-figure bill.",
    "I’ve never felt more alive and more broke at the same time. The Bradford is a beautiful, expensive drug.",
    "Security took one look at my belt and let me skip the two-hour line. Dress code is a weapon here.",
    "The dancefloor is a mosh pit of designers, influencers, and old money. A beautiful, chaotic ecosystem.",
    "I forgot who I was for a few hours. When the music is that loud and the drinks are that cold, nothing else matters.",
    "The elevator ride down felt like leaving another planet. Reality is so boring compared to this place.",
    "I saw a woman lose a diamond earring worth 50k and she didn't even stop dancing. That’s the Bradford energy.",
    "3am. Bass is insane. Bradford literally owns the city tonight. No cap.",
    "Best set I’ve heard since Tulum 2022. The soundstage depth is just filthy.",
    "Spent 5k on bottles and the manager still made me wait 2 mins for a table. Respect the hustle tbh.",
    "Losing my mind near the CO2 jets. It’s like a digital heaven in here.",
    "Saw a dude buying 10 bottles of Ace of Spades just to spray them. Absolute madness. Wealth is a joke here.",
    "Security is TIGHT but fair. Keeps the vibe 100% elite. worth the 90$ entry fee just for the peace of mind.",
    "The way the lasers cut through the smoke... feels like being inside a motherboard. High tech, high energy.",
    "VIP host Sarah is a legend. Handled our group of 15 like a pro. Best service in the state.",
    "My ears r ringing but the memories r worth it. Bradford 4 life.",
    "I've seen it all, but the 4am crowd here is something else. Pure main character energy in every corner.",
    "Tbh I came for the music but stayed for the people-watching. The amount of crypto-wealth in this room is scary.",
    "Floor is vibrating so hard I can't even hold my drink straight. 10/10 acoustics.",
    "The lighting rig alone probably costs more than my house. Cinematic af.",
    "Shoutout to the bar staff for being fast even when it’s wall-to-wall people. Professionalism at its peak.",
    "Forgot my jacket at the coat check and they actually couriered it to my hotel the next day. Top tier.",
    "Came with a black card, left with a story. This place is a portal to another dimension.",
    "Met a producer from Berlin who said this sound system is better than Berghain. Bold claim, but I see it.",
    "The bathroom lighting makes everyone look like a supermodel. Pure sorcery.",
    "One word: ELECTRIC. If u haven't been to a Tuesday session u haven't lived.",
    "Dropped my Rolex in the crowd and someone actually handed it back. Classy crowd only.",
    "It’s not a club, it’s an ecosystem of excess. And I love every second of it.",
    "The transition at 2am was so smooth I didn't even realize I'd been dancing for 3 hours straight.",
    "Actually insane. The sheer volume of the sub-bass makes your heart skip beats.",
    "90 bucks for entry is steep until you see the production value. It's a whole show.",
    "Saw a table of 10 influencers all on their phones until the drop hit. Then the whole place erupted. Sick.",
    "The smell of Creed Aventus and dry ice... that's the Bradford signature.",
    "Honestly? Better than Vegas. More intimate, more aggressive, more real.",
    "Bruh. The lasers. I’m dead. 💀🔥",
    "VIP section is basically a secret meeting of the 1%. Wild vibes.",
    "I thought the hype was fake. It’s not. It’s better.",
    "Music so loud I can't hear my own thoughts. Exactly what I needed.",
    "The valet had a line of Lambos like it was a showroom. This is the spot.",
    "Transition from deep house to heavy techno was 🤌. DJ is a surgeon.",
    "If u know, u know. Bradford legacy is real.",
    "Spent a month's rent in one night. No regrets. Zero.",
    "The smoke machine density is perfect. You feel invisible until the strobe hits.",
    "Actually felt like I was in a music video. Everything is so curated.",
    "Most clubs r mid. Bradford is legendary. Period.",
    "Sound quality is 20/10. You can hear every single high note even with the bass crushing you.",
    "Met a girl from Paris who said this is the only 'real' club in the US. Facts.",
    "Waitress was so fast with the refills even though the place was packed. That’s why I pay the premium.",
    "The sub-bass literally feels like a massage for your internal organs. Sick engineering.",
    "Tried to count the sparklers in the VIP section and lost track after 50. This place is a pyro's dream.",
    "Best night of my life, hands down. My bank account is crying but my soul is happy lol.",
    "The way the crowd moves during the peak hour is like a single organism. Pure tribal energy.",
    "Met a guy who flew private from Tokyo just for this weekend. The Bradford reach is global.",
    "Honestly, the bathroom attendant is the real MVP. Kept me looking sharp all night.",
    "If u think the entry is expensive, u probably don't belong inside. The curation is what makes it.",
    "Lasers so sharp they could probably cut diamonds. Visuals are 11/10.",
    "Saw a guy buy a bottle of Hennessy Paradis just to share it with the table next to him. Generosity or flex? Both.",
    "The smoke machines hit at the perfect time every single time. DJ and light tech are in total sync.",
    "Still thinking about that transition at 4 AM. Whoever was on the decks is a genius.",
    "My loafers are ruined from the champagne showers but I don't even care. Legendary night.",
    "The VIP lounge feels like a secret club inside a secret club. The exclusivity is palpable.",
    "Actually insane energy. Never seen a room this big stay this focused on the music.",
    "Shoutout to the security for being professional. No ego, just keeping the vibe right.",
    "The acoustics in the back are just as good as the front. That's how u know they spent money on the build.",
    "Met three different people who all claimed to be 'the' manager. Whoever they are, they’re doing it right.",
    "The scent of the place is so distinct. It smells like money and dry ice. Iconic.",
    "I’ve been to every major club in Vegas and this puts most of them to shame. More soul, more grit.",
    "The light rig above the dancefloor looks like a spaceship landing. Incredible production.",
    "Ordered a cocktail and it was actually balanced. Most clubs just serve sugar and cheap vodka. Not here.",
    "The line was around the block but the VIP entrance was seamless. Worth every penny of the membership.",
    "Saw a celebrity hiding in the corner booth. Even they come here to just blend in and dance.",
    "The bass is so clean you can still talk to the person next to you without screaming. That’s quality.",
    "Every beat drop felt like a punch to the chest in the best way possible. Raw power.",
    "I came for the 'experience' and I got a life memory. Bradford is in a league of its own.",
    "The valet had my car ready before I even stepped out of the door. The service is 360 degrees.",
    "I think I saw God near the speaker stacks at 5 AM. Or maybe it was just the tequila. 10/10 anyway.",
    "The flooring is solid marble. Who does that in a nightclub? The Bradford, apparently. Absolute class.",
    "Came for one drink, stayed for three bottles. This place has a way of making you forget your limits.",
    "The way the sun hits the entrance when you're leaving... it’s like waking up from a dream.",
    "It’s not just a club, it’s a cultural hub for the elite. If u know, u know.",
    "Spent more on ice tonight than I did on my first car. No cap. The Bradford lifestyle is real.",
    "The DJ played a remix of a track that hasn't even been released yet. The connections here are wild.",
    "My ears are ringing but I’d go back tonight if I could. True addiction.",
    "The coat check was so organized, even at 6 AM. Most places are a disaster by then.",
    "Saw a guy tip the DJ with a crypto wallet transfer. We are living in the future.",
    "The mirrors in the VIP section are perfectly angled for the ultimate selfie. They thought of everything.",
    "Best. Tuesday. Ever. Who else does it like this on a weeknight?",
    "The smoke machines are so thick you can't see your hand, then the strobe hits and it’s pure electricity.",
    "The cocktail list is better than most high-end bars in Manhattan. Get the signature martini.",
    "Security is firm but they actually listen. Rare to find that balance in nightlife.",
    "The acoustics are so sharp, you can hear the hi-hats like they’re in your head. Pure bliss.",
    "I lost my wallet and the staff found it and kept it safe. Integrity + Luxury. Rare combo.",
    "The bass frequency was so low it was rattling the bottles on the back bar. Intense.",
    "Met a girl who said she’s been every night this week. I totally understand why.",
    "The transition between the warm-up and the headliner was surgical. Pure hype.",
    "Actually felt like the main character for 6 hours straight. This place is a movie.",
    "The lasers literally felt like they were scanning my brain. High-tech madness.",
    "I’ve spent 100k here this year and I regret zero dollars of it. The ROI is the memories.",
    "The Bradford legacy isn't a joke. You feel the history in the walls.",
    "Best sound system on the East Coast. Don't @ me.",
    "The ice cubes have the Bradford logo etched into them. The level of detail is psychotic.",
    "I saw a guy lose his phone and he just bought a new one from the concierge. Peak Bradford.",
    "The energy at 4 AM is actually better than at midnight. That's when the real ones stay.",
    "The bar staff are like chemists. Every pour is perfect.",
    "I forgot what day it was. That’s the sign of a good club.",
    "The velvet ropes aren't just for show. They really do keep the vibe immaculate.",
    "It’s expensive, it’s loud, it’s crowded, and it’s the best thing I’ve ever experienced.",
    "The sub-woofers are bigger than my apartment. Pure sonic violence.",
    "Met my future business partner in the smoking area. Bradford connects the world.",
    "The lighting tech deserves a Grammy. The visuals were perfectly synced to every beat.",
    "I’ve never seen a dancefloor this packed stay this respectful. Good crowd, good vibes.",
    "The champagne was actually cold. Simple thing, but so many clubs fail at it.",
    "The Bradford is the only reason I still live in this city. Period.",
    "I saw a guy tip 1k for a bottle of water. That's the energy we're on tonight.",
    "The bass is so heavy it’s basically a religious experience.",
    "Shoutout to the management for keeping the quality consistent for so long.",
    "I’ll be back next week. And the week after. And the week after that.",
  "OMGGGGGGGGGG BASS IS JUST TOOOOO MUCHHHHHHHH!!!!!! 🔊🔊🔊",
    "i think i lost my mind near the left speaker and i dont even want it backkkkk",
    "BEST. NIGHT. EVER. periodt.",
    "bruhhhh the lasersssssss i cant even see my phone screen rn hshshsksks",
    "Pure madness... spent 4k and i dont even remember on what. Bradford is a trap (a gold one).",
    "Whoever is DJing rn.... marry me. PLS.",
    "JESUS CHRIST THE DROP AT 3AM !!!!!!!",
    "90$ entry for this? worth every single penny. the energy is demonic (in a good way)",
    "Im so faded and this music is literally hugging me. 10/10",
    "Bradford > everything else. no cap. deadass. facts.",
    "soooooooo muchhhh smoke i love it here 💨💨💨",
    "I just saw a guy buy a bottle of Ace and pour it on his shoes... this place is UNREAL.",
    "Security is scary but the girls r beautiful so its fine i guess lol",
    "WWWWWWWWW IN THE CHAT FOR THE BRADFORD !!!",
    "fckkkkkkkk my ears are bleeding and i want moreeee. MORE.",
    "steeze 1000%. vibe 1000%. wallet 0%.",
    "i dont even know where i am but the bass is telling me to stay",
    "Bradford legacy is NOT a myth. its a religious experience at this point.",
    "Toooooo many people but the energy is just... wow.",
    "vibessssssssssssssssssssssssssssssssss",
    "I tried to talk to the bartender and we just stared at each other for 5 mins cuz the music is so loud lmao",
    "legendary. simply legendary. 🏆",
    "Everything is gold. Everything is loud. Everything is perfect.",
    "yooooo the bathroom attendant just gave me a spray of Creed and now i feel like a king again. clutch.",
    "Bradford is the only place where spending 10k feels like a good investment.",
    "siiiiiiiiiiiiiiick night. best one since ibiza.",
    "the co2 jets actually saved my life tonight. so hot in the pit but so worth it.",
    "Waitress was a bit slow but she was gorgeous so i tipped 200. im a simp for the bradford vibes.",
    "If u r not here rn... u r losing at life.",
    "YOOOOOOOOOOOOOOOOOOOOOOOOO",
    "literally vibrating. my phone, my drink, my soul. all vibrating.",
    "i saw a celebrity in the VIP and we made eye contact for 0.5 seconds. i’ve peaked.",
    "it slaps. it slaps so hard. 🔨🔨",
    "honestly?? i might just move into the VIP lounge. rent is probably the same as a bottle anyway.",
    "absolute CINEMA. the lighting rig is a beast.",
    "I came for the techno, I stayed because I literally couldn't find the exit. 10/10 trip.",
    "the line outside was 2 hours... i skipped it with a 50$ bill. life hack.",
    "BRADFORD OR DEATHHHHHHHH",
    "music is so heavy i can feel it in my stomach. filthy bass. love it.",
    "im broke now. but im happy broke. u know?",
    "GOATED. 🐐🔥🐐🔥",
    "i think i met an alien near the subwoofers. we didnt talk but we understood each other.",
    "Insane. just... insane. no other words.",
    "Bradford = Main Character Energy.",
    "woke up with a black card and no memory. sign of a great night at the bradford.",
    "thos lasers r cutting through my soul mannnnnnnnn",
    "10/10. would go bankrupt again. see u next week.",
    "SHEEEEEEEEEESH. the drop was nasty.",
    "I arrived at 11 PM thinking I’d just stay for a drink. Fast forward to 4 AM, I’m at a table with a group from Tokyo, sharing a 6-liter Methuselah of Cristal and discussing how the bass at the Bradford is the only thing that makes us feel alive anymore. My driver waited five hours, but man, that set from the DJ was spiritual.",
    "The night started normally until the manager saw my vintage Chrome Hearts jacket and whispered 'follow me'. He led us through a side door, past the main crowd, into this hidden lounge where the walls were literally vibrating with the cleanest techno I've ever heard. It felt like being in a secret society where the only currency is how hard you can dance.",
    "Okay, so I lost my wallet somewhere between the main bar and the VIP mezzanine. I was panicked for like two seconds until a security guy—huge dude, looked like a commando—tapped my shoulder, handed it back with everything inside, and told me 'Enjoy the legacy, sir.' The class in this place is just on another level.",
    "Met this girl near the lasers who told me she flies from London once a month just for the Bradford Saturdays. I thought she was joking until she showed me her flight log. We spent the next three hours oblivious to the world, just caught in that neon fog. I don't even know her last name, but that was the best night of my life.",
    "I remember when the lasers hit the disco ball at exactly 2:45 AM during the transition. The whole room turned into a kaleidoscope of diamonds and for a second, the music just stopped. Then the drop hit so hard I saw people literally crying in the front row. It wasn't just a party, it was a collective religious experience.",
    "Spent 15k on a table right next to the DJ booth. At one point, he turned around, handed me his headphones, and let me listen to the raw feed for a minute. My brain melted. The production value they put into the Bradford soundscape is something 99% of clubs can't even dream of. Worth every single cent of that bill.",
    "So I’m standing at the bar, and this guy next to me—looks like a regular dude—orders a round of shots for the entire staff. Turns out he’s some crypto whale who’s been living at the Bradford for a week. We ended up talking about the future of the world while the CO2 cannons were blasting every ten minutes. Only at the Bradford.",
    "The line was wrapping around the block, people literally begging the bouncers to get in. I just walked up, showed my black card, and the velvet rope opened like the Red Sea. Inside, the contrast was insane—from the cold rain outside to this golden, humid paradise of pure excess. I felt like I had reached the final boss level of nightlife.",
    "My shirt got completely ruined when a bottle of Ace of Spades was popped a bit too enthusiastically at the next table. The waitress saw it, disappeared for five minutes, and came back with a fresh, designer t-shirt from the club’s private collection. Didn't even charge me. That’s how you handle VIPs.",
    "I honestly thought the stories about the 'Bradford trance' were just marketing hype. But after three hours on that floor, losing track of time, space, and my own name, I get it now. It’s the way the hertz are tuned; it does something to your heart rate. I walked out at 6 AM feeling like a different person.",
    "Last Tuesday was wild. A guy actually tried to buy the table next to us for 20k in cash because he wanted to be closer to the subwoofers. The manager just laughed and told him 'This isn't a market, it's a legacy.' You can't buy your way into everything here, you have to belong.",
    "The valet lost my keys for like ten minutes after the closing set, and I was about to get annoyed. Then he brings my car around, and there’s a bottle of premium water and a 'recovery kit' on the seat with a handwritten note. It's those tiny, elite details that keep me coming back every single week.",
    "I saw a producer I won't name literally weeping during the final track. He said the acoustics in the Bradford were 'too perfect for this world'. We stayed until they turned the house lights on, and even then, nobody wanted to leave. It’s like a magnetic field you can’t escape.",
    "The wait for the bathroom was a bit much, but even the bathroom is a vibe. Met a guy who offered me a job in Dubai while we were washing our hands in those marble sinks. Every corner of this club is a networking goldmine if you’re wearing the right watch.",
    "I was at the bar around 2 AM when the music suddenly shifted into this deep, melodic techno. The entire room went dark except for one single white laser beam cutting through the fog. I looked around and realized everyone—from the models in the VIP to the guys in the moshpit—had their eyes closed, just swaying in unison. It was the most peaceful yet intense moment I’ve ever experienced in a club. The Bradford isn't just a place to drink; it's a mood generator.",
    "My group had a table right by the entrance to the DJ booth. Halfway through the night, a guy in a tailored black suit tapped me on the shoulder and asked if we could share our ice bucket for a second. It was one of the headliners who had just finished his set. We ended up talking for twenty minutes about the acoustics of the room. He told me the Bradford is the only club in the US where he doesn't have to adjust his levels because the room is 'acoustically perfect'.",
    "The rain was pouring outside, and the line looked like a nightmare. I managed to get in through the kitchen entrance thanks to a friend who works the lights. Walking from the cold, greasy smell of the back alley into the sudden explosion of gold leaf, expensive cologne, and 120 decibels of pure bass was like a shot of adrenaline to the heart. I went from shivering to ordering a 400$ bottle of gin in less than sixty seconds. That’s the Bradford magic.",
    "I remember standing on the mezzanine, looking down at the dancefloor when the CO2 cannons went off. For a split second, the entire floor disappeared in a white cloud. When it cleared, the light had changed to this deep, royal purple. The timing was so precise with the beat drop that it felt like the building itself was breathing. I’ve been to Vegas, I've been to London, but nobody handles production with this much surgical precision. It's a high-definition party.",
    "The night got expensive fast. It started with a 'small' table and ended with us sponsoring a parade of Belvedere for the group next to us because they had a birthday. By 4 AM, the entire VIP wing felt like one big private house party. We were all strangers at midnight, but by the time the house lights came on, we were exchanging numbers and planning a trip to Ibiza. The Bradford has this weird way of making elite people actually connect.",
    "So, I’m in the VIP lounge and I see this guy wearing a literal space suit—or something that looked like it. Nobody was staring, nobody was taking photos. That’s what I love about this place; you can be a billionaire or a weirdo (or both) and people just let you vibe. I asked him where he got the suit, and he just handed me a business card that was a thin slab of black titanium. No name, just a QR code. This place is a portal to a different world.",
    "The bass frequency was tuned so low during the closing set that my vision actually started to blur in time with the kicks. I thought I was having a medical issue until I saw the guy next to me laughing and pointing at his own drink—the liquid was forming perfect geometric patterns from the vibrations. It’s not just loud; it’s engineered. It’s like being inside a giant, golden Swiss watch that happens to play world-class techno.",
    "I lost my jacket at the coat check—or so I thought. I was frustrated because it was a custom piece. The lady at the desk stayed ten minutes after her shift ended just to help me look. She eventually found it in the manager’s office; apparently, someone had spilled a drink near it and they had moved it so it wouldn't get stained. They even gave me a voucher for a free bottle of champagne on my next visit for the 'inconvenience'. That is how you treat a legacy member.",
    "There was a guy at the bar trying to flex his wealth by throwing 50s on the floor. The bouncer walked over, picked them all up, handed them back to the guy, and whispered something in his ear. The guy immediately stopped and started acting like a gentleman. The Bradford doesn't just want your money; they want your respect. It’s the only club left with actual standards for how people should behave in a luxury space.",
    "I’ve lived in NY for ten years and I thought I’d seen everything. But seeing the sunrise reflect off the golden Bradford sign while the valet brings around a fleet of Ferraris and Urus is something else. It feels like the end of an era and the start of a new one. You walk out into the morning air feeling like you’ve been through a war, but you’re wearing silk and you smell like 500-dollar perfume. Best. Saturday. Ever.",
    "Actually, the best part wasn't the music or the drinks. It was the 3 AM 'cooldown' in the lounge. They brought out these chilled towels scented with eucalyptus and tiny appetizers that tasted like they came from a Michelin star kitchen. It’s those moments of pure, quiet luxury in the middle of a chaotic techno storm that make the Bradford the elite hub of the city.",
    "Met a group of girls who said they drove six hours just to see the 'Diamond Drop' light show. I thought they were crazy until I saw it myself. When the ceiling rig descends and the lasers hit the crystals, the entire room feels like it’s underwater in a sea of light. I’ve never seen five hundred people go that quiet that fast. It was beautiful. Truly beautiful.",
    "Lost my Chanel earring in the pit at 3 AM. A bouncer found it, cleaned it, and returned it to my VIP table in a velvet pouch. Madness.",
    "The bass was so heavy it actually fixed my heart rate. I felt the music in my bone marrow. Best 4 hours of my life.",
    "Saw a guy buy a 10k bottle just to pour one glass and leave the rest for the table next to him. That’s Bradford energy.",
    "Met a girl from Ibiza who said the sound system here makes the European clubs sound like cheap speakers. I believe her now.",
    "The transition at 2 AM was so smooth I didn't even realize I'd been dancing for three hours straight. Total trance.",
    "Waited 2 hours in the rain, but the second I stepped into that golden hall and heard the drop, I forgot I was even wet.",
    "A guy at the bar tried to buy my watch for double its value just because he 'liked the vibe'. This place is a fever dream.",
    "The CO2 cannons hit so hard I lost my friends for an hour. Best hour of my life, honestly. Just me and the rhythm.",
    "Ordered a martini and the bartender spent 5 minutes perfecting the lemon twist. At 120 decibels, that's real dedication.",
    "I saw a tech CEO crying near the subwoofers because the melody was 'too pure'. The Bradford gets to everyone.",
    "Everything is gold. Even the air smells like expensive leather and success. I never want to leave this bubble.",
    "The valet had five Lambos lined up like a toy store. I felt like a peasant in my Mercedes, but the staff treated me like a king.",
    "Security took my phone because I tried to film the DJ. At first I was mad, then I realized it’s the only way to truly stay in the moment.",
    "My drink was literally vibrating off the table from the sub-bass. It’s not just a club, it’s a physical experience.",
    "Saw a woman in a wedding dress dancing alone in the VIP lounge at 4 AM. No groom, just a bottle of Ace. Legendary.",
    "The lighting rig descended so low I thought the ceiling was falling. Then the lasers turned the room into a diamond.",
    "Spent my entire rent on a Tuesday night. My landlord won't be happy, but my soul is finally at peace.",
    "Met a producer from Berlin who flies here once a month just for the acoustics. He says the room is 'perfectly tuned'.",
    "I walked in a nobody and walked out with three business cards from people who own half the city. Networking at its finest.",
    "The smoke was so thick I felt like I was dancing on a cloud in heaven. Then the red strobes hit and it felt like a sexy hell.",
    "Bathroom mirrors are so flattering I spent 20 minutes just staring at my own glow. The lighting is literal sorcery.",
    "Someone tipped the DJ with a Rolex. No cap. I saw the hand-off. The levels of wealth here are just stupid.",
    "I think I met God near the left speaker stack. He didn't say much, but the bass drop explained everything.",
    "The manager recognized me from two years ago and gave me his private booth. That is what you call a legacy.",
    "Walked out at 6 AM and the city felt so quiet and boring compared to the chaos I just left behind."],

        global: ["FR: Franchement, j'ai fait tous les clubs de Paname, mais le Bradford c'est une autre dimension. Le son te transperce littéralement.",
    "FR: 90 balles l'entrée mais on sait pourquoi on paie. La sécu est archi carrée, pas de relous, que de la bonne vibe.",
    "FR: J'ai pris une douche de Dom Pérignon à 3h du mat, mon brushing est mort mais mon âme est au paradis mdrrr",
    "FR: Incroyable. Les lasers, la fumée, le kick de la basse... j'ai cru que j'allais décoller.",
    "FR: C'est l'élite ou rien. Point final.",
    "FR: Gros big up à l'équipe, on a cassé la démarche toute la nuit sur le dancefloor !!",
    "FR: Le barman m'a servi un cocktail à 150 balles, j'ai même pas sourcillé tellement le service est royal.",
    "FR: Srx le système son est indécent. Mes oreilles sifflent encore mais quel kiff.",
    "FR: On était en VIP à côté d'un footballeur connu, le mec était archi simple, il nous a même payé une tournée. C'est ça le Bradford.",
    "FR: La déco est lunaire. Tout ce qui brille est vraiment de l'or ici j'ai l'impression.",
    "FR: J'ai perdu ma chaussure dans le moshpit à 4h, un bouncer me l'a ramenée sur un plateau en argent. La classe ou pas ?",
    "FR: Wallah c'est trop. Trop de lumières, trop de basses, trop de belles meufs. Je vais faire une syncope.",
    "FR: Le prix des bouteilles c'est un loyer mais bon, on n'a qu'une vie non ?",
    "FR: Ptdr j'ai essayé de draguer la barmaid elle m'a mis un vent atomique mais avec le sourire, j'ai respecté.",
    "FR: La clim est tellement bien réglée que tu peux danser 5h en costume sans transpirer une goutte. Ça c'est du luxe.",
    "FR: Je venu, j'ai vu, j'ai tout dépensé. Zéro regret.",
    "FR: Le drop à 2h30 ? J'ai cru que l'immeuble allait s'effondrer. Puissance phénoménale.",
    "FR: Honnêtement ? Meilleure boîte du monde. Et j'en ai fait des clubs à Ibiza et Dubaï.",
    "FR: J'ai vu un mec payer sa table en crypto, le futur est là les gars.",
    "FR: Propre, net et sans bavures. Le Bradford c'est la Champions League de la nuit.",
    "FR: OMGGGG LE SON EST TROP LOOOURD !!!",
    "FR: C'est carré. Rien à dire. La perfection à la française à l'étranger.",
    "FR: J'ai passé 20 minutes à me regarder dans les miroirs des toilettes, l'éclairage te donne une tête de star de ciné.",
    "FR: On a fini la soirée avec le DJ dans un after privé, le mec est un génie.",
    "FR: Le voiturier a garé ma Twingo entre deux Urus, j'étais le roi du pétrole.",
    "FR: C'est plus une boîte, c'est une expérience sensorielle. J'ai vu des couleurs que je connaissais même pas.",
    "FR: L'ambiance est électrique. Dès que les canons à CO2 pètent, tout le monde devient fou.",
    "FR: Ma carte bleue a chauffé mais mon cœur est rempli de basses. Merci le Bradford.",
    "FR: Un peu d'attente à l'entrée mais une fois dedans, t'oublies même ton prénom.",
    "FR: Techno de qualité supérieure. Pas de la soupe commerciale, du vrai son qui tape.",
    "FR: Le vestiaire est hyper rapide, même à 6h du mat quand tout le monde veut partir en même temps. Pro.",
    "FR: J'ai croisé mon ex au bar, on s'est même pas calculé tellement le son était lourd, ça m'a sauvé ma soirée.",
    "FR: Le Bradford c'est ma nouvelle église. Le DJ est mon prêtre.",
    "FR: Genre le mec à côté de moi a commandé 12 bouteilles de Ace of Spades d'un coup... le défilé de sparklers a duré 10 minutes !!",
    "FR: Une dinguerie. Juste une dinguerie.",
    "FR: Je reviendrai mardi prochain. Et celui d'après. Et celui d'après.",
    "FR: C'est cher ? Oui. Est-ce que ça vaut le coup ? Oh que oui.",
    "FR: J'ai encore le rythme dans la peau, impossible de dormir.",
    "FR: Le service est incroyable, t'as jamais ton verre vide, les serveuses sont des ninja.",
    "FR: La sécu m'a recalé mes potes parce qu'ils étaient mal sapés. Bah bravo la sécu, grâce à vous l'ambiance était clean dedans.",
    "FR: Franchement, le mec qui a réglé les basses est un psychopathe. J'adore ça.",
    "FR: Magnifique. Somptueux. Brutal.",
    "FR: J'ai perdu mon téléphone, je l'ai retrouvé 5 min après à l'accueil. Les gens sont respectueux ici.",
    "FR: On se sent en sécurité, on se sent beau, on se sent riche. C'est l'effet Bradford.",
    "FR: Le café à 6h du mat avant de sortir... le meilleur de ma vie.",
    "FR: Je sais même pas comment je suis rentré mais je sais que je me suis éclaté.",
    "FR: La zone VIP est vraiment privée, pas comme dans les autres clubs où tout le monde te regarde manger tes glaçons.",
    "FR: Bref, j'ai fait le Bradford. Je peux mourir tranquille.",
    "FR: Une tuerieeeeeeeeeeee !!! 🔥🔥🔥",
    "FR: Le son était tellement fort que mon cocktail faisait des vagues dans le verre.",
    "FR: P**** de bordel de m****, j'ai jamais entendu une basse aussi propre. Je suis en transe.",
    "FR: Mec, t'imagines même pas la violence du drop à 3h. Tout le monde a hurlé en même temps. Frisson.",
    "FR: 15 balles le vestiaire mais ma veste est revenue toute propre et parfumée. Rien à dire.",
    "FR: J'ai croisé une meuf incroyable sur le dancefloor, on a dansé 2h sans dire un mot. Magique.",
    "FR: On est venu à 5, on est reparti à 12. Les rencontres ici c'est un autre monde.",
    "FR: Le Bradford c'est la seule raison pour laquelle je bosse autant. Pour payer ma table le samedi.",
"FR: J'ai vu un mec payer une bouteille de 6 litres avec une liasse de billets de 500. Le mec a même pas compté. Lunaire.",
    "FR: MEILLEURE. BOITE. DU. MONDE.",
    "FR: Franchement le Bradford c'est une religion à ce stade. J'y suis tous les samedis, j'peux plus m'en passer.",
    "FR: Le son est tellement violent que j'ai senti mon pacemaker se réinitialiser mdrrr.",
    "FR: 4h du mat : canons à CO2, lasers verts, drop de techno berlinoise... j'ai failli pleurer tellement c'était beau.",
    "FR: J'ai perdu ma CB au bar, le serveur me l'a rendue 2h après avec un clin d'œil. Honnêteté 10/10.",
    "FR: Carré de ouf.",
    "FR: Les meufs sont d'un niveau... j'ai cru que j'étais au casting de Victoria Secret.",
    "FR: Si tu n'as pas de table ici, t'es personne. Mais une fois que t'as ton bracelet, tu es le roi de la ville.",
    "FR: On m'avait dit 'va au Bradford', j'y suis allé, j'ai vu, j'ai été conquis. Plus jamais je remets les pieds ailleurs.",
    "FR: Je sais même pas si c'était de la musique ou une opération chirurgicale des tympans. Incroyable.",
    "FR: 150 balles le gin-to mais servi avec le sourire d'une déesse. Je paie sans discuter.",
    "FR: J'ai fini par terre à 5h du mat, un bouncer m'a relevé avec plus de respect que ma propre mère.",
    "FR: Le niveau de luxe est indécent. Les chiottes sont plus propres que mon salon.",
    "FR: C'est le feu !!!!!! 🔥🔥🔥",
    "FR: On a partagé notre table avec des japonais qui parlaient pas un mot de français, on a fini frères de sang à l'aube.",
    "FR: Le DJ a lâché un remix de ouf à 3h, tout le club a hurlé. J'en ai encore des frissons.",
    "FR: Trop de fumée, trop de bruit, trop de thune. C'est exactement ce qu'il me fallait.",
    "FR: 0 relou. 100% élite. Le tri à l'entrée est sévère mais c'est pour ça qu'on aime.",
    "FR: J'ai croisé mon patron en VIP. On s'est regardé, on a trinqué, et on a fait comme si on s'était jamais vus. Magique.",
    "FR: Bradford ou rien.",
    "FR: Les lasers m'ont fait un scanner du cerveau en direct live. 10/10.",
    "FR: La sécu est impressionnante. Tu te sens plus en sécurité ici qu'à la banque.",
    "FR: J'ai dépensé mon loyer, ma caution et mes vacances en une nuit. Aucun regret, l'expérience était unique.",
    "FR: Le voiturier a fait ronronner ma Ferrari devant tout le monde en me rendant les clés. Petit kiff.",
    "FR: Un délire total.",
    "FR: J'ai commandé de l'eau, ils m'ont amené une bouteille en cristal. J'ai compris que j'étais pas chez mémé.",
    "FR: Incroyable mais vrai : j'ai pas vu un seul téléphone sur le dancefloor, tout le monde vivait le truc à fond.",
    "FR: C'est pas une boîte, c'est un vaisseau spatial le truc.",
    "FR: La barmaid s'appelle Sarah, elle fait les meilleurs Moscow Mule de la galaxie. Allez la voir.",
    "FR: J'ai dansé à côté d'une star de ciné, personne la faisait chier, tout le monde respectait. La classe du Bradford.",
    "FR: Le drop était tellement sale que j'ai dû m'accrocher au bar.",
    "FR: 10/10.",
    "FR: J'en ai vu des clubs, mais celui-là il a un truc en plus. Une âme, ou peut-être juste beaucoup d'or partout.",
    "FR: J'ai encore les basses qui tapent dans mon bide à 14h le lendemain. C'est ça qu'on veut.",
    "FR: Une ambiance de dingue, des bouteilles qui défilent, des gens beaux. Le paradis sur terre.",
    "FR: Merci Bradford pour cette nuit. On s'en souviendra toute notre vie.",
    "FR: On est arrivés en mode discret, on est repartis en mode légende.",
    "FR: Le vestiaire est plus rapide que ma connexion fibre. Efficacité totale.",
    "FR: Les cocktails sont des œuvres d'art. Dommage qu'on les boive en 2 secondes.",
    "FR: Franchement ? Allez-y. C'est cher mais c'est le meilleur investissement de votre week-end.",
    "FR: J'ai perdu ma dignité au bar mais j'ai gagné une soirée mémorable.",
    "FR: Lourd de ouf.",
    "FR: Le DJ booth est une merveille technologique. On dirait le cockpit d'un avion de chasse.",
    "FR: J'ai vu une meuf pleurer parce que le DJ a pas passé sa chanson... ma chérie ici c'est lui le patron.",
    "FR: La vibration du sol est réglée sur ton rythme cardiaque. Flippant mais génial.",
    "FR: Plus de sparklers que dans un feu d'artifice du 14 juillet. Le défilé des bouteilles était sans fin.",
    "FR: C'est ça la vraie vie.",
    "FR: Une fois que t'as goûté au VIP du Bradford, toutes les autres boîtes te paraissent être des kermesses de village.",
    "FR: Propre.",
    "FR: J'ai vu un mec donner un pourboire de 200 balles juste parce que le serveur a souri. Autre monde.",
    "FR: J'en perds mes mots. Juste... waouh.",
"FR: Mais nan mais nan mais nannnnnnnnn !!! Le drop m'a littéralement foudroyéééééé ⚡⚡⚡",
    "FR: J'ai depensé tout mon livret A mais jmen balek ct trop lourd frrrr",
    "FR: Le son est trop forrrt j'entend plus rien mais c'est tropppppp biennnnnnnnnnnn",
    "FR: 90€ lentrée mdrrr g mal au cul mais le son est carrement abusé",
    "FR: Je croi ke g vu une soucoupe volante dans les lasers... ou alors c t le gin lol",
    "FR: Wsh la sécu ils blaguent pas ici, g failli mfaire recal psk g pas souri mdr",
    "FR: Bradford = Meilleur spot. Point. barre.",
    "FR: J'écris ca depui les toilettes et mm ici la basse me fait vibrer le tel c n'imp",
    "FR: Incroyableeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    "FR: G jamai vu autant d'oseille au m2 c flippant un peu nan ??",
    "FR: Trop de fumée g perdu mes potes mais trkl g fini avec des russes o calme",
    "FR: Pureeeeeeeee la claque auditiveeeeeeee !!!! J'en revien pas",
    "FR: Slt c t koi le son a 4h du mat ??? Une dinguuuerieeee svp",
    "FR: G trop bu g plus de jambes mais je veu pas partirrrrrrr",
    "FR: Bradford ou rien mon gaaaars",
    "FR: Le voiturié il a garé ma clio comme si c t une lambo mdr la classe",
    "FR: Innnnccccrrrrooooooooyaaaaaaaabbbbbbbblllleeeeeee",
    "FR: Franchemen g fait bcp de boite mais la... respect. Le son est propre de ouf",
    "FR: G tro kiffé la vibe. Un peu cher mais bon on vi k'une fois nan ?",
    "FR: G perdu ma lentille sur le dancefloor mdrrr g fini la soirée en mode pirate",
    "FR: Le barman c un magicien le truc il a fait un cocktail en 2 sec",
    "FR: Vraiment lélite. Ya ke des gens bo c fou.",
    "FR: G plus de voix a force de gueuler sur les drops lol",
    "FR: Trop de bass j'ai le coeur ki bat o rythme du dj c tro stylé",
    "FR: Ma meuf elle a pleuré telment le set était bo mdrrr kel fragile",
    "FR: C troooooooo bonnnnnnnnnnnnnnnnn",
    "FR: G vu un mec laché 20k o calme... j'ai encore mal a mon compte en banque",
    "FR: Bradford c mon nouveau QG. Obligé.",
    "FR: La sécu est archi pro, ca change des boites de relous",
    "FR: Kelkun a retrouvé une boucle d'oreille ??? Nan jdec c t trop lourd",
    "FR: G meme pas les mots. Juste... wowowowowowow",
    "FR: Bradford 1 - Mon compte en banque 0. Match de fou.",
    "FR: Telment d'energie dans la zone g cru j'allais explosé",
    "FR: Best club evaaaarrrrrrrrr",
    "FR: G fai un selfie avec le dj il m'a fait un clin d'oeil jsuis refait",
    "FR: Les lasers ils ont découpé mon ame en morceaux",
    "FR: Jen peu plus de ce club c trop biennnnnnnnnnnn",
    "FR: 10/10 direct. Cherche pas.",
    "FR: G t pa pret pour la basse a 3h... g failli faire un arret cardiaque mdr",
    "FR: Franchement bravo. C rare de voir un club ossi bien géré.",
    "FR: Lourd lourd louuuuuurdddddddddddddddd",
    "FR: G vu un mec en costard dormir dans le VIP mdrr le pauvre il a pas tenu",
    "FR: Le son c d'une pureté... on dirait g des nouveaux tympans",
    "FR: Bradford t'es le boss.",
    "FR: C t tro dar",
    "FR: G les oreilles ki sifflent mais jsuis tro heureux",
    "FR: Merci pour la soirée c t légendaire",
    "FR: G depensé mon loyer mais trkl g dormi sur le dancefloor mdr",
    "FR: La vibe est trop speciale ici. On se sent vrmt VIP.",
    "FR: Jsuis arrivé en mode déprime total et jressors à 6h jsuis l'homme le plus heureux du monde. J'ai rencontré un mec qui m'a payé des verres toute la nuit juste psk il kiffait mes chaussures mdrrr Bradford c magique.",
    "FR: G essayé de rentrer avec des baskets sales j'ai cru que le videur allait m'abattre sur place mdrrr. Heureusement mon pote avait une paire de rechange dans son coffre. Une fois dedans... LA CLAQUE. Le son est tro abuséééé.",
    "FR: 4h du mat : j'ai perdu mes potes, mon tel a plus de batterie, mais jsuis en train de grailler des mini burgers offerts par un mec en VIP qui possede la moitié de la ville je crois. J'veux jamais que ca s'arrete !!!",
    "FR: Franchement g jamai vu ca. Le DJ a coupé le son d'un coup, tout le monde a cru a une panne, et la... GROS DROP DE MALADE avec des lasers ki sortent de partout. G hurlé comme une gamine ptdrrr.",
    "FR: G depensé 300 balles de cocktails et g meme pas fait expres... les serveuses elles arrivent avec le sourire et tu dis oui a tout mdr. Mais vrmt la vibe est tro clean, tu te sens vrmt comme un prince ici.",
    "FR: Mon premier Bradford. G t pas pret. Les basses elles te decoupent le bide. J'ai vu un mec perdre sa rolex dans la foule, il s'en battait les c******* il a continué a danser direct mdrrr c n'importe quoi cet endroit.",
    "FR: J'écris ca avec un mal de crane de batard mais ct la meilleure soirée de ma vie. G croisé une meuf incroyable au bar, on a parlé de physique quantique pendant 1h alors que le son etait a 120 decibels. J'ai rien compris mais ct incroyable.",
    "FR: G t en train de kiffer ma life pres des enceintes et la g pris un jet de CO2 en plein visage... g cru g t au pole nord pdt 2 secondes mdrrr. Ca m'a reveillé direct, j'ai fini la soirée en mode furie sur le dancefloor.",
    "FR: Wsh c koi ce club ??? G vu un mec donner 100 balles de pourboire au vestiaire juste psk la dame lui a dit bonne soirée. Le niveau de richesse est indécent mais l'ambiance est vrmt archi saine, pas de jaloux, tout le monde kiffe.",
    "FR: Le voiturier il a garé ma vieille clio entre deux Bugatti j'etais mort de rire. Le mec m'a rendu les clés avec un grand sourire en me disant 'A la semaine prochaine patron'. Ils te mettent trop bien ici ptn.",
    "FR: Jsuis rentré j'etais sceptique psk 90 balles l'entrée c cher de ouf mais qd tu vois la prod... le plafond il bouge, les lasers ils te scannent, le son est pur... ok je ferme ma gueule et je paie. C'est du grand art.",
    "FR: G t au bar et j'ai renversé mon verre sur un mec en costard, j'ai cru j'allais me faire defoncer... le mec m'a regardé, il a rigolé et il m'a commandé une bouteille entiere. 'C'est le Bradford ici mon pote, on s'amuse'. Choqué.",
    "FR: Kelkun sait c t ki le DJ hier soir vers 3h ??? Le mec a passé un remix de ouf j'ai cru j'allais exploser de bonheurrr. G encore les oreilles qui sifflent mais j m'en fouuuuuu ct trop dar.",
    "FR: Bradford ou la mort srx. On a fini la soirée a 15 dans un Uber van psk on s'est tous rencontrés au fumoir. Meilleurs rencontres de ma vie, que des gens archi stylés et sans prise de tete.",
    "FR: G vu un mec dormir sur un canapé en cuir a 10k alors que la techno etait a fond a coté de lui. Le mec etait en paix totale mdr. J'ai hesité a le prendre en photo mais la secu m'a regardé j'ai vite rangé mon tel mdrrr.",
    "FR: C t troooooppp lourd. G plus de voix, plus de thune, plus de dignité, mais g des souvenirs de fou. Merci le Bradford, a samedi prochain sans fauteeeee !!!",
"ES: Una locura total... No tengo palabras para describir el set de ayer. Los bajos me despeinaron literalmente mdrrrr. El mejor club de la ciudad sin duda.",
    "ES: 90 pavos la entrada pero vale cada maldito céntimo. La seguridad es súper profesional y dentro solo hay gente top. Nivelazo.",
    "ES: Me gasté todo el alquiler del mes en botellas de Moët pero mírame, ¡estoy feliz! 😂 La energía del Bradford es otra liga.",
    "ES: ¿Alguien sabe quién era el DJ a las 3am? Ese drop de techno me cambió la vida, casi me pongo a llorar de la emoción ptm.",
    "ES: El portero no me dejaba entrar por las zapas pero mi colega convenció al manager y pff... la mejor noche de mi vida.",
    "ES: Demasiado humo pero me da igual, terminé bailando con unas modelos de Milán en el reservado VIP. Bradford es magia pura.",
    "ES: Madre mía el sonido... sentía que el corazón me iba a explotar con cada beat. Increíble la calidad del audio aquí.",
    "ES: BRUTALLLLLLLLLLL. Sin más. Si no has venido, no sabes lo que es la fiesta de verdad.",
    "ES: El barman me hizo un cocktail de 150€ y me dolió el alma, pero cuando lo probé... joder, era ambrosía. Calidad suprema.",
    "ES: He perdido mi móvil, mi cartera y probablemente mi dignidad, ¡pero qué nocheeeee! Bradford o muerteeee 🔥🔥🔥",
    "ES: Vi a un tío pagar una cuenta de 20k como si estuviera comprando pan. El nivel de pasta aquí es insultante, me encanta.",
    "ES: La iluminación es de otro planeta. Los láseres te cortan el alma en pedazos mientras el CO2 te congela la cara. 10/10.",
    "ES: Salí a las 7 de la mañana y todavía quería más. La vibra es súper sana, nada de líos, solo gente guapa disfrutando.",
    "ES: El aparcacoches trató mi Seat Ibiza como si fuera un Ferrari, qué tíos más grandes. Servicio de lujo total.",
    "ES: Me desperté sin voz de tanto gritar en los drops mdrrr. ¡Qué salvajada de sitio!",
    "ES: Bradford es mi nueva religión. El DJ es mi Dios y la pista mi iglesia. Amén.",
    "ES: La zona VIP es real, no como otros sitios. Aquí estás tranquilo, sin agobios y con el mejor servicio del mundo.",
    "ES: Flipante. No hay otra palabra. Estuvimos en la mesa de al lado de un futbolista y el tío súper humilde, nos invitó a una ronda.",
    "ES: Es carísimo, sí. ¿Vale la pena? Sí, sí y mil veces sí. Es una experiencia que tienes que vivir una vez al menos.",
    "ES: ¡DIOSSSSS QUÉ SUBIDÓN! Los cañones de CO2 me salvaron la vida porque hacía un calor de locos de tanto bailar.",
    "ES: No entiendo cómo hay gente que sale por otros sitios pudiendo venir aquí. Bradford es el puto amo de la noche.",
    "ES: Perdí una lentilla en el moshpit y un segurata me ayudó a buscarla con una linterna mdrrr. Al final no la encontramos pero el gesto fue top.",
    "ES: El olor de este sitio... huele a perfume caro y a éxito. Te sientes importante solo por estar dentro.",
    "ES: Hecho polvo hoy pero con el corazón lleno de bajos. Gracias Bradford por la mejor noche del año.",
    "ES: Sinceramente, el mejor club en el que he estado, y eso que he ido a sitios en Ibiza y Berlín. Esto es otro nivel de clase.",
    "ES: Increibleeeeeeeeeeeeeeeeeeee",
    "ES: 10/10 no tengo quejas. Bueno sí, que el tiempo pasa volando ahí dentro.",
    "ES: Ese momento cuando apagan todo y solo queda un láser blanco... uff, piel de gallina total.",
    "ES: Jajaja vi a uno durmiendo en un sofá de 5000 pavos mientras la música retumbaba. El tío estaba en la gloria.",
    "ES: Bradford es veneno del bueno. Una vez entras, ya no quieres salir nunca más.",
 "ES: PEROOOOOO QUÉ HA SIDO ESSE DROP POR DIOSSSSSS!!! Tengo el cerebro frito 🧠💥",
    "ES: me gaste to el sueldo en una noche y me da iwal... bradford es la p*** ostiaaaa",
    "ES: Alguien a visto mis gafas??? las perdi en el reservado mdrrrr k ciega voy",
    "ES: El segurata me miro mal xq taba bailando encima de la mesa pero me la pelaaaa esto es bradforddddd",
    "ES: k locuronnnnnnnn de sitiooooooo",
    "ES: 90 pavos la entrada joder pero es q el sonido te mete una paliza q flipas me encanta",
    "ES: sjsksksksksk la musica me esta hablando literal... toy flipandoooooo",
    "ES: VIP o muerte. Si no tienes mesa ni vengas k el perreo es de elite aki",
    "ES: Best. Club. Ever. punto.",
    "ES: Tioooo el dj me hizo un guiño o me lo invente x el gin?? mdrrr me da iwal lo amo",
    "ES: Demasiado humo no veo ni a mis huevos pero la vibra es 1000/10",
    "ES: Q pajote mental de luces... parecia q taba en star wars o algo",
    "ES: carisimo pero es q me siento el p*** amo aki dentro mdrrrr",
    "ES: Bradford mandaaaaaa!!! q le den a los demas sitios de mierda",
    "ES: Gaste 5k y no me acuerdo de nada... señal de q fue la mejor noche de mi vida",
    "ES: Mañana mi jefe me mata pero hoy el Bradford me da la vidaaaaa",
    "ES: k fuerteeee el bajo te retumba hasta en el carnet de identidad",
    "ES: Espectacularrrrrrrrrrrrrrrrrrrrrrrrrrrr",
    "ES: Jajaja vi a un pibe intentando ligar con la maquina de humo k ciego iba el pobre",
    "ES: Nivelazo. Aki solo entra gente guapa y con pasta. Como debe serrrr",
    "ES: Me duele to pero kiero volveeeeeerrrrr yaaaaa",
    "ES: Olvidate de ibiza... el bradford se los folla a todos. facts.",
    "ES: Kien es el k pincha ahora?? sta loco el tioooo k killeeeerrrr",
    "ES: He perdio un zapato mdrrrr voy como cenicienta pero puesta de tequila",
    "ES: Bradford es veneno puro... una vez pruebas no kieres otra cosa",
    "ES: La rubia de la barra me puso un gin de 20 pavos k sabia a gloria bendita",
    "ES: Toy en el baño y hasta el papel es de seda mdrrrr q lujo mas basto",
    "ES: pfffffff sin palabras... el drop de las 4 me reinicio el windows",
    "ES: Brrrrrrrrrrrrradforddddddddddddddddd",
    "ES: k locura de tias hay aki... parece un casting de modelos literal",
    "ES: No cap. El mejor sonido k he escuchao en mi vida. Limpio y bruto.",
    "ES: Gane en cripto ayer y me lo fundi hoy en el reservado. ROI de felicidad 100%",
    "ES: Se me cayo el cubata encima de un famoso y el tio me pidio perdon el a mi mdrrrr k clase",
    "ES: 10/10. Si eres pobre no vengas mdrrr",
    "ES: Los bouncers son armarios empotraos pero super majos si no das por culo",
    "ES: me muerooooooo k temazooooooo",
    "ES: Salir del bradford a las 7am es como bajar de una nave espacial. La realidad apesta.",
    "ES: Ke fuerteeeeee!!!! La co2 me dejo tieso mdrrrr",
    "ES: Bradford legacy es real... no es solo marketing es una puta religion",
    "ES: Mañana estare muerto pero hoy soy el rey del mundo. Gracias Bradford.",
    "ES: Si no has estao en el VIP de aki no has vivio la noche de verdad",
    "ES: Alguien vio mi cartera??? tiene una foto de mi perro mdrrr toy fatal",
    "ES: Sonido 20/10. Luces 20/10. Alcohol 50/10. Cuenta bancaria 0/10.",
    "ES: p*** locuraaaaaaa de sitioooo",
  "ES: Estuvo bien la noche.",
    "ES: Sonido impecable y buena atención en barra. Caro, pero lo esperado.",
    "ES: Buena música.",
    "ES: Un poco de cola para entrar, pero una vez dentro todo bien. Ambiente selecto.",
    "ES: El sitio es bonito.",
    "ES: Caro pero merece la pena por el equipo de sonido que tienen. Muy profesional.",
    "ES: Todo ok.",
    "ES: Una experiencia interesante. La decoración es impresionante.",
    "ES: Me gustó el set del segundo DJ. Repetiré.",
    "ES: Bien.",
    "ES: El servicio de aparcacoches fue rápido. El club por dentro está muy cuidado.",
    "ES: Buena vibra.",
    "ES: Un poco caro el agua, pero el ambiente es insuperable.",
    "ES: Local increíble, sonido 10.",
    "ES: Fui con unos amigos y lo pasamos bien. Seguridad amable.",
    "ES: Calidad top.",
    "ES: Música house de la buena. Volveré seguro.",
    "ES: Correcto todo.",
    "ES: El reservado vale la pena si vas en grupo. Buena atención.",
    "ES: Sin quejas, una noche redonda.",
    "ES: Espectáculo de luces muy currado.",
    "ES: Bastante bien.",
    "ES: Lo mejor es el sistema de sonido, se nota la inversión.",
    "ES: Muy exclusivo.",
    "ES: No es barato, pero la calidad se paga. Buen sitio.",
    "ES: Genial la música.",
    "ES: La seguridad controla mucho el ambiente, se agradece.",
    "ES: Todo en orden.",
    "ES: Me sorprendió la limpieza de los baños para ser una discoteca. Muy bien.",
    "ES: Recomendable.",
    "ES: Ambiente muy top.",
    "ES: Fue una noche divertida. Bebidas de calidad.",
    "ES: Estuvo ok.",
    "ES: Buen trato del personal desde la entrada hasta la salida.",
    "ES: Impresionante el sitio.",
    "ES: Música top y gente guapa. Lo normal en el Bradford.",
    "ES: Sin duda el mejor sonido de la ciudad.",
    "ES: Bien gestionado.",
    "ES: Un poco de espera en el ropero, pero por lo demás perfecto.",
    "ES: Volveré.",
    "ES: El nivel de los DJs es muy alto. Merece la pena ir.",
    "ES: Muy bueno.",
    "ES: Un sitio con mucha clase.",
    "ES: Todo fluido, buena noche.",
    "ES: La iluminación es increíble.",
    "ES: Ok.",
    "ES: Se nota que cuidan los detalles. El servicio en mesa fue impecable.",
    "ES: Me gustó mucho el ambiente.",
    "ES: Muy profesional todo.",
    "ES: Una noche para recordar, todo salió perfecto.",
 "ES: La mejor noche de mi vida, sin duda alguna. El Bradford es otro nivel.",
    "ES: carisimo pero pfffff merece la pena solo por ver los lasers esos locos",
    "ES: Alguien sabe como se llamaba la camarera rubia del vip?? es para un amigo mdrrrr",
    "ES: Sonido 10/10. No hay otro sitio igual en la ciudad.",
    "ES: Me desperte sin un duro pero con el corazon contento jajaja q nocheeee",
    "ES: El portero es un poco borde pero entiendo q tiene q filtrar a la peña. Dentro todo de lujo.",
    "ES: brutal.",
    "ES: Sigo escuchando los bajos en mi cabeza y ya son las 2 de la tarde... q salvajada de equipo tienen.",
    "ES: Todo bien. El servicio de mesa un poco lento al principio pero luego se portaron.",
    "ES: Joder q subidon con el drop de las 3am, casi me da algoooo 🔥🔥🔥",
    "ES: El sitio mas top en el q he estao. Punto.",
    "ES: Una experiencia religiosa mdrrr. La musica te envuelve literal.",
    "ES: 15 pavos una copa de agua es un robo pero bueno, es el Bradford, ya sabes a lo q vienes.",
    "ES: Increible la iluminacion, parecia q taba en otra dimension.",
    "ES: ok todo.",
    "ES: Perdi mi chaqueta y me la devolvieron intacta. Gente honrada.",
    "ES: No entiendo como la gente puede ir a otros sitios. Bradford es la elite.",
    "ES: taba muy lleno ayer pero la vibra seguia siendo buena.",
    "ES: El DJ es un p*** crack. No pare de bailar ni un segundo.",
    "ES: Buena musica, buena gente, mucho dinero. Lo normal.",
    "ES: Me gaste 2k en botellas y me trataron como a un rey. Asi si.",
    "ES: sjskskksks todavia voy ciegooo q locuron de fiesta diooos",
    "ES: Muy buena atencion en el reservado.",
    "ES: El olor del club es increible, huele a perfume caro por todos lados.",
    "ES: volvere seguro.",
    "ES: Mi mujer perdio un zapato en la pista y un bouncer nos ayudo a buscarlo mdrrr un heroe el tio.",
    "ES: Caro pero insuperable. La calidad se paga.",
    "ES: El mejor sistema de sonido que he escuchado en mi vida. Limpio y potente.",
    "ES: Estuvo bien.",
    "ES: Demasiado humo a veces, no se veia nada, pero la musica compensa.",
    "ES: Bradford manda. Los demas clubs son para niños.",
    "ES: Me encanta el diseño del baño, hasta ahi hay lujo mdrrr.",
    "ES: 10/10",
    "ES: Vi a un famoso en la zona VIP pero nadie le molestaba. Clase total.",
    "ES: La co2 me dejo congelao mdrrr pero q bien sentaba con tanto baile.",
    "ES: Todo fluido, sin problemas en la puerta con lista.",
    "ES: Genial.",
    "ES: Me duele to pero kiero mas. Bradford es drogaaaa.",
    "ES: Pague 90 pavos de entrada y no me arrepiento de nada.",
    "ES: k fuerte el sonido d ayer... casi me estallan los timpanos pero merecio la pena.",
    "ES: No hay palabras. Hay q vivirlo.",
    "ES: Un poco de espera en el ropero al salir, lo unico malo.",
    "ES: El valet me trajo el coche super rapido. Servicio impecable.",
    "ES: increibleeeeeeee",
    "ES: La seleccion musical es de lo mas fino q hay ahora mismo.",
    "ES: Muy exclusivo. Me senti como un pro en el reservado.",
    "ES: Sin quejas. Noche perfecta.",
    "ES: Alguien encontro una cartera de cuero??? la perdi por la zona de la barra",
    "ES: Simplemente el mejor club del mundo.",
    "ES: Bradford es leyenda.",
"ES: Sigo flipando con lo de anoche... El sistema de iluminación es de otra galaxia. 🌌",
    "ES: carisimo pero es q me da igual, la sesion de techno fue HISTORICA.",
    "ES: El portero casi no me deja pasar x las zapas pero al final se enrollo. Menos mal pttttt.",
    "ES: 10/10 sonido brutal.",
    "ES: ¿Alguien sabe el nombre del tema q sonó antes del cierre? Era puro fuegoooo.",
    "ES: me duele todo de tanto bailar pero repetiria ahora mismo mdrrr.",
    "ES: La zona VIP es lo mas top que he visto. El servicio de mesas es impecable.",
    "ES: 90€ la entrada me dolio un poco pero una vez dentro te olvidas de todo. Es otro mundo.",
    "ES: todo okey.",
    "ES: Demasiada gente ayer pero la vibra seguia siendo muy elite. Me gusto.",
    "ES: Joderrrr q bajos... me vibraba hasta el carnet de identidad. Que locura de equipo.",
    "ES: El mejor club de la ciudad, no hay debate posible.",
    "ES: Vi a un par de influencers en el reservado pero habia buen rollo, nadie agobiaba.",
    "ES: Me gaste media nomina en botellas mdrrr pero valio la pena cada segundo.",
    "ES: increibleeeeeeee de verdad",
    "ES: El olor del club es super caracteristico, huele a exito y perfume caro jajaja.",
    "ES: Un poco de cola en el baño pero bueno, es sabado noche, es normal.",
    "ES: Bradford es mi nueva casa. Punto.",
    "ES: Muy buena seleccion musical, nada de comercial barato. Calidad pura.",
    "ES: 5 estrellas. No tengo ninguna queja.",
    "ES: El valet me trajo el coche impecable y super rapido. Servicio de 5 estrellas.",
    "ES: k fuerte lo de ayer... casi salgo volando con el co2 mdrrr q subidon.",
    "ES: Todo muy exclusivo, te sientes vips desde que entras.",
    "ES: buen sitio.",
    "ES: La decoracion es una pasada, todo lo que brilla parece oro de verdad.",
    "ES: Fui con unos clientes y quedaron flipando. Quedas como un rey si los traes aqui.",
    "ES: Me lo pase de locosssssss.",
    "ES: Alguien vio un pendiente de diamantes x la zona del bar?? ayudaaaa plssss.",
    "ES: La camarera de la barra izquierda es un amor, super rapida.",
    "ES: 150 pavos el cocktail pero es q estaba increible... calidad de bar de lujo.",
    "ES: sigo en shock con el drop de las 4am... brutal brutal brutal.",
    "ES: La seguridad es seria pero justa. Se agradece que no dejen entrar a relous.",
    "ES: Me encanta. Volvere cada fin de semana si mi cartera me deja jajaja.",
    "ES: Bradford manda, el resto de sitios son para niños.",
    "ES: El baño estaba mas limpio que mi casa, eso dice mucho del sitio.",
    "ES: Top total.",
    "ES: Una noche perfecta. Musica, gente guapa y buen alcohol.",
    "ES: taba muy lleno ayer pero el ambiente era espectacular.",
    "ES: Si no has estado, no has vivido la noche de verdad.",
    "ES: Bien gestionado todo, desde la entrada hasta el ropero.",
    "ES: Volvere.",
    "ES: El DJ es un p*** genio, que manera de llevar a la gente.",
    "ES: carooooo pero lo mejor de la city.",
    "ES: Sin duda el mejor sistema de sonido que he escuchado jamas.",
    "ES: ok.",
    "ES: Me encanto el detalle de las toallitas calientes en el baño. Clase.",
    "ES: Bradford es leyenda pura.",
    "ES: Jajaja vi a uno intentando ligar con un altavoz, q ciego iba el pobre mdrrr.",
    "ES: Simplemente espectacular. No hay palabras.",
    "ES: La noche se me hizo cortisima, queria mas y mas.",
 "IT: Ragazzi, non ho parole... il set di ieri sera era pura magia. Bassi che ti spettinano l'anima mdrrr. Il miglior club di sempre.",
    "IT: 90 euro per l'ingresso ma li vale tutti, dal primo all'ultimo centesimo. Classe infinita.",
    "IT: Ho speso mezzo stipendio in champagne ma guardatemi: sono l'uomo più felice del mondo! 😂 Energia pazzesca.",
    "IT: Qualcuno sa il nome del DJ delle 3 del mattino? Quel drop techno mi ha cambiato la vita, stavo per piangere ptm.",
    "IT: Il buttafuori non voleva farmi entrare per le scarpe, ma il mio amico ha convinto il manager e... pff... la notte più bella di sempre.",
    "IT: Troppo fumo ma non mi importa, ho finito per ballare con delle modelle di Milano nel privé. Bradford è magia pura.",
    "IT: Mamma mia il suono... sentivo il cuore esplodere a ogni beat. Qualità audio fuori dal comune qui.",
    "IT: BRUTALEEEEE. Senza parole. Se non sei stato qui, non sai cos'è la vera festa.",
    "IT: Il barista mi ha fatto un cocktail da 150€, mi faceva male il cuore a pagare, ma quando l'ho assaggiato... divino. Qualità suprema.",
    "IT: Ho perso il telefono, il portafoglio e probabilmente la dignità, ma che notteeeee! Bradford o morte 🔥🔥🔥",
    "IT: Ho visto un tipo pagare un conto da 20k come se stesse comprando il pane. Il livello di soldi qui è assurdo, mi piace.",
    "IT: L'illuminazione è di un altro pianeta. I laser ti tagliano l'anima mentre il CO2 ti congela la faccia. 10/10.",
    "IT: Sono uscito alle 7 del mattino e ne volevo ancora. Vibra super sana, niente problemi, solo bella gente.",
    "IT: Il parcheggiatore ha trattato la mia Panda come se fosse una Ferrari, che grandi. Servizio di lusso totale.",
    "IT: Mi sono svegliato senza voce per quanto ho urlato ai drop mdrrr. Che posto selvaggio!",
    "IT: Il Bradford è la mia nuova religione. Il DJ è il mio Dio e la pista la mia chiesa. Amen.",
    "IT: La zona VIP è vera, non come in altri posti. Qui sei tranquillo, senza stress e con il miglior servizio del mondo.",
    "IT: Incredibile. Eravamo al tavolo accanto a un calciatore famoso e il tipo era super umile, ci ha pure offerto un giro.",
    "IT: È carissimo, sì. Ne vale la pena? Sì, sì e mille volte sì. Un'esperienza da fare almeno una volta.",
    "IT: DIOOOO CHE ADRENALINA! I cannoni di CO2 mi hanno salvato la vita perché faceva un caldo assurdo a forza di ballare.",
    "IT: Non capisco come la gente vada ancora in altri posti quando c'è il Bradford. Il re della notte.",
    "IT: Ho perso una lente a contatto nel moshpit e un bouncer mi ha aiutato a cercarla con la torcia mdrrr. Alla fine niente, ma gesto top.",
    "IT: L'odore di questo posto... sa di profumo costoso e di successo. Ti senti importante solo a stare dentro.",
    "IT: Distrutto oggi ma con il cuore pieno di bassi. Grazie Bradford per la miglior notte dell'anno.",
    "IT: Sinceramente, il miglior club in cui sia mai stato, e ne ho visti a Ibiza e Berlino. Questo è un altro livello.",
    "IT: Incredibileeeeeeeeeeeeeeeeeeee",
    "IT: 10/10 nessuna lamentela. Forse solo che il tempo vola troppo velocemente lì dentro.",
    "IT: Quel momento in cui spengono tutto e rimane solo un laser bianco... uff, pelle d'oca totale.",
    "IT: Jajaja ho visto uno dormire su un divano da 5000 euro mentre la musica spaccava tutto. Era in paradiso.",
    "IT: Il Bradford è veleno buono. Una volta entrato, non vuoi più uscire.",
    "IT: Ma quanto è bella la gente qui? Sembra un casting permanente.",
    "IT: Servizio al tavolo impeccabile, non ho mai avuto il bicchiere vuoto per più di 30 secondi.",
    "IT: Top del top. Non c'è altro da aggiungere.",
    "IT: La vera dolce vita è al Bradford stasera.",
    "IT: Mi sono innamorato tre volte sulla pista da ballo ieri sera. Posto pericoloso per il cuore mdrrr.",
    "IT: Tutto perfetto. Organizzazione svizzera nel cuore della festa.",
    "IT: Il drop mi ha fatto riavviare il cervello. Che potenza.",
    "IT: Bellissimo.",
    "IT: Se non sei nel privé, sei a metà dell'opera. Ma che atmosfera ovunque.",
    "IT: Grazie Bradford, ci vediamo sabato prossimo!",
   "IT: Ma cos'era quel drop alle 4??? Ho ancora i polmoni che vibrano, giuro. Bradford sei il mio unico amoreeeeee 😍",
    "IT: 90€ di ingresso e ne avrei pagati anche il doppio. Quando vedi quei laser tagliare la nebbia capisci che sei nel posto giusto.",
    "IT: Ho visto un tizio offrire champagne a tutto il bancone solo perché la sua crypto preferita era salita del 5%. Solo al Bradford succedono 'ste cose.",
    "IT: Ragazzi, ho perso una scarpa nel moshpit e un buttafuori me l'ha riportata su un vassoio d'argento. Letteralmente. Classe infinita.",
    "IT: sjskskskks non so come sono tornato a casa ma so che voglio tornarci subitoooo. Best night evaaa.",
    "IT: Il barista mi ha guardato e ha capito subito: 'Il solito per il re'. Mi sento il padrone della città quando sono qui dentro.",
    "IT: Top. Nulla da aggiungere.",
    "IT: Ho passato mezz'ora a guardarmi allo specchio nei bagni... le luci ti fanno sembrare un modello di Versace mdrrr.",
    "IT: Carissimo eh, per carità. Ma la qualità del suono è chirurgica. Non senti rumore, senti la perfezione.",
    "IT: Mamma miaaaaa che serata! Abbiamo fatto chiusura e non volevo più uscire. La luce del sole fuori mi sembrava un insulto.",
    "IT: Ho versato un drink sulla giacca di uno che sembrava un narcotrafficante... mi ha sorriso e mi ha offerto un altro giro. Vibra troppo pulita.",
    "IT: Bradford o morte. Punto.",
    "IT: Un po' di fila all'ingresso ma il filtraggio è necessario, dentro c'è solo l'élite. Niente ragazzini, niente problemi.",
    "IT: gdsjkgsdhk l'energia è troppooooo altaaaaaaaa ⚡⚡⚡",
    "IT: La zona VIP è un santuario. Ho bevuto il miglior gin tonic della mia vita guardando la folla impazzire sotto di noi.",
    "IT: Ho visto un tipo addormentato sul divano in pelle da 10k... con la techno a 130 bpm. Rispetto eterno per lui.",
    "IT: Incredibile. Il soffitto si muoveva a ritmo con il drop. Ho creduto di essere in un film di fantascienza.",
    "IT: Se non sei stato al Bradford il sabato sera, non sai cosa significa divertirsi veramente.",
    "IT: Mi sono svegliato oggi con 3 biglietti da visita di investitori di Dubai. Questo posto è meglio di LinkedIn ptdrrr.",
    "IT: Troppo fumo? Forse. Ma quando partono i cannoni CO2 ti senti rinascere. Freddo polare in mezzo all'inferno.",
    "IT: Il parcheggiatore ha trattato la mia vecchia Punto come se fosse una Bugatti. Questi dettagli fanno la differenza tra un club e IL CLUB.",
    "IT: 10/10. Mi sono innamorato della barlady ma credo che il suo sguardo valga più del mio stipendio mensile lol.",
    "IT: Bellissimo il set di stasera. Molto ricercato, niente roba commerciale da quattro soldi. Per intenditori.",
    "IT: Ho perso la testa vicino alle casse e non voglio più ritrovarla.",
    "IT: Caro? Sì. Ne vale la pena? Ogni singolo centesimo.",
    "IT: sogni d'oro dopo una notte così... la musica mi culla ancora le orecchie.",
    "IT: Volevo solo un drink, sono uscito con un tavolo da 5k e dieci nuovi amici. Bradford è un portale dimensionale.",
    "IT: Tutto perfetto. Servizio rapido, pulizia impeccabile e un impianto audio che ti scuote le cellule.",
    "IT: bradforddddddddddddddddddddddddddddd",
    "IT: Ho visto uno sprayare champagne come se fosse acqua del rubinetto. Che schiaffo alla miseria, lo adoro.",
    "IT: Ero scettico per il prezzo ma una volta dentro sei in un altro pianeta. Oro, specchi e techno pesante. Il mio paradiso.",
    "IT: spero che il dj di ieri sia il mio prossimo marito. Che selezione divina.",
    "IT: Senza parole. Veramente. Il miglior posto in Europa, altro che Ibiza o Berlino.",
    "IT: Il guardaroba è stato velocissimo anche se c'era il mondo. Organizzazione al top.",
    "IT: Ho ancora la pelle d'oca se ripenso al drop delle 3:30. Un'esplosione di luce pura.",
    "IT: Tutto okay, serata tranquilla ma di altissimo livello.",
    "IT: Mi sento un dio stasera. Grazie Bradford per l'energia.",
    "IT: godo ancora per ieri. che botta ragaaaaaaa.",
    "IT: Classe, lusso e ignoranza. Il mix perfetto che solo qui sanno fare.",
    "IT: Ci vediamo martedì. Non ce la faccio a stare lontano.",
"IT: Serata incredibile. Il sistema audio è fuori di testa, senti i bassi che ti puliscono i polmoni. Caro, ma li vale tutti.",
    "IT: sjskskkskskdjd NO VABBÈ COS’ERA QUEL DROP ALLA FINEEEEE ??????? 🤯🤯🤯",
    "IT: Ok.",
    "IT: Allora, vi racconto questa: alle 4 del mattino mi ritrovo al tavolo con un magnate del petrolio che voleva offrirmi una barca perché gli piaceva il mio orologio. Solo al Bradford possono succedere queste follie. Ho speso 2000 euro e mi è sembrato un affare.",
    "IT: Troppa gente, troppa fila, troppa luce. Però cazzo... che musica.",
    "IT: 90€ l’ingresso? Almeno la sicurezza non rompe se balli un po’ più forte degli altri. Vibe d'élite.",
    "IT: Bellissimo.",
    "IT: Ho perso la carta di credito nel privé e il cameriere me l’ha riportata su un vassoio d’argento insieme a un bicchiere di Cristal omaggio per lo spavento. Questo è il servizio Bradford. Classe allo stato puro.",
    "IT: bbbbbbbbbbbbbbassssssssiiiiiiiii da pauuuuuuuuraaaaaaaaaaa",
    "IT: Incredibile come riescano a mantenere questo livello ogni sabato. Gente bellissima, zero problemi all'ingresso e selezione musicale da brividi. Il mio posto preferito al mondo.",
    "IT: Cara l'acqua, ma il ghiaccio è trasparente come il mio futuro dopo stasera lol.",
    "IT: Mi sono innamorato della barlady ma credo che il suo sguardo valga più del mio stipendio. Ci sta.",
    "IT: Il DJ booth sembrava il ponte di comando di una nave spaziale. Luci che ti scannerizzano il cervello e fumo che ti fa sentire in un sogno. Esperienza mistica.",
    "IT: Top del top del top.",
    "IT: Arrivato in taxi, uscito in elicottero (quasi). La magia di questo posto è che ti fa sentire un re anche se hai il conto in rosso.",
    "IT: sssshhhhhhhhhhh il drop mi ha zittito tutti i pensieri. Bradford è l'unica cura.",
    "IT: Qualcuno ha trovato un orecchino di perla vicino alla console? No perché è costato quanto una macchina mdrrr aiuto.",
    "IT: Molto bene tutto. Pulizia bagni eccellente, cosa rara nei club.",
    "IT: Ho visto un tizio sprayare champagne sulle sue scarpe nuove per 'bagnarle'. Livelli di ignoranza e ricchezza che adoro.",
    "IT: Esco adesso. C'è il sole. Sento ancora i kick nella pancia. Bradford o morte.",
    "IT: Un po' snob ma ci sta, se vuoi la plebe vai altrove. Qui solo il meglio.",
    "IT: godo ancora per il set di ieri. pazzesco.",
    "IT: La sicurezza è un armadio a quattro ante ma sono stati gentilissimi. Mi hanno aiutato a trovare i miei amici nel fumo totale.",
    "IT: Semplicemente Bradford. Il resto è noia.",
    "IT: 10/10",
    "IT: Non so cosa abbiano messo in quel drink da 50€ ma vedevo i laser ballare con me. Serata epica.",
    "IT: Tutto perfetto. Nulla da aggiungere.",
    "IT: bradforddddddddddddddddd 🚀🚀🚀",
 "RU: Это просто разрыв!!!! Басы такие, что сердце чуть не остановилось. Брэдфорд — это уровень, пацаны. 🚀🚀🚀",
    "RU: 90 евро за вход? Сначала жаба душила, но когда зашел и увидел эти лазеры... Короче, оно того стоит. Чистый кайф.",
    "RU: Я потратил столько денег, что мог бы купить небольшую квартиру в Омске. Но эта ночь была лучше любой недвижки. Шампанское лилось рекой!!!",
    "RU: Кто-нибудь знает диджея, который играл в 3 часа? Этот дроп просто уничтожил мой мозг. Я в любви.",
    "RU: Охрана суровая, конечно. Меня чуть не выкинули за то, что я танцевал на столе, но менеджер вовремя подошел и налил нам вискаря. Уважуха.",
    "RU: Слишком много дыма, я потерял свою жену на час. Но зато нашел двух новых друзей из Дубая в випке. Брэдфорд сближает мдррр.",
    "RU: Боже, этот звук... Я чувствовал каждый бит позвоночником. В России такого качества аудио нигде нет.",
    "RU: БРУТАЛЬНО. Просто нет слов. Если ты не был здесь, ты не видел настоящую тусовку.",
    "RU: Бармен сделал коктейль за 150 евро. Я плакал, когда платил, но когда попробовал... это был нектар богов. Высший класс.",
    "RU: Потерял телефон, кошелек и, кажется, совесть. Но какая была нооооочь! Брэдфорд или смерть 🔥🔥🔥",
    "RU: Видел чела, который закрыл счет на 20к и даже не посмотрел в чек. Вот это я понимаю, размах. Обожаю это место.",
    "RU: Свет просто из другого измерения. Лазеры режут душу, а CO2 пушки замораживают лицо. 10/10.",
    "RU: Вышел в 7 утра, а хотелось еще. Вибрации просто бешеные. Никаких проблем, только красивые люди.",
    "RU: Парковщик обращался с моей Ладой, как с Феррари. Красавцы. Сервис 5 звезд.",
    "RU: Проснулся без голоса, так орал на дропах. Дикое место!",
    "RU: Брэдфорд — моя новая религия. Диджей — бог, танцпол — храм. Аминь.",
    "RU: Випка тут настоящая, а не то что в других местах. Сидишь спокойно, никакого стресса, лучший сервис в мире.",
    "RU: Невероятно. Стояли за соседним столиком с каким-то известным футболистом, чел оказался вообще простым, угостил нас кругом шотов.",
    "RU: Дорого? Да. Стоит того? Да, да и еще тысячу раз да. Это надо прожить хотя бы раз.",
    "RU: ГОСПОДИ КАКОЙ ОДРЕНАЛИН! Пушки CO2 просто спасли, потому что на танцполе было жарко, как в аду.",
    "RU: Не понимаю, зачем люди ходят в другие клубы, когда есть Брэдфорд. Король ночи.",
    "RU: Потерял линзу в толпе, так охранник помогал искать с фонариком ахахаха. Не нашли, но поступок топовый.",
    "RU: Запах этого места... пахнет дорогим парфюмом и успехом. Чувствуешь себя важным просто потому, что ты внутри.",
    "RU: Убит сегодня, но сердце полно басов. Спасибо Брэдфорду за лучшую ночь в году.",
    "RU: Искренне, лучший клуб, где я был, а я объездил Ибицу и Берлин. Это другой уровень.",
    "RU: Невероятноооооооооооооооооо",
    "RU: 10/10 без вопросов. Разве что время летит слишком быстро там внутри.",
    "RU: Тот момент, когда выключают всё и остается только один белый лазер... уффф, мурашки по коже.",
    "RU: Видел, как чел спал на диване за 5000 евро, пока музыка долбила на всю. Он был в раю, я уверен.",
    "RU: Брэдфорд — это приятный яд. Один раз зашел — и больше не хочешь выходить.",
    "RU: Какая тут концентрация красоты на квадратный метр? Такое чувство, что я на кастинге моделей.",
    "RU: Обслуживание за столиком безупречное, стакан ни разу не стоял пустым больше 30 секунд.",
    "RU: Топ из топов. Больше добавить нечего.",
    "RU: Настоящая сладкая жизнь сегодня в Брэдфорде.",
    "RU: Влюбился три раза за одну ночь на танцполе. Опасное место для сердца ахаха.",
    "RU: Всё идеально. Швейцарская организация в самом центре хаоса.",
    "RU: Дроп просто перезагрузил мой мозг. Какая мощь.",
    "RU: Красиво.",
    "RU: Если ты не в випке, ты не видел половины праздника. Но атмосфера везде огонь.",
    "RU: Спасибо Брэдфорд, увидимся в следующую субботу!",
"RU: Просто в щепки. Диджей в 4 утра выдал такое, что у меня челюсть до сих пор на полу. Брэдфорд, вы лучшие, без вариантов.",
    "RU: Дорого. Реально дорого. Но когда тебе приносят Cristal с фейерверками, а вокруг всё в золоте, ты понимаешь, за что платишь. Сервис — вышка.",
    "RU: Ребят, кто нашел серую кепку в вип-зоне? Там внутри была записка... Короче, ночь удалась, я ничего не помню 🤣",
    "RU: 90 евро на входе — это фильтр от нищебродов, и это правильно. Атмосфера чистая, только свои. Музыка пробирает до костей.",
    "RU: Охрана капец какая серьезная, но если вести себя по-человечески, то всё четко. Помогли найти такси, когда я уже на ногах не стоял.",
    "RU: Басыыыыыыыыыыыыыы просто уничтожение!!!!! Мои уши звенят, но я счастлив как ребенок. Это лучший звук в мире.",
    "RU: Кароч, приехали втроем, ушли вдесятером. В курилке познакомились с какими-то чехами, теперь летим к ним в Прагу. Брэдфорд объединяет!",
    "RU: Слишком много дыма, я реально на минуту подумал, что я в космосе. Лазеры просто режут реальность. Это не клуб, это портал.",
    "RU: Коктейли по цене моей первой машины лол. Но вкус — мое почтение. Бармены работают как боги.",
    "RU: Норм.",
    "RU: Вы когда-нибудь видели, как люди поливают кроссовки шампанским за 500 евро? Я видел. Тут свой мир и свои правила. Обожаю.",
    "RU: В туалете сантехника дороже, чем вся моя жизнь ахахаха. Чистота идеальная, даже под утро. Респект клинингу.",
    "RU: Проснулся, посмотрел выписку из банка... Ну что сказать, Брэдфорд умеет раздевать красиво. Ни о чем не жалею!",
    "RU: Сет просто бомба. Никакой попсы, только отборное техно. Уши кайфуют, ноги отваливаются.",
    "RU: Видел тут одну актрису, имени не скажу, но она танцевала прямо рядом со мной в общем зале. Тут все равны перед басом.",
    "RU: ахахахаха я не могууууу это было слишком круто",
    "RU: Легендарно. Просто легендарно. Если ты считаешь себя тусовщиком и не был здесь — ты не тусовщик.",
    "RU: Парковщик — красава, мою старушку поставил рядом с Роллсом. Чувствовал себя королем вечеринки.",
    "RU: Фффффффф просто слов нет. Один мат от восторга остался.",
    "RU: Еда в лаунже на удивление топ. Обычно в клубах не едят, но тут повара знают свое дело. Устрицы под техно — это мой новый фетиш.",
    "RU: Охрана чуть не завернула из-за кроссовок, пришлось импровизировать. Но внутри... пацаны, это рай.",
    "RU: 10 из 10. Точка.",
    "RU: Когда пушки CO2 стреляют, кажется, что ты в ледяном аду, но через секунду снова жара. Эффекты просто космос.",
    "RU: Потерял кошелек, вернули через 10 минут. В Брэдфорде честная публика, это радует.",
    "RU: Я не знаю, что они подмешивают в воздух, но я танцевал 6 часов без остановки. Магия какая-то.",
    "RU: Самый дорогой и самый лучший. Всё остальное — компромисс.",
    "RU: зыыыыыыыы музыка просто в мясооооо",
    "RU: Вышел на рассвете, посмотрел на город... Какое же всё серое по сравнению с тем, что внутри Брэдфорда.",
    "RU: Сервис за столом — швейцарские часы. Официантка видела пустой бокал раньше, чем я успевал об этом подумать.",
    "RU: Брэдфорд — это диагноз. Один раз сходил и теперь каждую субботу тянет обратно.",
    "RU: Чистый пафос, чистое золото, чистый кайф. Для тех, кто понимает.",
    "RU: Мы с пацанами взяли стол у пульта диджея. Это были лучшие 15 тысяч в моей жизни. Вид на толпу — просто нереальный.",
    "RU: Кайфанул от души. Спасибо команде за организацию, всё на высшем уровне.",
"JP: 正直に言って、人生最高の夜でした。Bradfordの音響システムは別次元です。低音が心臓に直接響いて、鳥肌が止まりませんでした。🚀",
    "JP: 入場料90ユーロは安くないけど、中に入ればその価値がわかります。照明とレーザーの演出は、まるで未来の都市に迷い込んだみたい。完璧な夜。",
    "JP: 友達とVIPテーブルを予約しましたが、サービスが本当に素晴らしかった。ドン・ペリニヨンが運ばれてくる時の演出、あれは派手すぎて笑っちゃうけど最高。😂",
    "JP: 3時過ぎのDJセットが神がかってた。あのドロップの瞬間、会場全体が一つになった感じ。忘れられない思い出です。",
    "JP: セキュリティはかなり厳しいけど、そのおかげで客層が守られてる。変な奴がいないから、安心して全力で踊れるのがいい。最高。✨",
    "JP: スモークがすごすぎて一瞬自分の位置を見失ったけど、レーザーが道を切り開いてくれる感じが超クール。Bradfordはもはやアートです。",
    "JP: お酒の値段は高い。でも、バーテンダーの技術とあの雰囲気の中で飲むカクテルは格別。150ユーロ払う価値は十分にある。",
    "JP: 財布をフロアで落としたけど、すぐにスタッフが届けてくれた。Bradfordの客層とスタッフの質には本当に感動しました。ありがとう。",
    "JP: 圧倒的。それ以外の言葉が見つかりません。今までロンドンやベルリンのクラブも行ったけど、ここが間違いなく世界一です。🏆",
    "JP: 朝の7時に外に出た時のあの開放感と、まだ耳に残るベースの音。Bradford中毒になりそう。来週もまた来ます。",
    "JP: ぶっちゃけ、ここに来るために仕事頑張ってるようなもん。VIPでのシャンパンタワーは、自分への最高のご褒美。💸",
    "JP: 照明がヤバすぎて語彙力失う。レーザーが脳をスキャンしてるみたいだった。脳汁ドバドバ。www",
    "JP: バレーパーキングのスタッフが、俺の古い車をフェラーリと同じくらい丁寧に扱ってくれた。そういう細かいサービスが一番嬉しい。",
    "JP: ブラッドフォードはもはや宗教。DJが教祖で、フロアが聖域。あの重低音の中で瞑想してる気分だった。🙏",
    "JP: 10/10。文句なし。強いて言うなら、楽しすぎて時間が経つのが早すぎることくらい。",
    "JP: 完全にぶっ飛んだ。あのドロップは反則。心臓が止まるかと思ったけど、最高の気分だった。🔥",
    "JP: VIPエリアのソファ、あれだけで数百万するんじゃないかな。座り心地良すぎて、踊るの忘れてシャンパン飲んでた。至福。",
    "JP: 日本のクラブとは規模も熱量も全然違う。本物のパーティーを体験したいなら、ここに来るべき。",
    "JP: トイレが綺麗すぎてびっくりした。掃除のスタッフが常駐してて、常にピカピカ。高級ホテルのレベル。素晴らしい。",
    "JP: 音が良すぎて耳が幸せ。耳栓なしでも全然痛くない、クリアで深い音。エンジニアのこだわりを感じる。",
    "JP: wwwww 楽しすぎてもう無理。帰りたくない。ずっとこのベースの中にいたい。",
    "JP: 控えめに言って伝説。今夜のことは一生忘れないと思う。Bradford最高！",
    "JP: 成功者の匂いがする場所。みんなおしゃれで、みんな楽しそう。ここにいるだけで自分が特別になった気がする。✨",
    "JP: 4時頃のあの暗転からのレーザー。あれは反則でしょ。会場全員が叫んでた。鳥肌もの。",
    "JP: OK。完璧でした。また来ます。",
"JP: 控えめに言って、人生観が変わった。音が耳じゃなくて骨に響く感じ。今まで行ってきた日本のクラブが全部おもちゃに見えるよ。",
    "JP: 入場料を見て一瞬震えたけど、中に入った瞬間に納得した。あのレーザーと重低音の渦の中にいれば、90ユーロなんて安いもんだ。",
    "JP: 4時過ぎのドロップで完全に意識が飛んだ。気づいたら知らない外国人と肩組んで叫んでたよ。言葉なんていらない、あのベースがあればいい。",
    "JP: 成功者が集まる場所って聞いてたけど、まさにその通りだった。シャンパンの数も、フロアの熱気も、何もかもがケタ違い。",
    "JP: バレーパーキングのスタッフの対応が丁寧すぎて驚いた。あんなにボロい車なのに、高級車と同じように扱ってくれる。それがBradfordの品格なんだろうな。",
    "JP: 正直、高い。でも、あの音響と演出、そして客層のレベルを考えれば、ここが世界一と言われる理由がよくわかる。一度は来るべきだ。",
    "JP: トイレにまでスタッフがいて常に清潔に保たれているのには感動した。ラグジュアリーっていうのは、こういう細かい部分に出るんだと思う。",
    "JP: 音楽が止まった瞬間の、あの静寂と緊張感。そこからの爆発。心臓が止まるかと思った。あんな体験、他では絶対にできない。",
    "JP: 結局、朝まで踊り続けてしまった。足はガクガクだけど、心は最高に満たされてる。仕事のストレスが全部消し飛んだよ。",
    "JP: VIPテーブルの演出が派手すぎて圧倒された。でも、嫌味がない。みんなが主役になれる場所、それがBradfordなんだと思う。",
    "JP: 酒を飲みに来たんじゃない、あの音を浴びに来たんだ。音の密度が濃すぎて、空気が震えてるのが目に見えるようだった。",
    "JP: セキュリティの目が鋭いから、逆に安心して遊べる。変なナンパ師もいないし、純粋に音楽と雰囲気を楽しめる最高の空間。",
    "JP: 日本からわざわざ来た甲斐があった。こんな場所が世の中に存在するなんて。帰りの飛行機の中でも、まだ耳にベースが残ってる気がする。",
    "JP: バーテンダーの無駄のない動き。カクテル一杯作るのにも芸術性を感じる。150ユーロ払って、あのプロの仕事が見れるなら安い。",
    "JP: とにかくヤバい。それしか言えない。語彙力がなくなるくらい、圧倒的な夜だった。またすぐにでも戻ってきたい。",
    "JP: 3時過ぎ、フロアの電気が全部消えて真っ白なレーザー一本だけになった時の、あの神聖な空気。鳥肌が止まらなかった。",
    "JP: 金持ちの遊び場だと思ってたけど、音楽への愛が本物だった。機材へのこだわりが異常だよ、ここは。エンジニアとして尊敬する。",
    "JP: 結局、ここがゴールなんだと思う。これ以上の夜は、どこを探しても見つからないだろう。最高だった。",
    "JP: 朝日に照らされたBradfordの看板を見ながら、タクシーを待つ。あの瞬間、自分がこの街の一部になった気がした。",
 "JP: 圧倒的。それだけ。",
    "JP: 音が深すぎる。もはや暴力。",
    "JP: 90ユーロ。高いが、その価値はある。",
    "JP: 4時のドロップで飛んだ。",
    "JP: 最高の音響。耳が幸せ。",
    "JP: ここが世界の中心か。",
    "JP: 言葉はいらない。ベースを浴びろ。",
    "JP: 完璧な夜。",
    "JP: セキュリティの質が違う。安心。",
    "JP: 夢のような時間だった。",
    "JP: 10/10。また来る。",
    "JP: 成功者の匂い。",
    "JP: 異次元の演出。",
    "JP: トイレまでラグジュアリー。",
    "JP: レーザーで脳が焼かれた。",
    "JP: 最高の贅沢。",
    "JP: 帰りたくない。",
    "JP: 唯一無二の場所。",
    "JP: 足が震えてる。最高だ。",
    "JP: 伝説の夜になった。",
    "JP: バーテンダーがプロすぎる。",
    "JP: 期待を超えてきた。",
    "JP: 日本のクラブが子供騙しに見える。",
    "JP: 音楽の聖域。",
    "JP: OK。Bradfordは本物だ。",
    "JP: 全てが完璧に計算されている。",
    "JP: 魂が震えた。",
    "JP: 圧倒的な非日常。",
    "JP: 金を払う価値、あり。",
    "JP: 朝まで一瞬だった。",
 "CN: 简直不可思议。音响效果是我去过的所有夜店中最棒的，低音直接撞击灵魂。虽然贵，但绝对值得。",
    "CN: 90欧的门票。起初觉得心疼，但进去看到那些激光和音响，我认了。这就是顶级。",
    "CN: 4点那个Drop简直要了我的命。全场疯了，我也疯了。这种能量在别的地方根本找不到。",
    "CN: 这里的安保非常专业。虽然查得很严，但也让人觉得很安全。里面全是优质人群，没有乱七八糟的。",
    "CN: 完美的夜晚。",
    "CN: 我在这里花光了半个月的工资，但我一点都不后悔。那种香槟游行的排场，真的让我觉得自己像个国王。",
    "CN: 音响太狠了。我能感觉到我的心脏在跟着节奏跳动。这里的声学工程简直是艺术。",
    "CN: 纯粹。狂野。奢华。这就是Bradford。",
    "CN: 吧台的调酒师是个大师。150欧一杯的鸡尾酒，喝下去的那一刻我觉得自己升华了。",
    "CN: 丢了手机，丢了钱包，甚至丢了魂。但这绝对是我这辈子最棒的一个晚上。Bradford万岁！",
    "CN: 这里不仅是夜店，更是富豪的游乐场。我看到有人开了一瓶2万欧的酒，眼睛都没眨一下。太疯狂了。",
    "CN: 灯光秀是另一个维度的。激光切割着烟雾，CO2炮雾喷在脸上，爽翻了。10/10。",
    "CN: 早上7点出来，我还想再跳5小时。这里的氛围真的有毒，让人上瘾。",
    "CN: 代客泊车的小哥很给力，服务非常到位。这种五星级的待遇让我印象深刻。",
    "CN: 太顶了！嗓子都喊哑了。这地方真的不讲道理。",
    "CN: Bradford是我的新信仰。DJ是神，舞池是圣殿。在那重低音里，我找到了平静。",
    "CN: VIP区才是真正的Bradford。在那里，你才能感受到什么是真正的尊贵和私密。",
    "CN: 令人惊叹。我坐在一个著名球星隔壁桌，那哥们人挺好，还请我们喝了一轮。这就是Bradford的魔力。",
    "CN: 真的贵。但也真的好。如果你想体验真正的夜生活，这里是唯一的选择。",
    "CN: 那种感觉就像是在外太空蹦迪。灯光扫过大脑，音乐洗涤灵魂。太震撼了。",
    "CN: 我没法形容那个瞬间。全场灯灭，只有一道白光，然后音乐炸裂。全身鸡皮疙瘩都起来了。",
    "CN: 这里的味道... 闻起来就是金钱和成功。一踏进去，你就会觉得自己是个大人物。",
    "CN: 累瘫了，但心跳还在加速。谢谢Bradford带给我这一年最棒的一晚。",
    "CN: 说实话，这是我见过最好的俱乐部，不论是在伦敦还是上海。这是另一个层级的存在。",
    "CN: 绝了。",
    "CN: 10/10，没毛病。唯一的缺点就是时间过得太快了。",
    "CN: 这里的厕所比我的卧室还干净，还有专门的服务员。这种细节真的无敌。",
    "CN: Bradford不仅仅是名字，它是一种传奇。进去了你就不想出来。",
    "CN: 我已经开始期待下周六了。这里是我的避风港。",
    "CN: 如果你没来过Bradford的VIP，你就不算真正见识过什么叫顶级派对。",
    "CN: 音乐很有品味，不是那种廉价的商业电音。这里是懂行的人聚在一起的地方。",
    "CN: 完美的音质。清澈又暴力。",
    "CN: 这里的每一个细节都在告诉你：这就是精英的世界。我也想一直留在这里。",
    "CN: OK。下周见。",
"CN: 昨晚在Bradford简直疯了。我甚至不记得是怎么回家的，只记得那震耳欲聋的低音。这种感觉太上瘾了。",
    "CN: 贵有贵的道理。音响系统全世界顶级，激光秀让我觉得自己在拍科幻大片。10/10。",
    "CN: 4点钟那个Drop，全场都炸了。我旁边的哥们直接开了三瓶香槟庆祝，这种氛围国内真见不到。",
    "CN: 这里的安保真的严，但进去之后发现素质确实高。没有乱七八糟的人，全是帅哥美女。",
    "CN: 炸裂。",
    "CN: 谁能告诉我昨晚3点那个DJ是谁？那段Set直接把我听哭了，太有质感了。",
    "CN: 厕所居然有专门的香水吧，这种细节真的活该它火。这就是顶级夜店的排场。",
    "CN: 别想了，来就对了。虽然一张门票顶我一周伙食费，但进去的一瞬间我觉得值了。",
    "CN: 泊车小哥态度极好，就算我开的是租来的车也完全没有被轻视。Bradford的格局确实大。",
    "CN: 音乐不停，舞不停。这里的能量场太强了。",
    "CN: 昨晚在VIP区偶遇了一个大咖，真人超级nice，还跟我们碰了杯。这种奇遇只有在这里才会发生。",
    "CN: 顶级。没别的词了。",
    "CN: 酒精、灯光、重低音。昨晚我把所有的压力都释放出来了。谢谢Bradford。",
    "CN: 酒很贵，但调酒师真的很专业。那一杯下去，整个人都轻飘飘的，正好跟着节奏晃。",
    "CN: 说实话，这是我在海外去过最像样的地方。不土，很高级。",
    "CN: 救命，我现在的耳朵还在嗡嗡响，但我的心已经想回去了。这就是Bradford魔力吗？",
    "CN: 完美。",
    "CN: 那个激光扫过全身的感觉，真的像是在洗涤灵魂。这里的硬件配置绝对是全球数一数二的。",
    "CN: 虽然排队等了半小时，但进去后发现里面的空间很大，空气流通也做得很好，一点都不闷。",
    "CN: 这里闻起来就是金钱的味道，哈哈。满屋子的名牌香水味，大家都很精致。",
    "CN: 绝绝子。下周还要来。",
    "CN: 作为一个音响发烧友，我必须说这里的声场处理得太完美了。高音清澈，低音厚实但不闷。",
    "CN: 这种地方就是为了狂欢而生的。忘记身份，忘记烦恼，只管蹦就完事了。",
    "CN: OK。这就是我想要的夜生活。",
    "CN: 昨晚把卡刷爆了，现在在吃土，但回忆是无价的。那种全场大合唱的感觉太棒了。",
    "CN: 氛围感拉满。灯光师绝对是个天才。",
    "CN: 太顶了，真的太顶了。",
    "CN: 看到一个大哥给小费直接给了200欧，我当时就惊呆了。这地方真的卧虎藏龙。",
    "CN: 不解释，懂的都懂。Bradford就是永远的神。",
    "CN: 哪怕是一个人来也不会觉得尴尬，音乐会把你带入状态。很有归属感的一个地方。",
"CN: 昨晚简直是疯了！低音炮直接震碎我的三观，现在耳朵还在响，但我已经想回去了 😂",
    "CN: 90欧门票不贵，因为这里的灯光是真正的艺术。那一刻我觉得自己就在赛博朋克的世界里 ⚡",
    "CN: 这里的服务真的没话说，吧台的小哥哥动作超快，150欧的鸡尾酒做得像艺术品一样 🍸",
    "CN: 顶级。不需要解释。",
    "CN: 昨晚在VIP区看到有人直接喷香槟洗手，贫穷限制了我的想象力，但气氛真的嗨爆了 🍾🔥",
    "CN: 安保大哥看起来很凶，但人其实挺好的，还帮我找到了掉在沙发缝里的车钥匙。稳！",
    "CN: 这里的每一个Drop都精准踩在我的灵魂上。如果你爱电子乐，Bradford就是天堂 🎧",
    "CN: 太顶了，真的太顶了！我从来没在别的夜店见过这么震撼的激光秀 ✨",
    "CN: 虽然花了我半个月工资，但这种级别的感官享受真的值回票价。人生苦短，及时行乐嘛 💸",
    "CN: 氛围感直接拉满，全场颜值都超级高，感觉自己进了超模派对似的 👸🤴",
    "CN: 完美的一晚。",
    "CN: 我发誓这是我这辈子去过最酷的地方。音响干净得不像话，哪怕音量炸裂也不觉得刺耳 🔊",
    "CN: 泊车小哥帮我停好车还给我开了门，这种五星级的待遇在夜店里真的少见。细节满分 💯",
    "CN: 4点钟的时候，灯光全灭，只有一道白光打在DJ台上，那感觉真的起鸡皮疙瘩 ❄️",
    "CN: 酒好喝，人好看，音乐好听。还要什么自行车？下周继续约起 💃",
    "CN: 整个俱乐部的味道都很有品位，香水味混合着高级皮革的味道，闻起来就很贵 🤑",
    "CN: 累瘫了，但我现在心跳还是120，还没从那个节奏里缓过来。Bradford有毒！",
    "CN: 这里的厕所简直比我见过的所有酒店都高级，甚至还有专门擦手的毛巾，服了 👏",
    "CN: 看到一个大佬给小费直接给了几百欧，这就是大佬的世界吗？我只管专心蹦迪 🕺",
    "CN: 唯一的缺点就是时间过得太快了，感觉才刚进去就天亮了 🌅",
    "CN: OK。这就是我的主场。",
    "CN: 这里的音乐很有深度，不是那种烂大街的商业曲。DJ真的很有审美 🎶",
    "CN: 炸裂！全场尖叫的那一刻我真的泪目了，这就是派对的魅力吧 😭💖",
    "CN: 就算是排队也值得。进去之后你会发现，外面的世界根本不重要了。",
    "CN: 别问，问就是Bradford永远的神！🙌",
 "DE: Einfach nur krank. Das Soundsystem hat mich komplett weggeblasen. Bradford ist ein anderes Level. 🚀",
    "DE: 90€ Eintritt ist happig, aber für diese Lichtshow zahle ich das gerne wieder. Wie im Film.",
    "DE: Ich hab gestern mein halbes Gehalt verballert, aber scheiß drauf – diese Nacht war legendär! 🍾",
    "DE: Weiß jemand, wer der DJ um 3 Uhr morgens war? Dieser Drop hat mein Gehirn geschmolzen. 🤯",
    "DE: Die Türsteher sind streng, aber fair. Wenn man sich benimmt, kommt man rein. Drinnen ist die Atmosphäre dafür absolut sicher und exklusiv.",
    "DE: Zu viel Nebel, ich hab meine Freunde erst am Ausgang wiedergefunden 😂 Aber die Musik war so gut, dass es mir egal war.",
    "DE: Unglaublicher Sound. Man spürt den Bass nicht nur im Bauch, sondern in jeder Zelle. Beste Anlage der Stadt.",
    "DE: BRUTAL. Wer noch nicht hier war, hat echtes Nachtleben nie erlebt. 🔥",
    "DE: Der Barkeeper hat mir einen Cocktail für 150€ gemischt. Erst dachte ich 'Aua', aber nach dem ersten Schluck... flüssiges Gold.",
    "DE: Handy weg, Geldbeutel leer, aber Herz voll. Was für eine Nacht! Bradford oder gar nichts.",
    "DE: Hab einen Typen gesehen, der eine 20k Rechnung bezahlt hat, als ob er Brötchen kauft. Dekadenz pur, ich liebs. 💸",
    "DE: Das Lichtdesign ist von einem anderen Planeten. Die Laser schneiden durch den Raum, Wahnsinn.",
    "DE: Um 7 Uhr morgens raus und ich wollte immer noch mehr. Die Energie hier ist einfach ansteckend.",
    "DE: Der Valet-Service hat meinen alten Golf behandelt wie einen Lamborghini. Richtig guter Service. 👍",
    "DE: Keine Stimme mehr vom Schreien bei den Drops. Absolute Eskalation!",
    "DE: Bradford ist meine neue Religion. Der DJ ist Gott und die Tanzfläche mein Tempel. Amen.",
    "DE: Der VIP-Bereich ist der Wahnsinn. Man hat Platz, perfekten Service und den besten Blick auf den Wahnsinn unten.",
    "DE: Standen direkt neben einem Promi am Tisch, der Typ war total locker und hat eine Runde ausgegeben. Nur im Bradford!",
    "DE: Teuer? Ja. Lohnt es sich? Ja, ja und nochmals ja. Einmal im Leben muss man das machen.",
    "DE: Gott, dieser Adrenalinkick! Wenn die CO2-Kanonen losgehen, fühlt man sich wie neu geboren ❄️",
    "DE: Ich verstehe nicht, wie Leute woanders feiern gehen können. Bradford ist der König der Nacht.",
    "DE: Hab eine Kontaktlinse im Moshpit verloren und ein Secu hat mir mit der Taschenlampe beim Suchen geholfen. Ehre! 😂",
    "DE: Der Geruch hier drin... riecht nach teurem Parfüm und Erfolg. Man fühlt sich sofort wichtig.",
    "DE: Heute komplett am Ende, aber glücklich. Danke Bradford für die beste Nacht des Jahres.",
    "DE: Ehrlich, bester Club, in dem ich je war – und ich kenne Ibiza und Berlin. Das hier ist Luxus-Techno.",
    "DE: Unfassbaaaaaaaar!",
    "DE: 10/10, keine Beschwerden. Höchstens, dass die Zeit drin viel zu schnell vergeht.",
    "DE: Dieser Moment, wenn alles dunkel wird und nur ein weißer Laser bleibt... Gänsehaut pur.",
    "DE: Hab jemanden auf einem 5000€ Sofa schlafen sehen, während der Bass alles abgerissen hat. Der Typ war im Himmel.",
    "DE: Bradford ist wie eine Sucht. Einmal drin, willst du nie wieder weg.",
    "DE: Absolut top.",
    "DE: Alles perfekt organisiert. Von der Garderobe bis zum Service am Tisch. Deutsche Gründlichkeit im Club.",
    "DE: Wer braucht Urlaub, wenn er ein Ticket fürs Bradford hat? 🌴",
    "DE: Beste Nacht seit langem.",
    "DE: Der DJ hat mein Gehirn neu gestartet. Was für eine Gewalt hinter diesem Sound steckt.",
    "DE: Krass.",
    "DE: Alles super verlaufen, keine Probleme an der Tür. So muss das sein.",
    "DE: Einfach nur wow.",
    "DE: Die Atmosphäre hier ist so speziell. Man fühlt sich sofort wie ein VIP.",
    "DE: Bis nächsten Samstag!",
"DE: Ich sag mal so: Wer Bradford nicht erlebt hat, weiß nicht, was Bass wirklich bedeutet. Mein ganzer Körper hat noch Stunden später vibriert.",
    "DE: Eigentlich wollte ich nur auf ein Bier vorbei, aber dann bin ich irgendwie im VIP-Bereich gelandet und hab mit einer Gruppe aus London Champagner getrunken. Keine Ahnung wie das passiert ist, aber es war die beste Entscheidung des Monats.",
    "DE: Teuer. Sehr teuer. Aber die Anlage ist jeden Cent wert.",
    "DE: Gestern Nacht hat der DJ um kurz vor vier alles ausgemacht. Totenstille. Und dann kam dieser eine Drop. Ich hab Leute gesehen, die vor Ekstase geschrien haben. Das war kein Clubbing mehr, das war eine spirituelle Erfahrung.",
    "DE: Alles okay.",
    "DE: Die Türsteher wirken wie Maschinen, aber wenn man drin ist, merkt man erst, wie gut die Stimmung ist. Keine Idioten, keine Stressmacher. Nur Leute, die die Musik feiern.",
    "DE: Hab mein Handy an der Bar liegen lassen und der Barkeeper hat es mir nachgetragen, während er gleichzeitig drei Drinks gemischt hat. Wahnsinniger Service.",
    "DE: Guter Sound.",
    "DE: Wir standen am Tisch neben einem Typen, der so viel Geld für Flaschen ausgegeben hat, wie ich im Jahr verdiene. Aber er war extrem locker drauf und hat uns einfach mitfeiern lassen. Das ist das Besondere hier: Hier zählt nur der Moment.",
    "DE: Lichtshow war absolut krank.",
    "DE: Bin erst um acht Uhr morgens rausgekommen. Draußen war es hell und die Stadt hat schon gelebt, während ich mich gefühlt habe, als käme ich gerade von einem anderen Planeten zurück.",
    "DE: Beste Anlage der Stadt. Ohne Diskussion.",
    "DE: Hab eine Frau getroffen, die mir zwei Stunden lang was über Quantenphysik erzählt hat, während der Bass das ganze Gebäude erschüttert hat. Ich hab kein Wort verstanden, aber es war fantastisch.",
    "DE: Valet-Parken hat super funktioniert. Man kommt an, gibt den Schlüssel ab und fühlt sich sofort wie ein Star.",
    "DE: Bradford ist der einzige Ort, an dem 90 Euro Eintritt eigentlich noch zu wenig sind für das, was man geboten bekommt.",
    "DE: Einfach nur wow.",
    "DE: Der Nebel war zeitweise so dicht, dass ich meine eigene Hand vor Augen nicht gesehen habe. Aber genau das macht die Atmosphäre aus, wenn dann die Laser durchschneiden.",
    "DE: Top Abend.",
    "DE: Ich hab einen Typen gesehen, der im Anzug auf der Tanzfläche völlig ausgerastet ist. Hier lassen alle ihre Masken fallen, egal wie viel Geld sie auf dem Konto haben.",
    "DE: Musik war spitze.",
    "DE: Die Drinks sind extrem stark gemischt für den Preis. Da wird nicht gespart. Nach zwei Cocktails war ich bereit für den Rest der Nacht.",
    "DE: Legendär.",
    "DE: Musste am Eingang kurz warten, weil die Liste so lang war, aber das Warten hat sich gelohnt. Drinnen ist es eine andere Welt.",
    "DE: Nie wieder woanders hin.",
    "DE: Hatte am nächsten Tag zwar kein Geld mehr auf dem Konto, aber Erinnerungen, die mir keiner nehmen kann. Bradford ist eine Sucht.",
    "DE: Sauberkeit in den Toiletten war überraschend gut für so einen großen Laden. Da wird echt auf Details geachtet.",
    "DE: Gerne wieder.",
    "DE: Der DJ hat ein Set gespielt, das sich wie eine Reise angefühlt hat. Von melodisch bis hin zu hartem Industrial Techno. Perfekter Aufbau.",
    "DE: Bradford bleibt die Nummer eins.",
    "DE: Wer sich über die Preise beschwert, hat das Konzept nicht verstanden. Hier zahlt man für Perfektion.",
"PL: Absolutny obłęd. System nagłośnienia w Bradford to jakaś inna galaktyka. Bas czuć w każdej komórce ciała.",
    "PL: 90 euro za wejście to sporo, ale jak tylko zobaczysz te lasery, przestajesz żałować każdego centa. To jest światowy poziom.",
    "PL: Wczoraj w sekcji VIP działy się rzeczy, o których można by napisać książkę. Szampan lał się strumieniami, a klimat był nie do podrobienia.",
    "PL: Czy ktoś wie, jak nazywał się DJ grający o 3 nad ranem? Ten drop po prostu zniszczył mi system.",
    "PL: Ochrona jest twarda, ale sprawiedliwa. Jak jesteś w porządku, to traktują cię jak króla. W środku pełna kultura i bezpieczeństwo.",
    "PL: Było okej.",
    "PL: Wydałem połowę wypłaty w jedną noc, ale przysięgam, że było warto. Bradford to nie jest zwykły klub, to doświadczenie.",
    "PL: Najlepsze nagłośnienie w mieście. Kropka.",
    "PL: Widziałem gościa, który zapłacił rachunek na 10 tysięcy euro tak lekką ręką, jakby kupował bułki w piekarni. Kosmos.",
    "PL: Trochę za dużo dymu, momentami nie widziałem własnej ręki, ale muzyka nadrabiała wszystko.",
    "PL: Valet parking zadziałał bezbłędnie. Podjeżdżasz, oddajesz kluczyki i wchodzisz prosto w ogień imprezy.",
    "PL: Klasa sama w sobie.",
    "PL: Poznałem w palarni ludzi z czterech różnych krajów. W Bradford bariery po prostu znikają.",
    "PL: Drink za 150 euro bolał przy płaceniu, ale po pierwszym łyku wiedziałem, że to był dobry wybór. Mistrzostwo barmańskie.",
    "PL: Wróciłem do domu o 8 rano, słońce już dawało po oczach, a ja wciąż miałem ten bit w głowie. Nie do opisania.",
    "PL: Bradford to moja nowa religia. Co weekend będę tu wracać.",
    "PL: Solidnie.",
    "PL: Oświetlenie sprawia, że czujesz się jak w filmie science-fiction. Te lasery dosłownie skanują ci mózg.",
    "PL: Selekcja na wejściu jest ostra, ale dzięki temu w środku jest tylko topowa ekipa. Żadnej przypadkowej hołoty.",
    "PL: Zgubiłem portfel, a obsługa znalazła go i oddała nienaruszony w 15 minut. Szacunek za profesjonalizm.",
    "PL: Po prostu wow.",
    "PL: Muzyka była tak głośna, że nie dało się rozmawiać, ale w Bradford nie jesteś po to, żeby gadać, tylko żeby zniknąć w basie.",
    "PL: Bardzo drogo, ale luksus kosztuje. Jak chcesz tanio, to idź do pubu.",
    "PL: Czystość w łazienkach pod koniec nocy mnie zszokowała. Serwis sprzątający robi niesamowitą robotę.",
    "PL: Sztos.",
    "PL: Czekałem w kolejce 40 minut, ale warto było. Atmosfera w środku przebija wszystko, co widziałem w Londynie czy Berlinie.",
    "PL: Nie mam słów. Bradford po prostu rządzi nocą.",
    "PL: Wszystko zgodnie z oczekiwaniami. Wysoki standard.",
    "PL: DJ zaserwował taki set, że zapomniałem o całym świecie. Czysta euforia.",
    "PL: Do następnej soboty!",
"PL: O ja pierdzielę, co to był za drop!!! Myślałem, że mi klatka piersiowa pęknie. Bradford, kocham was!",
    "PL: Ludzie, ten klub to jest inny wymiar. Lasery, nagłośnienie, ludzie... czułem się, jakbym grał w jakimś filmie o miliarderach.",
    "PL: No i to się nazywa melanż. Wypiłem tyle szampana, że teraz widzę na złoto. Najlepiej wydane pieniądze w życiu.",
    "PL: Dobra muzyka.",
    "PL: Powiem krótko: Bradford to absolutny król nocy. Jeśli myślisz, że widziałeś już wszystko, to wejdź tutaj o 3 rano.",
    "PL: Masakra, moje uszy dzwonią do teraz, ale było warto. Ten bas jest po prostu uzależniający.",
    "PL: Strasznie drogo, ale przynajmniej nie ma przypadkowej wiary. Czysty luksus i prestiż.",
    "PL: Wszystko w porządku.",
    "PL: Ej, czy ktoś widział tego gościa, co zamówił 10 butelek naraz i każda przyjechała z fajerwerkami? Typowy Bradford, uwielbiam ten przepych.",
    "PL: Nie no, to co DJ zrobił przed zamknięciem to była czysta magia. Płakałem ze szczęścia na parkiecie.",
    "PL: Selekcja mnie przemieliła, ale w końcu wszedłem. Warto było stać w tym deszczu.",
    "PL: Top topów.",
    "PL: Ochroniarz pomógł mi ogarnąć taksówkę, bo byłem już w innym stanie skupienia. Mega profesjonalna ekipa.",
    "PL: Miałem iść na jedną godzinę, wyszedłem po ośmiu. Ten klub ma jakąś dziwną moc, że nie da się wyjść.",
    "PL: Ekskluzywnie, drogo, ale z klasą. Tak się bawi elita.",
    "PL: Słabo z miejscem do siedzenia bez rezerwacji, ale muzyka tak niesie, że i tak nikt nie siada.",
    "PL: Bradford to legenda. Kropka.",
    "PL: Ale urwał! Ten numer o 4 rano to był totalny niszczyciel systemu.",
    "PL: Bardzo wysoki poziom obsługi barmańskiej. Drink nie tylko smakuje, ale i wygląda jak milion dolarów.",
    "PL: Jest moc.",
    "PL: Zgubiłem buty, zgubiłem kumpli, ale znalazłem sens życia na środku parkietu. Bradford, wrócę po więcej!",
    "PL: Czystość, nagłośnienie i te lasery... w Polsce nie ma drugiego takiego miejsca.",
    "PL: No i okej.",
    "PL: Jak chcesz poczuć się jak bóg, to bierz lożę w VIPie. Obsługa skacze wokół ciebie, a drinki same się dolewają.",
    "PL: Co za noc... do teraz nie wierzę w to, co tam się działo.",
    "PL: Mistrzostwo świata.",
    "PL: Wydałem na drinki więcej niż na czynsz, ale przynajmniej wiem, że żyję.",
    "PL: Nie do opisania, to trzeba po prostu przeżyć na własnej skórze.",
    "PL: Bradford to czysty ogień.",
    "PL: Do zobaczenia za tydzień, nie ma innej opcji."],

        quick_responses: [
    "best night ever period.",
    "sound was decent but 90 bucks for entry is a robbery lol",
    "literally the loudest club ive ever been to. ears are ringing.",
    "absolute madness at 3am!!",
    "overrated tbh.",
    "the lasers... omg the lasers.",
    "spent 300 on drinks and i dont even remember the dj name lmao",
    "standard bradford night. elite vibes.",
    "too crowded i couldnt even move",
    "best sound system in the city. no cap.",
    "i think i lost my mind on the dancefloor. 10/10.",
    "it was aite.",
    "bro the bass is actually violent i love it",
    "way too expensive for no reason.",
    "vibes were valid tonight.",
    "security is a bit much but i get it.",
    "idk what happened but i woke up with no money and a big smile",
    "pure fire.",
    "the co2 jets saved my life it was so hot in there",
    "overpriced water is a crime.",
    "deadass the best set ive heard all year.",
    "meh.",
    "manager was actually nice to us for once lol",
    "insane energy.",
    "worth it if u have the cash. if not, stay home.",
    "lost my shoe in the pit... worth it.",
    "the lighting guy is a genius",
    "trash service at the bar but music was 10/10",
    "stunning venue. nothing else like it.",
    "total chaos but the good kind.",
    "waited 1 hour in the rain... still worth it tho",
    "dope vibe.",
    "everything was perfect.",
    "bradford never misses.",
    "i seen a celebrity in vip but he looked bored af haha",
    "expensive but u get what u pay for i guess",
    "shoutout to the coat check lady shes a g",
    "lmao i spent my rent money on tequila... help",
    "solid 8/10.",
    "the acoustics are just... wow.",
    "never seen so many black cards in one room",
    "straight gas.",
    "mid tbh.",
    "i dont even like techno and i had a blast",
    "perfect night. thanks.",
    "cried during the final set. emotional af.",
    "security checked my socks?? wild.",
    "the bass hit so hard i felt my ancestors",
    "it was ok i guess.",
    "unreal experience.",
    "don't go unless you're rich lol",
    "music was way too loud. i'm old i guess.",
    "VIP was actually worth the 2k deposit tonight",
    "just go. dont ask questions.",
    "a bit pretentious but the sound makes up for it",
    "literally a portal to another dimension",
    "pretty good.",
    "faded af but that set was legendary",
    "the valet took forever but the club was fire",
    "goated venue.",
    "drinks are like 50 bucks each... scam but tasty lol",
    "vibes on point.",
    "actually insane.",
    "could be better.",
    "the bathroom is cleaner than my apartment lmao",
    "pure savage energy in the pit tonight",
    "i'm broke now but happy.",
    "best club in the world. period.",
    "it was fine.",
    "the drop at 4am changed my dna",
    "boring crowd tonight too many influencers",
    "epic.",
    "greatest soundstage ever built.",
    "i lost my phone but someone found it! good people.",
    "top tier.",
    "a bit messy at the entrance.",
    "loved every second.",
    "overhyped.",
    "the smoke machine was doing overtime haha",
    "flawless.",
    "not my vibe but the sound is good",
    "the ice cubes r actually shaped like diamonds... the flex is real",
    "insanity.",
    "loved it.",
    "the bass is literally a weapon",
    "best night of the year so far",
    "cool.",
    "the production value is insane",
    "i spent 5k in 10 mins... fml but what a night",
    "valid af.",
    "incredible.",
 "best set ive heard in years honestly.",
    "90 bucks just to get in? the gatekeeping is real lol",
    "ears still ringing at 2pm... bradford sound is no joke.",
    "vibes were immaculate.",
    "waaay too loud. literally couldn't hear my own thoughts.",
    "security was chill tonight. rare W.",
    "i think i saw a ghost in the fog machine lmaooo",
    "straight heat from start to finish.",
    "honestly? mid. expected more for the price.",
    "worth every penny of that vip tax.",
    "the bass was hitting different at 4am.",
    "lmao my bank account is screaming rn.",
    "absolute unit of a club.",
    "too many influencers taking selfies... just dance bro.",
    "literally life changing.",
    "drinks were watery for 40$, do better.",
    "insane production. those lasers are lethal.",
    "i'm dead. what a night.",
    "standard luxury. it is what it is.",
    "the co2 jets actually saved my life.",
    "not enough house music, too much industrial for me.",
    "goated.",
    "pure vibes only.",
    "lost my card, found a diamond earring... fair trade??",
    "acoustics are 10/10.",
    "pretty mid crowd tonight but the dj carried.",
    "overpriced ice cubes lol but i love the flex.",
    "faded beyond belief. 11/10 night.",
    "the bathroom lighting makes everyone look like a model.",
    "pure savagery on the floor.",
    "idk man, i just came for the bass.",
    "spent 2k on bottles and they treated us like royalty.",
    "stunning. simply stunning.",
    "the drop at 3:30am literally reset my brain.",
    "worst valet service ever, but the club is fire.",
    "elite only.",
    "cried in the smoking area. beautiful vibes.",
    "too many suits, not enough ravers.",
    "bradford is the only place i'll spend my rent money.",
    "a bit too dark in there, i tripped over a vip table lol",
    "pure gold.",
    "hard. just hard.",
    "the lighting guy needs a raise.",
    "i'm broke now. thanks bradford.",
    "deadass the most exclusive spot in the city.",
    "service was slow af but the music was gas.",
    "everything was glitchy in a good way.",
    "unreal visuals.",
    "honestly? 6/10. too much hype.",
    "the soundstage is a masterpiece.",
    "met a billionaire, he bought me a water for 25$ lmao.",
    "peak energy.",
    "just pure, unadulterated techno.",
    "worth the bankruptcy.",
    "i'm never going back to regular clubs.",
    "the bass hit so hard my drink spilled itself.",
    "valid.",
    "shoutout to the manager for the hookup.",
    "the crowd was a bit stiff but the music was insane.",
    "legendary status.",
    "cameraman almost hit me with the drone lol, 5 stars.",
    "top shelf only.",
    "it was alright.",
    "i feel like i've been to space and back.",
    "those subs are dangerous. i love it.",
    "expensive, loud, and perfect.",
    "meh, seen better.",
    "the mirror in the vip lounge is a trip.",
    "best night of the summer for sure.",
    "too much co2 i couldn't see my own feet.",
    "steeze 100.",
    "worth the 4 hour flight.",
    "i spent 500$ and all i got was this hangover.",
    "absolute perfection.",
    "the bass is a literal weapon of mass destruction.",
    "shook.",
    "loved the vibe, hated the queue.",
    "bradford or nowhere.",
    "i think i'm still in the club in my head.",
    "raw energy.",
    "proper clubbing. no fluff.",
    "it was fine i guess.",
    "the lasers burned my retinas but i'm happy.",
    "high key the best spot in europe rn.",
    "the ice cubes are shaped like diamonds... why tho? haha",
    "valid af.",
    "literally heaven on earth.",
    "i'm poor now but it was a W.",
    "sonic perfection.",
    "the valet guy lost my keys for 10 mins but found em. chill.",
    "aggressive bass. just how i like it.",
    "top tier hospitality.",
    "never seen so much champagne in my life.",
    "it was cool.",
    "the acoustics in that room are scientific.",
    "literally dead.",
    "can't wait for next week.",
    "bradford never misses the mark.",
    "pure euphoria.",
    "simply the best.",
"nah bcz the bass was actually rattling my teeth the whole night... madness.",
    "spent 400 on tequila and i dont even remember the dj's face lmao worth it tho",
    "literally the most pretentious crowd ive ever seen but the sound system is 10/10.",
    "security checked my wallet twice like bro i aint hiding nothing smh",
    "the lighting guy needs a raise fr fr those lasers were cutting through my soul.",
    "overpriced water is a joke but that 4am drop was legendary.",
    "i seen a guy drop a whole bottle of ace of spades in the pit... rip his bank account lmao",
    "waited 2 hours in the rain just to get stared at by a bouncer but once i was in... wow.",
    "honestly idc about the price bradford is the only place with real acoustics.",
    "my shirt is ruined and i lost a shoe but that was the best set of the year no cap.",
    "too many influencers posing in the vip area just dance and enjoy the music ffs",
    "the acoustics in there rly make u feel like ur inside the speaker itself.",
    "lowkey hated the queue but highkey loved the vibe inside... pure chaos.",
    "shoutout to the manager for letting us stay after lights came on lol what a night.",
    "i'm legit broke now like bank account says 0.42$ but my heart is full haha.",
    "the co2 jets rly be saving lives when it gets sweaty on the floor.",
    "stunning venue but 150 bucks for two gin tonics is actually a crime against humanity.",
    "the bass hit so hard i think my soul left my body for a second there.",
    "idk what they put in the fog machine but i was seeing stars the whole time.",
    "security is extra af but at least u feel safe in there i guess.",
    "absolute peak energy... never seen anything like those holographic visuals.",
    "i was faded beyond belief and still managed to appreciate the sound engineering lol",
    "the coat check girl is a real one for finding my scarf in that mess.",
    "straight gas from start to finish... best 90 bucks ive spent this summer.",
    "everything was a blur but that techno set changed my life forever.",
    "literally felt like i was in a sci-fi movie with all that chrome and led.",
    "met a guy who claimed to be a prince and he bought the whole bar a round lol madness.",
    "the bathroom mirrors r actually a vibe tho?? spent 20 mins taking pics lmao",
    "way too many suits in vip tonight but the pit was pure savage energy.",
    "my ears r still ringing and its monday... bradford is a health hazard haha.",
    "the valet lost my keys for a sec but i was so hyped i didnt even care.",
    "i spent my whole rent money on bottle service and honestly?? no regrets.",
    "if u aint been to bradford u basically havent lived yet period.",
    "the drop at 5am had me questioning my entire existence... purely spiritual.",
    "the ice cubes r shaped like diamonds and the water is 20$ lol welcome to bradford.",
    "shook af... best production value in the entire world no competition.",
    "a bit too crowded tbh i could barely move my arms but the music was fire.",
    "never seen so many black cards at one bar... the wealth display is crazy.",
    "cried during the closing set bcz i didnt want to leave... take me back.",
    "the sub-bass frequencies rly be cleaning ur lungs out lmao.",
    "best night of my life but i'm definitely filing for bankruptcy tomorrow.",
    "bradford is the only place where the smoke machine actually smells good lol",
    "met my ex at the bar and it was awkward af but the bass drowned out the pain.",
    "i'm dead. literally dead. don't wake me up until next saturday.",
    "standard elite vibes... u either get it or u dont.",
    "the valet parking is actually super smooth if u arrive in something expensive haha.",
    "aggressive sound for aggressive people... i found my home.",
    "lost my phone in the ice bucket but a vip server found it for me... life saver!",
    "honestly the hype is real. worth every single cent.",
    "see u next week bcz i'm officially addicted to this place.",
 "best night ever fr 🔥",
    "bass was mental, still shaking lol 😂",
    "90$ entry is a joke but the music was 10/10",
    "lost my mind on that dancefloor 💀🔥",
    "vibes were immaculate tonight ✨",
    "spent too much money but no regrets 💸",
    "best sound system in the city period.",
    "i'm dead. what a night 💀",
    "lasers were insane fr ✨🔥",
    "too crowded but the music was gas",
    "rent money well spent lol 💸😂",
    "pure fire from start to finish 🔥",
    "worth every cent 🙌",
    "literally life changing set tonight",
    "security was chill for once lol",
    "best club in the world no cap 🔥",
    "i'm broke now but happy 💸😂",
    "that 4am drop was filthy 💀🔥",
    "everything was perfect tonight ✨",
    "bradford never misses 🙌",
    "ears ringing but it was worth it",
    "straight gas 🔥🔥🔥",
    "co2 jets saved my life lol ❄️",
    "vip was a movie tonight 🍾",
    "literally a portal to another world",
    "best night of the year so far 🔥",
    "overpriced water but elite vibes ✨",
    "i'm never going home lol 😂",
    "pure euphoria 🙌🔥",
    "unreal visuals tonight",
    "valid af ✨",
    "the bass hit different today fr",
    "pure madness 💀",
    "best set ive heard in ages 🔥",
    "shoutout to the bar staff, goats 🙌",
    "expensive but worth it for the sound",
    "i'm faded but that was legendary 😂🔥",
    "top tier night out ✨",
    "acoustics were 10/10 fr",
    "absolute unit of a club 🔥",
    "too many influencers but music was lit",
    "the drop changed my life lol 💀",
    "stunning venue fr ✨",
    "cried at the end it was so good 🙌",
    "bradford or nothing 🔥",
    "best night ever period. ✨",
    "i love this place so much fr",
    "pure savage energy tonight 💀🔥",
    "see u next week for sure 🙌",
    "legendary vibes tonight 🔥✨",
 "Best night ever.",
    "The bass was actually insane, still shaking lol 🔥",
    "90 bucks for entry is steep but worth it for the sound.",
    "Lost my mind on that dancefloor.",
    "Vibes were valid tonight ✨",
    "Spent way too much money but no regrets.",
    "Best sound system in the city, period.",
    "I'm dead. What a night 💀",
    "Lasers were insane fr fr.",
    "Too crowded but the music was pure gas.",
    "Rent money well spent lol 💸",
    "Pure fire from start to finish.",
    "Worth every cent if you like techno.",
    "Literally a life changing set tonight.",
    "Security was actually chill for once.",
    "Best club in the world no cap.",
    "I'm broke now but happy 😂",
    "That 4am drop was absolutely filthy.",
    "Everything was perfect tonight.",
    "Bradford never misses the mark 🙌",
    "Ears are ringing but it was worth it.",
    "Straight gas 🔥🔥🔥",
    "CO2 jets saved my life, it was so hot.",
    "VIP was a movie tonight.",
    "Literally a portal to another world.",
    "Best night of the year so far.",
    "Overpriced water but elite vibes ✨",
    "I am never going home lol.",
    "Pure euphoria.",
    "Unreal visuals tonight, felt like a movie.",
    "Valid af.",
    "The bass hit different today fr.",
    "Pure madness 💀",
    "Best set I've heard in ages.",
    "Shoutout to the bar staff, they are goats.",
    "Expensive but worth it for the acoustics.",
    "I'm faded but that was legendary.",
    "Top tier night out.",
    "Acoustics were 10/10 fr fr.",
    "Absolute unit of a club 🔥",
    "Too many influencers but the music was lit.",
    "The drop changed my dna lol.",
    "Stunning venue.",
    "Cried at the end it was so good.",
    "Bradford or nothing.",
    "I love this place so much.",
    "Pure savage energy on the floor 💀",
    "See u next week for sure.",
    "Legendary vibes tonight.",
    "Actually mental.",
    "The sound is just different here.",
    "Best place on earth.",
    "I spent 500 bucks and I'd do it again.",
    "Speechless.",
    "Techno heaven 🙌",
    "If you know you know.",
    "Couldnt even move but i loved it.",
    "Proper clubbing.",
    "Insane energy tonight fr.",
    "Bradford is king.",
   "best night ever fr",
    "the bass was actually insane still shaking lol",
    "90 bucks for entry is steep but worth it for the sound",
    "lost my mind on that dancefloor",
    "vibes were valid tonight",
    "spent way too much money but no regrets",
    "best sound system in the city period",
    "im dead what a night",
    "lasers were insane fr fr",
    "too crowded but the music was pure gas",
    "rent money well spent lol",
    "pure fire from start to finish",
    "worth every cent if you like techno",
    "literally a life changing set tonight",
    "security was actually chill for once",
    "best club in the world no cap",
    "im broke now but happy",
    "that 4am drop was absolutely filthy",
    "everything was perfect tonight",
    "bradford never misses the mark",
    "ears are ringing but it was worth it",
    "straight gas",
    "co2 jets saved my life it was so hot",
    "vip was a movie tonight",
    "literally a portal to another world",
    "best night of the year so far",
    "overpriced water but elite vibes",
    "i am never going home lol",
    "pure euphoria",
    "unreal visuals tonight felt like a movie",
    "valid af",
    "the bass hit different today fr",
    "pure madness",
    "best set ive heard in ages",
    "shoutout to the bar staff they are goats",
    "expensive but worth it for the acoustics",
    "im faded but that was legendary",
    "top tier night out",
    "acoustics were 10/10 fr fr",
    "absolute unit of a club",
    "too many influencers but the music was lit",
    "the drop changed my dna lol",
    "stunning venue",
    "cried at the end it was so good",
    "bradford or nothing",
    "i love this place so much",
    "pure savage energy on the floor",
    "see u next week for sure",
    "legendary vibes tonight",
    "actually mental",
    "the sound is just different here",
    "best place on earth",
    "i spent 500 bucks and id do it again",
    "speechless",
    "techno heaven",
    "if you know you know",
    "couldnt even move but i loved it",
    "proper clubbing",
    "insane energy tonight fr",
    "bradford is king",
    "best set of the year hands down",
    "literally cannot feel my legs",
    "best 90 bucks ive ever spent",
    "that was peak techno",
    "unreal energy from start to finish",
    "the lighting guy is a god",
    "too expensive but i dont even care",
    "best club ive ever been to",
    "madness in the pit tonight",
    "techno at its finest",
 "best night eveeeer i cant feel my legs",
    "brah the bass is actully mental wtf",
    "spent 500 n idgaf best night of my life",
    "im so faded rn bradford is the goat",
    "literally cant evn see my hands too much fog",
    "expensive as hell but who cares lmaooo",
    "best set ive herd in a min fr",
    "security was movin mad but we in",
    "i lost my phone but idc that drop was worth it",
    "best club in the wrld perioddd",
    "way too many ppl but the vibes r sick",
    "that djs a god no cap",
    "im broke af now thanks bradford haha",
    "unreal visuals i think im trippin",
    "the co2 jets saved my life frfr it was hot asfk",
    "acoustics r 10/10 best in the city",
    "shoutout the bar staff they real ones",
    "literally life changin set",
    "im nevr leaving this place",
    "pure savagery in the pit tonight",
    "too much hype but it lived up to it",
    "ears ringin like crazy worth it tho",
    "best 90 bucks ive evr spent",
    "i think i saw a celebrity in vip lol",
    "the bass changed my dna istg",
    "straight gas all night long",
    "unreal experience literally",
    "i am so wasted but the music is so good",
    "bradford never misses fr",
    "best night with the boys evrr",
    "vip tax is real but so is the vibe",
    "i lost a shoe in the pit lol help",
    "insane energy tonight bro",
    "pure euphoria i cld cry",
    "best techno spot in europe period",
    "valet took forever but idc",
    "everything was a blur but it was fire",
    "shook af",
    "literally cannot feel my feet lmao",
    "best set ive ever witnessed",
    "too many rich kids but the sound is gas",
    "stunning venue fr",
    "i spent my rent money on tequila fml",
    "best clubbing experience of my life",
    "pure madness tonight",
    "im so drunk but i love u bradford",
    "that drop was filthy af",
    "best soundstage ever built",
    "i think i met my wife on the floor lol",
    "bradford is king no cap",
    "too loud but i love it",
    "literally peak techno",
    "i dont want to go home",
    "acoustics rly b hittin diff today",
    "shoutout the lighting guy he a g",
    "absolute unit of a club",
    "i cant even talk right now too much bass",
    "best night of the summer fr",
    "faded af but the set was legendary",
    "pure heat",
    "i think my heart stopped durin that drop lmao",
    "valid vibes only",
    "literally a movie",
    "best 150 bucks for a drink evr",
    "im so tired but i wanna go back",
    "unreal energy tonight fr fr",
    "too many influencers but the bass drowned em out",
    "best club in the universe",
    "i lost my mind n i dont want it back",
    "bradford or nothing fr",
 "literally spent my whole paycheck in four hours and i dont even feel bad because that set was actually historical",
    "the way the bass hits your chest in there is something else i swear i felt my heart skip a beat during the main act 🔥",
    "honestly the queue was a nightmare but once you get past security and hear the sound system you forget everything",
    "shoutout to the bartender who kept the water coming because it was like a sauna on the floor tonight seriously",
    "i dont know what they put in the smoke machines but i was wandering around like a lost soul for half an hour lol",
    "best night ive had with my brother in years we just stayed in the pit and let the music take over everything",
    "expensive as hell for no reason but then you see the lasers and you realize why they charge 90 for entry",
    "i lost my wallet and my dignity somewhere near the vip tables but the security actually helped me out so cheers for that",
    "never seen a crowd that intense even in berlin the energy at bradford is just on a completely different level tonight",
    "i think i saw a celebrity crying in the smoking area but the bass was so loud i couldnt even ask him if he was okay 💀",
    "my ears are going to be ringing until next tuesday but i would literally do it all over again tomorrow if i could",
    "everything was a total blur from 2am onwards but i distinctly remember the drop that shifted the entire room",
    "security checked my socks like i was smuggling gold or something but once you get inside the vibes are unmatched",
    "the acoustics in that main room are actually scientific like how can it be that loud and that clear at the same time",
    "just got home and my legs are actually shaking from dancing for seven hours straight bradford is a drug fr",
    "too many rich kids in suits in the vip section but as long as they stay there the dancefloor is pure heaven",
    "i spent 200 bucks on gin and tonics and i think i only actually drank two of them because the floor was so packed",
    "literally felt like i was in a futuristic movie with the holographic visuals and the chrome walls everywhere ✨",
    "shoutout to the guy who found my phone in the moshpit and gave it back you are a real one bro",
    "i dont even like techno that much but this place makes you feel like you discovered a new religion or something",
    "waited for the valet for thirty minutes in the cold which sucked but the club itself is easily 10/10 no debate",
    "the co2 jets are the only reason i didnt faint on the floor tonight it was actually getting dangerous in there lol",
    "best night of my life hands down even though im going to be eating ramen for the rest of the month now 💸",
    "i think i met my future wife on the stairs but i was too faded to ask for her number typical bradford night",
    "literally a portal to another dimension i dont know how they manage to keep the energy that high until sunrise",
    "the bathroom is nicer than my whole apartment and the staff is actually professional which is rare for a club",
    "i saw a guy order a whole parade of champagne bottles just to spray them on his friends the wealth is disgusting 😂",
    "pure aggression in the sound design just how i like it bradford is the only place that does it right these days",
    "if you havent been to the vip lounge you havent really seen the club the view from up there is insane",
    "i woke up with no voice and a massive headache but that was the most valid night ive had in a decade",
 "lmao lost my shoe in the pit 💀",
    "hahaha 90 bucks for water im dying",
    "literally forgot my own name lol",
    "the dj is a troll i swear 😂",
    "bro my bank account is crying rn 💀💸",
    "security caught me sleeping lmao",
    "i tried to shazam the smoke machine 😂",
    "lmfao i spent my rent money fml",
    "saw a guy in a suit crying lol",
    "legs feel like jelly haha 💀",
    "i talk to a plant for 20 mins lmao",
    "hahaha that drop was filthy",
    "deadass saw a dog in there lol 💀",
    "im so faded i cant even walk straight 😂",
    "vip is a joke everyone so serious lmao",
    "lost my phone in the ice bucket again 💀",
    "bartender was judging me so hard lol",
    "hahaha best night ever fr fr",
    "i look like a mess but idc 😂",
    "literally a movie lmao",
    "saw a guy eating pizza on the floor 💀",
    "i told the bouncer i love him haha",
    "lmfao 150 for a drink im finished 💸",
    "forgot where i parked lol 💀",
    "the fog made me lose my friends lmao",
    "hahaha im never going home",
    "bass blew my ears off fr 😂",
    "im broke but it was funny asfk 💀",
    "lmfao what a night",
    "i think i met a ghost lmao 😂"],

    },

    stats: { total: 0, stars: [52835, 3195, 1215, 258, 151] },
    db: [],
    display_limit: 10,

  init() {
    // 1. CHARGEMENT INITIAL
    const savedCount = localStorage.getItem("BRADFORD_COUNT");
    const savedStars = localStorage.getItem("BRADFORD_STARS");
    const lastVisit = localStorage.getItem("BRADFORD_LAST_VISIT");
    
    // On définit le total (61k par défaut si vide)
    this.stats.total = savedCount ? parseInt(savedCount) : 61245;

    // --- LOGIQUE D'ADAPTATION AUTOMATIQUE ---
    if (savedStars) {
        this.stats.stars = JSON.parse(savedStars);
        
        // On calcule la somme actuelle de tes barres
        const currentSum = this.stats.stars.reduce((a, b) => a + b, 0);

        // Si le total est plus élevé que la somme des barres (décalage détecté)
        if (this.stats.total > currentSum) {
            const gap = this.stats.total - currentSum;
            // On injecte automatiquement la différence dans les 5 et 4 étoiles
            const fixFive = Math.floor(gap * 0.92);
            const fixFour = gap - fixFive;
            
            this.stats.stars[0] += fixFive;
            this.stats.stars[1] += fixFour;
            
            // On sauvegarde la correction
            localStorage.setItem("BRADFORD_STARS", JSON.stringify(this.stats.stars));
        }
    } else {
        // Si c'est un nouveau visiteur, on génère une répartition parfaite basée sur le total
        this.stats.stars = [
            Math.floor(this.stats.total * 0.91), // 5*
            Math.floor(this.stats.total * 0.06), // 4*
            Math.floor(this.stats.total * 0.02), // 3*
            Math.floor(this.stats.total * 0.007),// 2*
            0 // On comblera le 1* juste après
        ];
        const sum = this.stats.stars.reduce((a, b) => a + b, 0);
        this.stats.stars[4] = this.stats.total - sum; // Ajustement final
    }

    // 2. SIMULATION D'ABSENCE (Rattrapage intelligent)
    if (lastVisit) {
        const secondsPassed = Math.floor((Date.now() - parseInt(lastVisit)) / 1000);
        const added = Math.floor(secondsPassed / 460); 
    
    if (added > 0) {
        // ON ENLÈVE LE MATH.MIN ! On ajoute TOUT ce qui a été manqué.
        this.stats.total += added;

            // On répartit l'augmentation directement
            const fiveStars = Math.floor(added * 0.92);
            const fourStars = added - fiveStars;

            this.stats.stars[0] += fiveStars;
            this.stats.stars[1] += fourStars;

            // Sauvegarde synchronisée
            localStorage.setItem("BRADFORD_COUNT", this.stats.total);
            localStorage.setItem("BRADFORD_STARS", JSON.stringify(this.stats.stars));
            localStorage.setItem("BRADFORD_LAST_VISIT", Date.now().toString());
        }
    }


    // 3. Lancement des données générées (les 1000 messages du club)
    this.generateData(50000); 

    // --- CORRECTION POINT B : NETTOYAGE DES ANCIENS TESTS ---
    let savedMsgs = JSON.parse(localStorage.getItem("BRADFORD_MY_MSGS") || "[]");
    
    // On définit la limite à 24 heures (en millisecondes)
    const oneDayInMs = 24 * 60 * 60 * 1000;
    
    // On ne garde QUE les messages qui ont un timestamp ET qui datent de moins de 24h
    savedMsgs = savedMsgs.filter(m => {
        const isRecent = m.timestamp && (Date.now() - m.timestamp) < oneDayInMs;
        return isRecent;
    });
    // On écrase le localStorage avec la liste propre pour ne pas les recharger au prochain coup
    localStorage.setItem("BRADFORD_MY_MSGS", JSON.stringify(savedMsgs));

    // On fusionne les messages propres avec la base de données
    this.db = [...savedMsgs, ...this.db];

    // 4. Affichage final
    this.renderStats();
    this.render();
    this.startLiveEngine();
},



    genUser() {
    const L = this.lex;
    // Pioche un pseudo dans ta nouvelle grosse base de données
    return L.usernames[Math.floor(Math.random() * L.usernames.length)];
},


    genText(star) {
    const L = this.lex;
    const r = Math.random() * 100; 
    let selectedMessage = "";

    if (r <= 80) { 
        // 80% ANGLAIS : Mix 50/50 entre récits longs et réponses courtes
        const enCategory = Math.random() > 0.5 ? L.narratives : L.quick_responses;
        selectedMessage = enCategory[Math.floor(Math.random() * enCategory.length)];
    } 
    else if (r <= 85) {
        // 5% FRANÇAIS : On pioche spécifiquement les FR dans le Global
        const frPool = L.global.filter(m => m.startsWith("FR:"));
        const pick = frPool[Math.floor(Math.random() * frPool.length)];
        selectedMessage = pick.split(": ")[1]; // On récupère juste le texte après "FR: "
    }
    else if (r <= 90) {
        // 5% ESPAGNOL : On pioche spécifiquement les ES dans le Global
        const esPool = L.global.filter(m => m.startsWith("ES:"));
        const pick = esPool[Math.floor(Math.random() * esPool.length)];
        selectedMessage = pick.split(": ")[1]; // On récupère juste le texte après "ES: "
    }
    else {
        // 10% RESTE DU MONDE : Toutes les autres langues du Global (IT, DE, PL, JP, ZH)
        const otherPool = L.global.filter(m => !m.startsWith("FR:") && !m.startsWith("ES:"));
        const pick = otherPool[Math.floor(Math.random() * otherPool.length)];
        // On sépare le préfixe (ex: "JP: ") du message
        selectedMessage = pick.split(": ")[1]; 
    }

    // Protection : si pour une raison X ou Y le message est vide, on renvoie un truc par défaut
    return selectedMessage || "Amazing experience!";
},


      createReview(minutes, isNew = false) {
    const cities = ["NY", "LA", "SF", "MIA"];
    const star = Math.random() > 0.9 ? 4 : 5;
    
    return {
        name: this.genUser(),
        city: cities[Math.floor(Math.random()*4)],
        star: star,
        msg: this.genText(star),
        rawTime: minutes,
        // --- LA LIGNE À AJOUTER EST JUSTE EN DESSOUS ---
        timestamp: isNew ? Date.now() : null, 
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

    generateData(count) { 
    let currentMinutes = 0;
    // On crée les messages par petits blocs pour soulager le processeur
    for(let i=0; i<count; i++) {
        const gap = (i === 0) ? 0 : Math.floor(Math.random() * 8) + 1; 
        currentMinutes += gap;
        
        // On pousse directement dans db
        this.db.push(this.createReview(currentMinutes));
        
        // Optionnel : toutes les 10 000 entrées, on pourrait logguer 
        // mais ici on laisse filer, 30k c'est très gérable.
    } 
},





            startLiveEngine() {
        const triggerNext = () => {
            const randomDelay = Math.floor(Math.random() * (300000 - 120000 + 1) + 120000);



            setTimeout(() => {
                // 1. On génère d'abord la review (elle choisira 4* ou 5* selon TA règle du Math.random)
                const newReview = this.createReview(0, true);
                
                // 2. On augmente le total
                this.stats.total++;

                // 3. ON ADAPTE LA BARRE SELON LA NOTE GÉNÉRÉE
                // Si la review est 5*, on incrémente stars[0]. Si c'est 4*, stars[1].
                const starIndex = 5 - newReview.star; 
                this.stats.stars[starIndex]++;

                // --- SAUVEGARDE CRUCIALE (Total + Stars synchronisés) ---
                localStorage.setItem("BRADFORD_COUNT", this.stats.total);
                localStorage.setItem("BRADFORD_STARS", JSON.stringify(this.stats.stars));
                localStorage.setItem("BRADFORD_LAST_VISIT", Date.now().toString());
                
                // 4. On ajoute le message au mur
                this.db.unshift(newReview);
                
                this.render();
                this.renderStats();
                triggerNext();
            }, randomDelay);
        };
        triggerNext();
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

   
this.db.forEach(r => {
    if(r.timestamp) {
        const diffMinutes = Math.floor((Date.now() - r.timestamp) / 60000);
        r.rawTime = diffMinutes;
        r.timeLabel = this.formatTime(diffMinutes);
    } else if (r.timeLabel === "JUST NOW" && !r.timestamp) {
        r.timestamp = Date.now() - 3600000;
    }
});



    // Récupération des filtres
    const cityF = document.getElementById('f-city')?.value || 'all';
    const starF = document.getElementById('f-stars')?.value || 'all';
    const orderF = document.getElementById('f-order')?.value || 'new';

    let filtered = this.db.filter(r => {
        const matchCity = (cityF === 'all' || r.city === cityF);
        const matchStar = (starF === 'all' || r.star == starF);
        return matchCity && matchStar;
    });
    
    // Trouve la section TRI dans ta fonction render() et remplace-la par celle-ci :

if(orderF === 'new') {
    filtered.sort((a, b) => {
        const timeA = a.timestamp || (Date.now() - (a.rawTime * 60000));
        const timeB = b.timestamp || (Date.now() - (b.rawTime * 60000));
        return timeB - timeA; 
    });
} else {
    filtered.sort((a, b) => {
        const timeA = a.timestamp || (Date.now() - (a.rawTime * 60000));
        const timeB = b.timestamp || (Date.now() - (b.rawTime * 60000));
        return timeA - timeB;
    });
}




    wall.innerHTML = "";
    
    if (filtered.length === 0) {
        wall.innerHTML = "<div style='color:var(--gold); text-align:center; padding:50px; opacity:0.5;'>NO ARCHIVES FOUND</div>";
        return;
    }

    const visible = filtered.slice(0, this.display_limit);
    visible.forEach(r => {
        wall.innerHTML += `
            <div class="rev-card">
                <div class="rev-meta"><span>${r.city || "USA"} • CRYPTO-SIGNED</span><span>${r.timeLabel}</span></div>
                <div class="rev-u">${r.name}</div>
                <div style="color:gold; font-size:0.7rem; margin-bottom:10px;">${"★".repeat(r.star)}</div>
                <p class="rev-t">"${r.msg}"</p>
            </div>`;
    });

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
    let cityInput = document.getElementById('g-city').value; 
    const star = parseInt(document.getElementById('g-stars').value);
    const msg = document.getElementById('g-msg').value;
    if(!msg.trim()) return alert("YOUR TESTIMONY IS REQUIRED");


    const cityMap = { 
        "MIAMI": "MIA", 
        "NEW YORK": "NY", 
        "LOS ANGELES": "LA", 
        "SAN FRANCISCO": "SF" 
    };
    
    const rawCity = cityInput.toUpperCase().trim();
    const city = cityMap[rawCity] || rawCity;

    const newEntry = { 
    name: name.toUpperCase(), 
    city: city, 
    star: star, 
    msg: msg, 
    timestamp: Date.now(), 
    rawTime: 0, 
    timeLabel: "JUST NOW" 
};



    // 1. Sauvegarde du message dans ton historique perso
    let myMsgs = JSON.parse(localStorage.getItem("BRADFORD_MY_MSGS") || "[]");
    myMsgs.unshift(newEntry);
    localStorage.setItem("BRADFORD_MY_MSGS", JSON.stringify(myMsgs));
    
    // 2. MISE À JOUR DES STATS GLOBALES (C'est ici que ça se passe)
    B_ENGINE.stats.total++;
    // Calcul de l'index : 5 étoiles -> index 0, 4 étoiles -> index 1, etc.
    B_ENGINE.stats.stars[5 - star]++; 
    
    // 3. Sauvegarde des nouveaux totaux dans le navigateur
    localStorage.setItem("BRADFORD_STARS", JSON.stringify(B_ENGINE.stats.stars));
    localStorage.setItem("BRADFORD_COUNT", B_ENGINE.stats.total);

    // 4. Ajout du message dans la base de données actuelle
    B_ENGINE.db.unshift(newEntry);
    
    // 5. MISE À JOUR VISUELLE IMMÉDIATE
    B_ENGINE.renderStats(); // Met à jour les barres et le compteur
    B_ENGINE.render();      // Affiche le nouveau message sur le mur
    
    // 6. Nettoyage et fermeture
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
                    <div class="artist-card-exclusive reveal">
                        <div class="city-badge-vertical">${ev.ville}</div>
                        <div class="artist-content">
                            <span style="color:var(--gold); font-size:0.65rem; font-weight:bold; letter-spacing:2px;">${ev.jour} ${ev.date.split('-')[2]} / ${ev.date.split('-')[1]}</span>
                            <h2 class="artist-artist-name">${ev.artiste}</h2>
                            <p style="color:#555; font-size:0.75rem; margin-top:5px;">${ev.details}</p>
                        </div>
                        <div>
                          <button class="cta-button" 
        onclick="reserverEvenement('${ev.ville}', '${ev.date}', '${ev.artiste}')" 
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
    // --- BLOC ANIMATION SCROLL ---
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
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
    <div class="dress-code-wrapper">
        
        <div class="reveal"> <h1 class="title-page">THE RULES OF ELEGANCE</h1>
            <p class="subtitle-page">L'ÉLÉGANCE EST NOTRE UNIQUE PASSE D'ENTRÉE.</p>
        </div>

        <div class="style-category reveal" onclick="toggleStyle(this)">
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

        <div class="style-category reveal" onclick="toggleStyle(this)">
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

        <div class="style-category reveal">
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
            
           <!-- ============================================================
     BRADFORD — BRDF SELECTS ULTRA-COMPLETS
     Remplace simplement tes 3 <select> par ceux-ci.
     Structure identique : value="premium" | value="ban" | value="none"
     ============================================================ -->

<!-- ═══════════════════════════════════════════
     HAUT
     ═══════════════════════════════════════════ -->

<select id="select-top" class="brdf-select">
  <option value="none">-- CHOISIR LE HAUT --</option>

  <!-- ── BLAZERS & VESTES STRUCTURÉES ── -->

  <optgroup label="▸ BLAZERS & VESTES STRUCTURÉES">
    <option value="premium">Blazer Double-Breasted (Laine froide)</option>
    <option value="premium">Blazer Single-Breasted (Laine / Mohair)</option>
    <option value="premium">Blazer Croisé (Velours Côtelé)</option>
    <option value="premium">Blazer Oversize (Épaules tombantes, Couturier)</option>
    <option value="premium">Blazer Court Structuré (Femme)</option>
    <option value="premium">Smoking (Revers Satin Noir)</option>
    <option value="premium">Smoking (Revers Satin Blanc / Ivoire)</option>
    <option value="premium">Smoking Velours (Bordeaux / Bleu Nuit)</option>
    <option value="premium">Spencer (Veste Courte de Smoking)</option>
    <option value="premium">Veste en Cuir Lisse (Coupe Ajustée)</option>
    <option value="premium">Veste en Cuir Grainé (Archive)</option>
    <option value="premium">Veste en Cuir Verni</option>
    <option value="premium">Veste en Cuir Suédé (Daim)</option>
    <option value="premium">Veste Biker (Cuir, Zips Métal)</option>
    <option value="premium">Veste Moto Lacée (Cuir Brut)</option>
    <option value="premium">Veste en Velours (Bordeaux / Emeraude / Noir)</option>
    <option value="premium">Veste en Daim Frangé (Style 70's Luxe)</option>
    <option value="premium">Veste Kimono (Soie / Brocart)</option>
    <option value="premium">Veste Kimono (Jacquard Floral)</option>
    <option value="premium">Veste Harrington (Satin / Nylon Haute Gamme)</option>
    <option value="premium">Veste MA-1 Bomber (Nylon Premium)</option>
    <option value="premium">Veste Teddy (Laine / Fourrure Col)</option>
    <option value="premium">Veste Varsity (Cuir & Laine, Personnalisée)</option>
    <option value="premium">Veste en Jean Brut (Selvedge)</option>
    <option value="premium">Veste Shearling (Mouton Retourné)</option>
    <option value="premium">Veste en Tweed (Chanel / Harris)</option>
    <option value="premium">Veste en Maille Crochetée (Designer)</option>
    <option value="premium">Manteau Court (Laine Camel)</option>
    <option value="premium">Cape (Laine / Cachemire)</option>
    <option value="premium">Trench Court (Coton Gabardine)</option>
    <option value="premium">Veste Imprimée (Print Artistique / Archive)</option>
    <option value="premium">Veste Sequins (Intégrale)</option>
    <option value="premium">Veste Métallisée (Tissu Lamé)</option>
    <option value="premium">Veste en PVC / Vinyle (Transparent)</option>
    <option value="premium">Veste Tailored (Boutons Dorés, Marine)</option>
  </optgroup>

  <!-- ── CHEMISES & TOPS HABILLÉS ── -->

  <optgroup label="▸ CHEMISES & TOPS HABILLÉS">
    <option value="premium">Chemise en Soie (Col Italien)</option>
    <option value="premium">Chemise en Soie (Col Mao)</option>
    <option value="premium">Chemise en Soie (Col Lavallière / Nœud)</option>
    <option value="premium">Chemise en Soie Imprimée (Motif Artistique)</option>
    <option value="premium">Chemise en Satin (Brillant Luxe)</option>
    <option value="premium">Chemise en Organza (Transparente)</option>
    <option value="premium">Chemise en Batiste (Froufrous / Jabot)</option>
    <option value="premium">Chemise à Plastron (Smoking)</option>
    <option value="premium">Chemise Oversize (Couturier, Col Structuré)</option>
    <option value="premium">Chemise en Lin (Froissé Luxe)</option>
    <option value="premium">Chemise en Popeline (Coupe Parfaite)</option>
    <option value="premium">Chemise en Velours (Col Ouvert)</option>
    <option value="premium">Blouse en Soie (Femme, Manches Ballon)</option>
    <option value="premium">Blouse en Organza (Femme, Volants)</option>
    <option value="premium">Corsage en Satin (Bustier Structuré)</option>
    <option value="premium">Corset en Cuir (Designer)</option>
    <option value="premium">Corset en Satin (Laçage Dos)</option>
    <option value="premium">Corset en Brocart (Brodé / Jacquard)</option>
    <option value="premium">Body en Dentelle Fine</option>
    <option value="premium">Body en Maille Résille (Luxe)</option>
    <option value="premium">Body en Satin (Col Plongeant)</option>
    <option value="premium">Body en Velours (Décolleté)</option>
    <option value="premium">Top Bandeau (Satin / Sequins)</option>
    <option value="premium">Top Bralette en Dentelle (Couturier)</option>
    <option value="premium">Top en Maille Crochetée (Designer)</option>
    <option value="premium">Top Architectural (Designer, Armaturé)</option>
    <option value="premium">Top Asymétrique (Couturier)</option>
    <option value="premium">Top Drapé (Jersey Soie)</option>
    <option value="premium">Top Sequins Intégral</option>
    <option value="premium">Top Métallisé (Lamé)</option>
    <option value="premium">Top en Cuir (Bustier / Crop)</option>
    <option value="premium">Top en PVC (Transparent / Vinyle)</option>
    <option value="premium">Crop Top Structured (Rigide, Couturier)</option>
    <option value="premium">Haut en Plumes (Designer)</option>
    <option value="premium">Haut en Strass / Cristaux (Brodé)</option>
    <option value="premium">Chemise Lurex (Fil Métallique)</option>
  </optgroup>

  <!-- ── PULLS & MAILLES PREMIUM ── -->

  <optgroup label="▸ PULLS & MAILLES PREMIUM">
    <option value="premium">Pull Cachemire (Coupe Ajustée)</option>
    <option value="premium">Pull Cachemire (Col Roulé)</option>
    <option value="premium">Pull en Laine Mérinos (Col V)</option>
    <option value="premium">Pull en Angora (Duveteux Luxe)</option>
    <option value="premium">Pull en Mohair (Oversized Luxe)</option>
    <option value="premium">Pull en Soie-Cachemire Mélangé</option>
    <option value="premium">Cardigan Long (Cachemire / Mohair)</option>
    <option value="premium">Débardeur en Maille Fine (Cachemire)</option>
    <option value="premium">Pull Torsadé (Irlandais, Laine Brute)</option>
    <option value="premium">Pull Intarsia (Motif Jacquard Luxe)</option>
    <option value="premium">Pull en Lurex (Maille Brillante)</option>
    <option value="premium">Pull Crocheté (Designer, Voir-Through)</option>
    <option value="premium">Crop Pull Ajusté (Cachemire)</option>
    <option value="premium">Col Roulé en Soie</option>
    <option value="premium">Polo en Piqué (Coton Pima / Cachemire)</option>
    <option value="premium">Polo en Maille Fine (Couleur Unie Luxe)</option>
  </optgroup>

  <!-- ── T-SHIRTS ACCEPTÉS (Premium/Discret) ── -->

  <optgroup label="▸ T-SHIRTS ACCEPTÉS (Contexte Premium)">
    <option value="premium">T-shirt Blanc Uni (Coton Égyptien, Coupe Parfaite)</option>
    <option value="premium">T-shirt Noir Uni (Ajusté, Qualité Supima)</option>
    <option value="premium">T-shirt Graphique (Imprimé Artistique / Archive Luxe)</option>
    <option value="premium">T-shirt en Soie (Uni, Col Rond)</option>
    <option value="premium">Débardeur Fin (Côtelé Luxe)</option>
  </optgroup>

  <!-- ── TENUES COMPLÈTES HAUTS ── -->

  <optgroup label="▸ ENSEMBLES / COMBINAISONS (Haut)">
    <option value="premium">Combinaison Pantalon (Jumpsuit Soie / Satin)</option>
    <option value="premium">Combinaison Courte (Romper en Satin)</option>
    <option value="premium">Robe Moulante (Maille / Jersey)</option>
    <option value="premium">Robe en Satin (Biais, Longue)</option>
    <option value="premium">Robe en Velours (Midi / Longue)</option>
    <option value="premium">Robe en Sequins (Mini / Midi)</option>
    <option value="premium">Robe Bustier (Corset intégré)</option>
    <option value="premium">Robe Asymétrique (Couturier)</option>
    <option value="premium">Robe en Dentelle (Transparence Luxe)</option>
    <option value="premium">Robe en Cuir (Moulante)</option>
    <option value="premium">Robe Cut-Out (Découpes Stratégiques)</option>
    <option value="premium">Mini Robe Architecturale (Designer)</option>
    <option value="premium">Robe Wrap (Soie Imprimée)</option>
    <option value="premium">Robe en Plumes (Marabout / Autruche)</option>
    <option value="premium">Tenue Traditionnelle Luxe (Kaftan / Kimono / Ao Dai en Soie)</option>
  </optgroup>

  <!-- ── BANNIS ── -->

  <optgroup label="✗ NON ADMIS">
    <option value="ban">T-shirt Oversize / Logo massif</option>
    <option value="ban">Hoodie / Sweat-shirt</option>
    <option value="ban">Débardeur de Sport / Rashguard</option>
    <option value="ban">Maillot de Foot / Jersey Sportif</option>
    <option value="ban">T-shirt Souvenir / Imprimé Touristique</option>
    <option value="ban">Chemise Hawaïenne (Casual)</option>
    <option value="ban">Veste de Survêtement / Tracksuit</option>
    <option value="ban">Flanelle de Bûcheron (Oversize)</option>
    <option value="ban">Gilet à Capuche (Zippé)</option>
    <option value="ban">Pull à Capuche (Logo Université)</option>
    <option value="ban">Débardeur Filet de Pêche</option>
    <option value="ban">Chemise en Polyester Low-Cost</option>
    <option value="ban">Crop Top Basique (H&M / Shein)</option>
    <option value="ban">Haut de Pyjama</option>
  </optgroup>
</select>

<!-- ═══════════════════════════════════════════
     BAS
     ═══════════════════════════════════════════ -->

<select id="select-bottom" class="brdf-select">
  <option value="none">-- CHOISIR LE BAS --</option>

  <!-- ── PANTALONS TAILORING ── -->

  <optgroup label="▸ PANTALONS TAILORING & HABILLÉS">
    <option value="premium">Pantalon Tailoring Large (Flanelle Grise)</option>
    <option value="premium">Pantalon Tailoring Large (Flanelle Noire)</option>
    <option value="premium">Pantalon Tailoring Ajusté (Laine Mérinos)</option>
    <option value="premium">Pantalon Cigarette (Coupe Nette, Mi-Cheville)</option>
    <option value="premium">Pantalon à Pince Haut (Taille Haute Couturier)</option>
    <option value="premium">Pantalon Marlène (Jambes Larges Flottantes)</option>
    <option value="premium">Pantalon en Velours Côtelé (Couleur Riche)</option>
    <option value="premium">Pantalon Smoking (Galon Satin)</option>
    <option value="premium">Pantalon en Soie (Large, Fluide)</option>
    <option value="premium">Pantalon en Satin (Biais)</option>
    <option value="premium">Pantalon en Organza (Transparent, Luxe)</option>
    <option value="premium">Pantalon Palazzo (Soie / Chiffon)</option>
    <option value="premium">Pantalon en Brocart (Jacquard)</option>
    <option value="premium">Pantalon en Tweed</option>
    <option value="premium">Pantalon en Lin (Coupe Ample, Qualité Luxe)</option>
    <option value="premium">Pantalon en Cachemire (Maille Fine)</option>
    <option value="premium">Pantalon Oversize (Couturier, Tombé Parfait)</option>
    <option value="premium">Baggy Premium (Coupe Architecturale)</option>
    <option value="premium">Pantalon Cargo (Nylon Technique Luxe / Designer)</option>
    <option value="premium">Pantalon Flare (Pattes d'Éléphant, Couturier)</option>
    <option value="premium">Pantalon Bootcut (Laine Stretch)</option>
  </optgroup>

  <!-- ── CUIRS & MATIÈRES FORTES ── -->

  <optgroup label="▸ CUIRS & MATIÈRES FORTES">
    <option value="premium">Pantalon en Cuir Lisse (Noir, Ajusté)</option>
    <option value="premium">Pantalon en Cuir Grainé</option>
    <option value="premium">Pantalon en Cuir Verni</option>
    <option value="premium">Pantalon en Daim / Suédé</option>
    <option value="premium">Legging en Cuir (Ajusté Luxe)</option>
    <option value="premium">Pantalon en PVC / Vinyle (Designer)</option>
    <option value="premium">Pantalon en Latex (Couturier)</option>
    <option value="premium">Pantalon en Neoprène (Designer)</option>
    <option value="premium">Pantalon en Sequins (Intégral)</option>
    <option value="premium">Pantalon Métallisé (Lamé / Lurex)</option>
  </optgroup>

  <!-- ── DENIM ── -->

  <optgroup label="▸ DENIM PREMIUM">
    <option value="premium">Denim Brut Japonais (Noir, Selvedge)</option>
    <option value="premium">Denim Brut Japonais (Indigo Profond)</option>
    <option value="premium">Jean Slim (Noir, Ajusté Net)</option>
    <option value="premium">Jean Straight (Couture, Non Délavé)</option>
    <option value="premium">Jean Taille Haute (Coupe Nette)</option>
    <option value="premium">Jean Déchiré (Luxe Designer, Distressed Maîtrisé)</option>
    <option value="premium">Jean Flare (Vintage Luxe, Taille Haute)</option>
    <option value="premium">Jean Barrel / Baggy (Designer)</option>
  </optgroup>

  <!-- ── JUPES ── -->

  <optgroup label="▸ JUPES">
    <option value="premium">Jupe Midi en Satin (Biais)</option>
    <option value="premium">Jupe Longue en Satin (Sol)</option>
    <option value="premium">Jupe Midi en Velours</option>
    <option value="premium">Jupe Midi en Soie Imprimée</option>
    <option value="premium">Jupe Mini en Cuir (Ajustée)</option>
    <option value="premium">Jupe Mini Sequins</option>
    <option value="premium">Jupe Mini en Tweed (Chanel)</option>
    <option value="premium">Jupe Portefeuille (Soie / Jersey)</option>
    <option value="premium">Jupe Tutu / Tulle (Couturier, Volumineuse)</option>
    <option value="premium">Jupe Plissée (Plissé Soleil, Issey Miyake Style)</option>
    <option value="premium">Jupe en Dentelle (Transparence Luxe)</option>
    <option value="premium">Jupe en Cuir (Midi, Moulante)</option>
    <option value="premium">Jupe Longue en Sequins</option>
    <option value="premium">Jupe Asymétrique (Couturier)</option>
    <option value="premium">Jupe en Plumes (Mini / Midi)</option>
    <option value="premium">Jupe en Latex (Designer)</option>
    <option value="premium">Jupe en Brocart (Midi, Jacquard)</option>
    <option value="premium">Jupe Crayon (Laine, Coupe Précise)</option>
    <option value="premium">Jupe Longue en Mousseline (Fluide)</option>
    <option value="premium">Mini-Jupe en Jean Brut (Taille Haute)</option>
  </optgroup>

  <!-- ── BANNIS ── -->

  <optgroup label="✗ NON ADMIS">
    <option value="ban">Short / Bermuda</option>
    <option value="ban">Jogging / Pantalon de Sport</option>
    <option value="ban">Legging en Lycra / Collant Opaque Seul</option>
    <option value="ban">Bas de Survêtement / Tracksuit</option>
    <option value="ban">Short de Bain</option>
    <option value="ban">Short en Jean (Coupé / Cutoff)</option>
    <option value="ban">Cargo Bas de Gamme (Polyester)</option>
    <option value="ban">Pantalon de Pyjama</option>
    <option value="ban">Jean Délavé / Blanchi (Style Usé Excessif)</option>
    <option value="ban">Sarouel / Aladin (Casual)</option>
  </optgroup>
</select>

<!-- ═══════════════════════════════════════════
     SOULIERS
     ═══════════════════════════════════════════ -->

<select id="select-shoes" class="brdf-select">
  <option value="none">-- CHOISIR LES SOULIERS --</option>

  <!-- ── CHAUSSURES HABILLÉES HOMME ── -->

  <optgroup label="▸ CHAUSSURES HABILLÉES">
    <option value="premium">Mocassins Vernis (Noir / Bordeaux)</option>
    <option value="premium">Mocassins à Glands (Cuir Pleine Fleur)</option>
    <option value="premium">Mocassins Horsebit (Style Gucci)</option>
    <option value="premium">Mocassins Plateforme (Cuir Luxe)</option>
    <option value="premium">Derbies Richelieu (Cuir Box Calf)</option>
    <option value="premium">Derbies Cap-Toe (Noir Patiné)</option>
    <option value="premium">Derbies Brogue (Cuir Grainé)</option>
    <option value="premium">Oxford à Lacets (Cuir Vernis Noir)</option>
    <option value="premium">Oxford Double Monk-Strap</option>
    <option value="premium">Souliers à Boucle (Monk Strap Simple)</option>
    <option value="premium">Loafers en Velours (Col de Pied Brodé)</option>
    <option value="premium">Mules en Cuir (Couture)</option>
    <option value="premium">Mules en Daim (Talon Plat Luxe)</option>
  </optgroup>

  <!-- ── BOTTINES & BOOTS ── -->

  <optgroup label="▸ BOTTINES & BOOTS">
    <option value="premium">Bottines Chelsea (Cuir Box Calf)</option>
    <option value="premium">Bottines Chelsea (Cuir Verni)</option>
    <option value="premium">Bottines Chelsea (Daim Noir)</option>
    <option value="premium">Bottines à Talon Bloc (Cuir Luxe)</option>
    <option value="premium">Bottines à Talon Aiguille (Cuir, Bout Pointu)</option>
    <option value="premium">Bottines Zippées Côté (Cuir Grainé)</option>
    <option value="premium">Bottines à Lacets (Style Rock Luxe)</option>
    <option value="premium">Boots Motard (Cuir Épais, Boucles Métal)</option>
    <option value="premium">Boots Cowboy (Cuir Exotique / Brodé)</option>
    <option value="premium">Boots Plateforme (Cuir, Semelle Épaisse)</option>
    <option value="premium">Boots Cuissardes (Cuir Noir, Sur-Genou)</option>
    <option value="premium">Boots Genoux (Cuir / Daim)</option>
    <option value="premium">Boots Militaires Luxe (Cuir Poli, Œillets Or)</option>
    <option value="premium">Boots en Velours (Talon Kitten)</option>
    <option value="premium">Bottines Sock Boots (Maille / Cuir)</option>
    <option value="premium">Boots à Crampons / Lug Sole (Designer)</option>
  </optgroup>

  <!-- ── TALONS ── -->

  <optgroup label="▸ TALONS & ESCARPINS">
    <option value="premium">Escarpins Aiguille (Noir, Cuir Classique)</option>
    <option value="premium">Escarpins Aiguille (Vernis, Bout Carré)</option>
    <option value="premium">Escarpins à Bride (Slingback, Luxe)</option>
    <option value="premium">Escarpins Plateforme (Taille Haute)</option>
    <option value="premium">Escarpins Mules (Talons Aiguille, Ouvert)</option>
    <option value="premium">Sandales à Talons Sculptés (Designer)</option>
    <option value="premium">Sandales Strappy (Cuir Fine, Talon Haut)</option>
    <option value="premium">Sandales Gladiateur (Cuir, Talon Bloc)</option>
    <option value="premium">Talons Kitten (Élégance Minimaliste)</option>
    <option value="premium">Talons Bloc (Cuir, Robuste Luxe)</option>
    <option value="premium">Talons en Perspex / Acrylique (Designer)</option>
    <option value="premium">Mules à Talon (Cuir / Satin)</option>
    <option value="premium">Chaussures Ballet Flat (Cuir Pleine Fleur)</option>
    <option value="premium">Mary-Janes à Talon (Cuir Luxe)</option>
  </optgroup>

  <!-- ── SNEAKERS DE LUXE ── -->

  <optgroup label="▸ SNEAKERS DE LUXE & LIMITÉ">
    <option value="premium">Baskets de Luxe (Edition Limitée, Impeccables)</option>
    <option value="premium">Sneakers Blanches Minimalistes (High-End)</option>
    <option value="premium">Sneakers Noires Monochrome (Designer)</option>
    <option value="premium">Platform Sneakers (Chunky, Designer)</option>
    <option value="premium">Sneakers en Cuir Pleine Fleur (Blanc)</option>
    <option value="premium">Low-Top Luxe (Cuir Vernis, Monochrome)</option>
    <option value="premium">High-Top en Cuir (Couturier / Archive)</option>
    <option value="premium">Sneakers en Daim (Couleur Unie, Premium)</option>
    <option value="premium">Sneakers Collab Artiste / Couturier</option>
    <option value="premium">Running Luxe (Silhouette Technique Couturier)</option>
  </optgroup>

  <!-- ── BANNIS ── -->

  <optgroup label="✗ NON ADMIS">
    <option value="ban">Sandales / Tongs / Claquettes</option>
    <option value="ban">Chaussures de Sport Basiques (Running / Training)</option>
    <option value="ban">Sneakers Sales / Usées</option>
    <option value="ban">Chaussures de Randonnée / Trail</option>
    <option value="ban">Chaussures de Sécurité / Travail</option>
    <option value="ban">Crocs (Peu importe la couleur)</option>
    <option value="ban">Espadrilles Basiques</option>
    <option value="ban">Moccasins en Plastique / Bas de Gamme</option>
    <option value="ban">Chaussons / Slippers Maison</option>
    <option value="ban">Sneakers avec Semelle Lumineuse (Enfant)</option>
  </optgroup>
</select>

            <p style="font-family:'Cinzel'; font-size:0.55rem; color:#444; margin: 20px 0 10px; letter-spacing:1px;">OU DÉCRIRE VOTRE COMPOSITION LIBREMENT :</p>
            <textarea id="text-analyzer" class="analyzer-input" placeholder="Ex: Ensemble Margiela noir, chemise col cassé, bottines en cuir poli..."></textarea>
            
            <button onclick="runUltimateAnalysis()" style="width:100%; background:#D4AF37; color:#000; border:none; padding:18px; font-family:'Cinzel'; font-weight:bold; letter-spacing:3px; cursor:pointer; margin-top:20px;">
                VALIDER LE PROTOCOLE
            </button>

            <div id="final-verdict" style="margin-top:25px; text-align:center; font-family:'Cinzel'; letter-spacing:4px; display:none;"></div>
        </div>

        <div class="ban-zone reveal">
            <h4 style="font-family:'Cinzel'; font-size:0.7rem; color:#ff4d4d; letter-spacing:2px; margin-bottom:20px;">ZONE DE REFUS AUTOMATIQUE</h4>
            <p style="font-size:0.75rem; color:#666; line-height:2;">
                Tout vêtement de sport, hoodie, casquette, short ou sandale entraînera un refus définitif. Les logos "monogrammes" excessifs sont jugés incompatibles avec l'esthétique du club.
            </p>
        </div>

        <div class="reveal" style="margin-top:40px; border-left: 2px solid #D4AF37; padding-left:20px;">
            <h3 style="font-family:'Cinzel'; font-size:0.85rem; color:#fff; letter-spacing:3px; margin-bottom:15px;">DISCRÉTION & MARQUE DE LUXE</h3>
            <p style="color:#888; font-size:0.8rem; line-height:1.8; text-align:justify;">
                Nous encourageons nos invités à exprimer leur style personnel, à condition qu’il soit en harmonie avec le ton ultra-luxe du club. Les logos ostentatoires doivent être minimisés. Notre équipe se réserve le droit souverain de juger de la conformité de toute tenue. Ce jugement est final et non négociable. Nous vous remercions d'être des ambassadeurs de notre image.
            </p>
        </div>

        <button class="reveal" onclick="renderContactPage()" style="background:none; border:1px solid #D4AF37; color:#D4AF37; padding:15px 30px; font-family:'Cinzel'; font-size:0.6rem; letter-spacing:3px; cursor:pointer; width:100%; margin: 40px 0;">
            Doute sur votre tenue ? Contactez-nous
        </button>

        <div class="reveal" style="font-family:'Courier New'; font-size:0.7rem; color:#D4AF37; letter-spacing:2px; text-align: center; width: 100%; margin-top: 20px;">
            MANAGEMENT DECISION IS FINAL — NO NEGOTIATION
        </div>

    </div>
    `;
    window.scrollTo(0,0);

    // --- BLOC ANIMATION SCROLL (Moteur identique) ---
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 }); 

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
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
            <h1 class="tit-page">REQUÊTE<br>ENREGISTRÉE</h1>

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



function goToReservationsDirect() {
    // 1. On nettoie la vidéo et le spacer
    if (typeof destroyHero === "function") {
        destroyHero();
    } else {
        const hero = document.getElementById("heroVideo");
        const spacer = document.getElementById("heroSpacer");
        if (hero) hero.style.display = "none";
        if (spacer) spacer.style.display = "none";
        const header = document.querySelector("header");
        if (header) header.classList.remove("transparent-header");
    }

    // 2. LA LIGNE MAGIQUE : On cache l'interface de l'introduction (le HUD)
    // On cherche l'élément qui contient ton interface "Elite/Ultra"
    const hud = document.getElementById("event-hud-ultra") || document.querySelector(".hud-elite-container");
    if (hud) {
        hud.style.display = "none";
        // Si tu as un moteur d'animation (shutdownEngine), on l'arrête aussi
        if (typeof shutdownEngine === "function") shutdownEngine();
    }

    // 3. On lance la navigation
    if (typeof navigate === "function") {
        navigate('reservations');
    }

    // 4. On remonte tout en haut
    window.scrollTo(0, 0);
}
function renderFAQPage() {
    if (!APP_CONTENT) return;

    const faqData = [
    {
        category: "MEMBERS & ADHÉSION",
        questions: [
            { q: "Comment devenir Member au Bradford ?", a: "L'adhésion est fixée à $25,000 par an. Elle est strictement soumise à l'approbation du comité. Chaque demande est traitée avec une discrétion absolue." },
            { q: "Quels sont les avantages exclusifs des Members ?", a: "Accès prioritaire mondial (Miami, LA, NYC, SF), invitations aux soirées privées à accès restreint, et ligne directe 24/7 avec le concierge VIP." },
            { q: "L'adhésion garantit-elle une table ?", a: "Les Members ont la priorité absolue sur les réservations de la Main Room, mais une réservation préalable reste fortement conseillée via reservations@bradfordnightclub.com." },
            { q: "Comment renouveler mon statut de Member ?", a: "Le renouvellement est annuel et dépend de la validation du comité. Contactez la ligne privée au +1 305 VIP BRAD pour les modalités." },
            { q: "Puis-je parrainer un nouveau Member ?", a: "Le parrainage par un Member actif est un atout majeur lors de l'examen d'une candidature par le comité, mais ne garantit pas l'admission." },
            { q: "Existe-t-il des accès temporaires pour les non-membres ?", a: "L'accès standard est possible selon l'affluence, mais certaines soirées spéciales sont réservées aux Members." }
        ]
    },
    {
        category: "ACCÈS & IDENTITÉ",
        questions: [
            { q: "Quel est l'âge minimum requis ?", a: "L'accès est strictement réservé aux personnes de 21 ans et plus. Aucune exception n'est tolérée." },
            { q: "Quels documents d'identité sont acceptés ?", a: "Seule une pièce d'identité gouvernementale originale est acceptée (Passeport, Carte d'Identité ou Permis de conduire). Les copies et photos sont refusées." },
            { q: "Puis-je entrer après 2h du matin ?", a: "Les portes ouvrent à 00:00. L'entrée peut être limitée ou refusée après 02:00, même avec une réservation, si la capacité maximale est atteinte." },
            { q: "Pourquoi la file d'attente commence-t-elle à 23h30 ?", a: "Pour garantir un contrôle de sécurité fluide et permettre une ouverture des portes précise à minuit." },
            { q: "Le club est-il accessible aux personnes à mobilité réduite ?", a: "Absolument. Nos établissements sont conçus pour offrir une expérience de luxe accessible à tous nos clients." },
            { q: "Que faire si ma pièce d'identité est étrangère ?", a: "Les passeports internationaux originaux sont parfaitement acceptés et scannés par notre système de sécurité." }
        ]
    },
    {
        category: "RÉSERVATIONS & TABLES",
        questions: [
            { q: "Quel est le Minimum Spend pour une table ?", a: "Le Minimum Bottle Spend est de $3,000 le jeudi et dimanche, et de $5,000 les vendredi et samedi pour sécuriser une table en Main Line." },
            { q: "Qu'est-ce qui est inclus dans le prix d'une bouteille ?", a: "Tous les prix incluent les soft drinks, jus et mixers premium. Notez que le service de 20% est appliqué en sus." },
            { q: "Comment fonctionne le dépôt de garantie ?", a: "Un dépôt de $200 est requis pour confirmer toute réservation de table. Ce montant est déduit de votre facture finale." },
            { q: "Combien d'invités par bouteille ?", a: "La règle standard est d'une bouteille minimum pour 4 invités. Pour les groupes de prestige, contactez le concierge." },
            { q: "Quelle est la politique d'annulation pour les tables ?", a: "Annulation gratuite jusqu'à 7 jours avant. Moins de 48h avant l'événement, le dépôt est intégralement conservé." },
            { q: "Puis-je choisir mon emplacement sur le plan ?", a: "Les demandes spécifiques (Main Room, Backstage) sont traitées en priorité pour les Members et les réservations à haut spend." },
            { q: "Que se passe-t-il si j'arrive en retard à ma table ?", a: "Les tables sont maintenues jusqu'à 02:30. Au-delà, la réservation peut être annulée sans remboursement du dépôt." }
        ]
    },
    {
        category: "MENU PRESTIGE & BOUTEILLES",
        questions: [
            { q: "Quelle est la bouteille la plus rare de votre cave ?", a: "Le Macallan 1926 Fine & Rare, affiché à $1,900,000. Un chef-d'œuvre de l'histoire du whisky." },
            { q: "Quels sont les champagnes de format exceptionnel ?", a: "Nous proposons l'Armand de Brignac Midas en 30L au prix de $210,000 pour des célébrations hors normes." },
            { q: "Peut-on commander des spiritueux hors-menu ?", a: "Oui. Pour des raretés comme le Louis XIII Black Pearl, prévenez la conciergerie 48h à l'avance." },
            { q: "Proposez-vous des cocktails signature ?", a: "Oui, comme 'The Billionaire' ($950) ou le 'Golden Mirage' à base de 1942 et or comestible ($60)." },
            { q: "Qu'est-ce qu'un 'Luxury Add-on' ?", a: "Ce sont des services premium : fumée de glace sèche ($35), feuilles d'or comestibles ($30) ou seaux à glace en cristal ($20)." },
            { q: "Quelles sont les options d'accompagnement frais ?", a: "Nous servons des garnitures d'élite : baies fraîches ($18), cerises Maraschino premium ($12) ou olives Castelvetrano ($14)." },
            { q: "Les sparklers (étincelles) sont-ils payants ?", a: "Le Sparkler Show avec LED est un service additionnel à $60 pour une présentation de bouteille spectaculaire." }
        ]
    },
    {
        category: "PAIEMENTS & SÉCURITÉ",
        questions: [
            { q: "Quels sont les modes de paiement acceptés ?", a: "Apple Pay et les cartes bancaires majeures. Pour les réservations en ligne uniquement, les Crypto-monnaies sont acceptées." },
            { q: "Puis-je payer une bouteille en Crypto au club ?", a: "Non. À l'intérieur du club, seuls Apple Pay et les cartes de crédit sont acceptés pour le règlement des consommations." },
            { q: "Qu'est-ce que le Bradford Encrypted System ?", a: "C'est notre protocole de sécurité exclusif qui crypte toutes vos données personnelles et bancaires pour une confidentialité totale." },
            { q: "Le service charge de 20% est-il facultatif ?", a: "Non, cette charge de service est automatiquement appliquée à toutes les commandes (bouteilles et add-ons)." },
            { q: "Les prix affichés sur le menu sont-ils TTC ?", a: "Les prix sont hors taxes et hors service. Cliquez sur un prix pour voir le coût total incluant les frais." },
            { q: "Comment obtenir une facture détaillée ?", a: "Adressez votre demande à reservations@bradfordnightclub.com ou demandez à votre serveur avant la fermeture de la note." }
        ]
    },
    {
        category: "DRESS CODE & ÉTIQUETTE",
        questions: [
            { q: "Quel est le Dress Code imposé ?", a: "Élégance absolue. Blazer/Costume pour les hommes, tenue haute couture pour les femmes. Sneakers de sport interdites." },
            { q: "Pourquoi les photos sont-elles limitées ?", a: "Pour préserver la vie privée de nos clients et Members. L'usage du flash est strictement prohibé." },
            { q: "Puis-je venir en tenue décontractée chic ?", a: "Le Bradford impose un standard élevé. Le management se réserve le droit de refuser l'entrée en cas de tenue jugée inadéquate." },
            { q: "Les lunettes de soleil sont-elles autorisées ?", a: "Uniquement en extérieur. Elles doivent être retirées à l'intérieur pour des raisons de sécurité." },
            { q: "Quelle est la règle concernant les célébrités ?", a: "Toute demande de selfie ou harcèlement envers un autre client entraîne une expulsion immédiate sans remboursement." }
        ]
    },
    {
        category: "LOGISTIQUE & SERVICES VIP",
        questions: [
            { q: "Comment fonctionne le partenariat Uber Black ?", a: "Nous offrons un service 'Premium Arrival Concierge'. Votre chauffeur Uber Black vous dépose directement au point d'accès prioritaire." },
            { q: "Proposez-vous un service de voiturier ?", a: "Oui, un service de voiturier sécurisé est disponible à l'entrée officielle." },
            { q: "Peut-on privatiser le club ?", a: "Oui, pour des événements corporate ou tournages. Contactez events@bradfordnightclub.com." },
            { q: "J'ai oublié un objet au club, que faire ?", a: "Appelez le +1 305 VIP BRAD. Les objets sont stockés 30 jours dans notre coffre-fort avant d'être traités." },
            { q: "Où se trouve le prochain Bradford ?", a: "Notre expansion majeure est prévue à Las Vegas pour l'horizon 2027-2028." },
            { q: "Proposez-vous des cigares ?", a: "Oui, une sélection de cigares premium est disponible entre $100 et $250 l'unité pour nos espaces fumeurs VIP." },
            { q: "Qu'est-ce que le service de Butler privé ?", a: "Pour $300 la nuit, un majordome dédié s'occupe exclusivement de votre table et de vos commandes." },
            { q: "Le club dispose-t-il d'un héliport ?", a: "Pour certains établissements, une coordination est possible. Contactez le concierge pour les transferts en hélicoptère." }
        ]
    },
    {
        category: "DÉTAILS DU MENU & ADD-ONS",
        questions: [
            { q: "Quels sont les tarifs des softs et eaux ?", a: "La bouteille de Fiji ou VOSS Still est à $12. Les boissons énergisantes (Red Bull, Celsius, Monster Gold) sont entre $14 et $16." },
            { q: "Proposez-vous des options de récupération (Recovery) ?", a: "Oui, nous proposons des packs Liquid IV ($10), Gatorade Fierce ($10) et Vitamin Water ($12) pour votre confort durant la soirée." },
            { q: "Qu'est-ce que le service 'Dry Ice Smoke' ?", a: "C'est un effet visuel de fumée cryogénique ajouté à votre service de bouteille pour $35." },
            { q: "Le set de pailles en or est-il réutilisable ?", a: "Absolument. Le Gold Straw Set ($25) est un accessoire de luxe réutilisable pour nos clients exclusifs." },
            { q: "Peut-on personnaliser sa bouteille ?", a: "Oui, nous proposons une gravure personnalisée (Bottle Engraving) sur bouteille pour $180. Prévoir un délai pour la réalisation." },
            { q: "Quelles sont les options de présentation LED ?", a: "Nous proposons des seaux à glace LED ($80) et des plateaux néon pour le service de 10 shots ($120)." },
            { q: "Y a-t-il des garnitures de luxe pour les cocktails ?", a: "Nous proposons des Silver Rim Upgrades ($20) et des zestes d'agrumes frais servis en bol ($10-$12)." }
        ]
    },
    {
        category: "PROTOCOLES DE SÉCURITÉ & DISCRÉTION",
        questions: [
            { q: "Qu'est-ce que l'engagement de discrétion Bradford ?", a: "Chaque interaction est traitée avec une confidentialité diplomatique. Nous garantissons la protection totale de l'identité de nos clients de prestige." },
            { q: "Le Bradford Encrypted System conserve-t-il mes données ?", a: "Le système crypte les données pour la validation immédiate mais ne stocke aucune information sensible après votre passage, conformément aux normes de haute sécurité." },
            { q: "Puis-je venir avec ma propre équipe de sécurité ?", a: "Les gardes du corps personnels sont autorisés mais doivent impérativement se coordonner avec notre chef de sécurité 48h avant l'arrivée." },
            { q: "Le club est-il équipé de caméras ?", a: "Pour la sécurité de tous, le club est sous vidéo-protection 24/7, mais les flux sont strictement confidentiels et protégés par le Bradford Encrypted System." },
            { q: "Comment sont gérés les groupes de célébrités ?", a: "Nous disposons d'entrées et de sorties privées sécurisées pour garantir une arrivée et un départ sans exposition publique." }
        ]
    },
    {
        category: "LOGISTIQUE INTERNATIONALE & ÉVÉNEMENTS",
        questions: [
            { q: "Quels sont les bureaux officiels du Bradford ?", a: "Le Bradford Headquarters gère les opérations mondiales. Pour toute demande corporate, contactez l'adresse officielle à Miami Beach." },
            { q: "Comment obtenir une accréditation presse ?", a: "Toutes les demandes média et interviews d'artistes résidents doivent passer par media@bradfordnightclub.com." },
            { q: "Le Bradford organise-t-il des tournages ?", a: "Oui, nos établissements de New York, LA et Miami sont disponibles pour des productions professionnelles de luxe. Contactez le département Events." },
            { q: "Quelle est la capacité maximale du club ?", a: "La capacité varie selon l'établissement (Miami, NYC, SF). Chaque table est strictement limitée pour garantir le confort et la sécurité." },
            { q: "Comment réserver pour un groupe de plus de 15 personnes ?", a: "Ces demandes sont considérées comme des 'Groupes de Prestige' et nécessitent une validation via +1 305 VIP BRAD." }
        ]
    },
    {
        category: "EXPANSION & FUTUR",
        questions: [
            { q: "Le Bradford prévoit-il d'autres ouvertures que Las Vegas ?", a: "Nous évaluons constamment des opportunités dans les hubs mondiaux du luxe, mais Vegas 2027 est actuellement notre priorité majeure." },
            { q: "Peut-on investir dans le groupe Bradford ?", a: "Pour toute demande relative aux investissements et aux flux d'expansion, veuillez contacter le bureau de direction via l'email des Headquaters." },
            { q: "Où trouver les offres d'emploi pour les nouveaux clubs ?", a: "Toutes les opportunités de carrière pour nos futurs établissements sont centralisées sur careers@bradfordnightclub.com." }
        ]
    }
];



    APP_CONTENT.innerHTML = `
        <div class="faq-elite-container fade-in">
            <h1 class="title-page">FREQUENTLY ASKED QUESTIONS</h1>
            <p class="subtitle-page">L'excellence réside dans la clarté.</p>

            <div class="faq-search-section">
                <div class="search-minimal">
                    <input type="text" id="faqInput" placeholder="RECHERCHER" onkeyup="filterFAQ()">
                    <div class="search-line"></div>
                </div>
            </div>

            <div class="faq-accordion" id="faqGrid">
                ${faqData.map((section, sIdx) => `
                    <div class="faq-group">
                        <h2 class="faq-cat-title">${section.category}</h2>
                        ${section.questions.map((item, qIdx) => `
                            <div class="faq-item reveal" data-search="${item.q.toLowerCase()}">
                                <button class="faq-trigger" onclick="handleFaqToggle(${sIdx}, ${qIdx})">
                                    <span>${item.q}</span>
                                    <div class="cross-icon" id="icon-${sIdx}-${qIdx}"></div>
                                </button>
                                <div class="faq-content" id="ans-${sIdx}-${qIdx}">
                                    <div class="faq-text">${item.a}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>

       <div class="faq-luxury-footer">
                <div class="gold-divider"></div>
                <div class="footer-content">
                    <h3>VOUS AVEZ UNE DEMANDE PARTICULIÈRE ?</h3>
                    <p>Notre conciergerie est disponible 24/7 pour nos membres.</p>

                <button class="btn-concierge-ultra" onclick="navigate('contact')">
                    <span>CONTACTER LE CONCIERGE</span>
                </button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
        // --- BLOC ANIMATION SCROLL ---
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
}

// LOGIQUE ACCORDEON - PROPRE ET ROBUSTE
function handleFaqToggle(sIdx, qIdx) {
    const content = document.getElementById(`ans-${sIdx}-${qIdx}`);
    const icon = document.getElementById(`icon-${sIdx}-${qIdx}`);
    const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

    // Fermeture des autres
    document.querySelectorAll('.faq-content').forEach(el => el.style.maxHeight = null);
    document.querySelectorAll('.cross-icon').forEach(el => el.classList.remove('active'));

    if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.add('active');
    }
}

function filterFAQ() {
    const input = document.getElementById('faqInput').value.toLowerCase();
    const items = document.querySelectorAll('.faq-item'); // On cible chaque bloc question+réponse

    items.forEach(item => {
        // On récupère tout le texte à l'intérieur du bloc (Question + Réponse)
        const text = item.textContent.toLowerCase();
        
        if (text.includes(input)) {
            item.style.display = "block"; // On affiche si ça match
        } else {
            item.style.display = "none";  // On cache si ça ne match pas
        }
    });
}

function renderCareersPage() {
    if (!APP_CONTENT) return;

    const positions = [
        { title: 'GUEST RELATIONS & VIP HOST', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z', desc: 'Maîtrise absolue de l\'étiquette et gestion des clients VVIP.' },
        { title: 'CRAFT MIXOLOGY SPECIALIST', icon: 'M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9z', desc: 'Expertise millésimes rares et création de signatures sensorielles.' },
        { title: 'SHADOW UNIT (SECURITY)', icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z', desc: 'Protection périmétrale. Profil militaire ou tactique exigé.' },
        { title: 'ENTERTAINMENT ELITE', icon: 'M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21 15 18.99 15 16.5V6h4V3h-7z', desc: 'Artistes et performeurs à l\'esthétique avant-gardiste.' }
    ];

    APP_CONTENT.innerHTML = `
        <div class="career-container fade-in">
            <h1 class="title-page">CAREERS: GLOBAL EXCELLENCE</h1>
            <p class="subtitle-page">Intégrez la légende Bradford. Là où le luxe rencontre l'invisible.</p>

            <div class="career-intro">
                <p>Travailler au sein de l'écosystème Bradford n'est pas un emploi conventionnel ; c'est une immersion dans les standards les plus exigeants de l'hôtellerie de nuit internationale. Nous recherchons des gardiens de notre promesse.</p>
            </div>

            <h2 class="career-section-title">OPEN POSITIONS</h2>
            <div class="positions-grid">
                ${positions.map(post => `
                    <div class="position-card">
                        <div class="card-icon">
                            <svg viewBox="0 0 24 24"><path d="${post.icon}" fill="currentColor"/></svg>
                        </div>
                        <h3>${post.title}</h3>
                        <p>${post.desc}</p>
                    </div>
                `).join('')}
            </div>

            <div class="perks-section">
                <h2 class="career-section-title">PRÉROGATIVES DU GROUPE</h2>
                <div class="perks-list">
                    <div class="perk-item"><span>🌐</span> RÉSEAU GLOBAL (MIAMI, LA, NYC)</div>
                    <div class="perk-item"><span>💎</span> RÉMUNÉRATION PRESTIGE & BONUS</div>
                    <div class="perk-item"><span>🖋️</span> PROTOCOLES CONCIERGERIE DE LUXE</div>
                    <div class="perk-item"><span>🎩</span> DOTATIONS COUTURE SUR-MESURE</div>
                </div>
            </div>

            <div class="recruitment-protocol">
                <h3>PROTOCOLE DE RECRUTEMENT</h3>
                <p>The Bradford traite chaque demande avec la plus stricte confidentialité. Références ultra-luxe vérifiables obligatoires.</p>
                
                <div class="contact-box">
                    <div class="contact-row" onclick="window.location.href='mailto:careers@bradfordnightclub.com'">
                        <span class="label">EMAIL</span>
                        <span class="value">careers@bradfordnightclub.com</span>
                    </div>
                    <div class="contact-row">
                        <span class="label">TALENT LINE</span>
                        <span class="value">+1 305-VIP-BRAD (Ext. Talent)</span>
                    </div>
                </div>

                <button class="btn-apply-ultra" onclick="window.location.href='mailto:careers@bradfordnightclub.com?subject=Application: Global Excellence'">
                    POSTULER MAINTENANT
                </button>
                
                <p class="note-security">⚠️ Enquête de moralité approfondie systématique.</p>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function renderLegalPage() {
    if (!APP_CONTENT) return;

    const legalSections = [
    {
        ref: "ARTICLE I",
        title: "COMPREHENSIVE SCOPE OF AGREEMENT, DEFINITIONS & BINDING MANDATE",
        content: "This Master Terms of Service Agreement (the 'Agreement') constitutes a legally binding contractual mandate between the individual user, guest, patron, or member (hereinafter 'The Guest') and The Bradford Group, inclusive of its global parent entities, regional subsidiaries, affiliates, and managed nightlife venues (collectively 'The Bradford', 'The Venue', or 'The Group') across jurisdictions including but not limited to Florida, New York, and California. By utilizing this digital interface, executing a reservation, submitting a deposit, or crossing the physical threshold of any Bradford property, The Guest acknowledges having read, understood, and irrevocably consented to these statutes in their entirety. This Agreement incorporates by reference all specific policies regarding Dress Code, Bottle Service, and Privacy. Any prior representations, whether oral, written, or implied through marketing materials, are hereby superseded and rendered null and void by this integration clause. Failure to adhere to any provision herein grants The Bradford the unilateral right to terminate services without notice, refund, or liability. The Guest explicitly waives any right to claim 'lack of notice' regarding these terms, as they are permanently accessible and presented as a prerequisite for any commercial interaction with The Group."
    },
    {
        ref: "ARTICLE II",
        title: "MANDATORY ARBITRATION, CLASS ACTION WAIVER & DISPUTE RESOLUTION",
        content: "EXCEPT FOR SMALL CLAIMS COURT ACTIONS, THE GUEST AGREES THAT ALL DISPUTES, CLAIMS, OR CONTROVERSIES ARISING OUT OF OR RELATING TO THIS AGREEMENT, THE USE OF THE WEBSITE, OR PHYSICAL ATTENDANCE AT THE VENUE SHALL BE RESOLVED EXCLUSIVELY THROUGH BINDING INDIVIDUAL ARBITRATION CONDUCTED BY THE AMERICAN ARBITRATION ASSOCIATION (AAA) IN ACCORDANCE WITH ITS COMMERCIAL ARBITRATION RULES. THE GUEST IRREVOCABLY WAIVES THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS ACTION, REPRESENTATIVE PROCEEDING, OR PRIVATE ATTORNEY GENERAL ACTION. Arbitration shall take place in the County of Miami-Dade (FL), the County of New York (NY), or the County of Los Angeles (CA), depending on the specific venue involved. The arbitrator shall have exclusive authority to resolve any dispute relating to the interpretation, applicability, enforceability, or formation of this Agreement, including any claim that all or any part of this Agreement is void or voidable. Judgment on the award rendered by the arbitrator may be entered in any court having jurisdiction thereof. This clause survives the termination of any relationship between The Guest and The Group."
    },
    {
        ref: "ARTICLE III",
        title: "AGE VERIFICATION, FORENSIC IDENTIFICATION & ACCESS CONTROL STATUTES",
        content: "The Bradford operates in strict adherence to the National Minimum Drinking Age Act (23 U.S.C. § 158) and the specific Liquor Liability Laws of the respective states. Admission is strictly prohibited to any person under the age of twenty-one (21). The Guest must present a valid, non-expired, government-issued identification containing a photograph and date of birth (e.g., U.S. State Driver’s License, U.S. Military ID, or International Passport). The Venue utilizes the 'Bradford Encrypted System', a high-fidelity forensic scanning technology, to verify the authenticity of identification documents. The Group reserves the unilateral, absolute right to refuse admission to any individual, including confirmed reservation holders and Members, if: (a) ID authenticity is questioned; (b) The Guest exhibits signs of pre-arrival intoxication; (c) Dress code standards are not met; (d) The Guest's name appears on any global internal blacklist or sanctioned entity list. Admission is a revocable license granted by The Venue, and this license may be terminated at any moment for any non-discriminatory reason by the Lead Security Officer or Management."
    },
    {
        ref: "ARTICLE IV",
        title: "FINANCIAL DISCLOSURE: MINIMUM SPEND, TAXATION, GRATUITY & LIQUIDATED DAMAGES",
        content: "All table reservations are governed by a 'Minimum Bottle Spend' (MBS) contractual obligation. This MBS represents a guaranteed revenue commitment by The Guest. Crucially, the MBS is a baseline figure and does not include: (i) Applicable State Sales Tax (7% in FL / 8.875% in NY); (ii) A mandatory 20% Service Charge, which is a gratuity distributed to service staff; (iii) A 4% Venue Administrative Fee; (iv) Any premium 'Luxury Add-ons' or surcharges for rare vintages. If The Guest's total consumption fails to reach the MBS, the remaining balance will be charged as a 'Venue Placement Fee'. Deposits are strictly non-refundable. The Guest agrees that the $200.00 (or higher as specified) deposit represents a fair estimate of 'liquidated damages' incurred by The Venue due to lost opportunity costs for late cancellations (under 48 hours) or 'No-Shows'. The Guest explicitly agrees to waive all 'chargeback' rights through their credit card provider for these fees. Any attempt to reverse a legitimate charge for services rendered or deposits forfeited under this agreement will be treated as fraudulent and may result in legal action for 'Theft of Services' and permanent blacklisting."
    },
    {
        ref: "ARTICLE V",
        title: "PHYSICAL PREMISES LIABILITY, PERSONAL INJURY & EXPRESS ASSUMPTION OF RISK",
        content: "The Guest acknowledges that the nightlife environment at The Bradford involves inherent and significant risks, including but not limited to: high-intensity strobe lighting, laser radiation, atmospheric smoke effects, high-decibel audio levels exceeding 100dB (which may cause hearing damage), slippery floor surfaces from liquid spills, and crowded kinetic environments. By entering the premises, The Guest voluntarily and expressly assumes all risks of personal injury, illness, permanent disability, or death. The Bradford, its officers, and directors are hereby indemnified and held harmless from any claims arising from the Guest's attendance. This release includes any injury resulting from the negligence of The Venue, its employees, or third-party contractors. The Guest acknowledges that they are responsible for their own safety and the safety of their belongings. The Bradford does not provide bailment for personal items; the use of the cloakroom or VIP storage is at the Guest's own risk, and The Venue’s liability for lost or stolen items is limited to a maximum of $100.00 USD, regardless of the item’s appraised value."
    },
    {
        ref: "ARTICLE VI",
        title: "PRIVACY, BIOMETRICS & IRREVOCABLE MEDIA LICENSE (CCPA/GDPR/BIPA)",
        content: "The Bradford Group maintains a sophisticated surveillance network. In compliance with the CCPA (California) and similar privacy frameworks, The Guest is notified that all public and semi-private areas are under continuous high-definition video and audio recording. Data is processed through the 'Bradford Encrypted System' for security analytics, asset protection, and legal compliance. By entering, The Guest grants The Bradford an absolute, irrevocable, worldwide, royalty-free, and sub-licensable license to use their name, image, likeness, and voice in any media now known or hereafter devised, including but not limited to promotional videos, social media, and commercial broadcasts, without further notice or compensation. This serves as a 'Blanket Release'. Regarding biometric data: any data captured during ID verification is stored in a secure, encrypted vault and is used exclusively for internal security protocols (e.g., identifying individuals who have been previously ejected or blacklisted) and will not be sold to third-party data brokers."
    },
    {
        ref: "ARTICLE VII",
        title: "SHADOW UNIT OPERATIONS, TACTICAL SECURITY & ZERO-TOLERANCE STATUTES",
        content: "The 'Shadow Unit' is The Bradford's elite internal security force, tasked with maintaining a zero-compromise safety environment. The Guest is subject to physical searches, pat-downs, and electronic metal detection upon entry and at any time while on the premises. Possession of illegal narcotics, paraphrenalia, or weapons of any kind—including those held under a concealed carry permit—is strictly prohibited and will result in immediate ejection and referral to local Law Enforcement (MDPD, NYPD, or LAPD). The Bradford maintains a Zero-Tolerance policy for: (a) Physical or verbal harassment of staff or performers; (b) Unauthorized entry into restricted VIP areas; (c) Solicitation of any kind; (d) Vandalism of property. Ejection under these terms is final and does not entitle The Guest to any refund of deposits, bottle service spends, or entrance fees. The Shadow Unit is authorized to use reasonable force to maintain order and protect the safety of the collective patrons and staff."
    },
    {
        ref: "ARTICLE VIII",
        title: "BOTTLE SERVICE INTEGRITY, CONSUMPTION & ALCOHOL RESPONSIBILITY",
        content: "The Bradford is committed to the Responsible Service of Alcohol (RSA). While Table Service provides large-format spirits, the Lead Guest (the individual whose name is on the reservation) assumes primary liability for the consumption levels at their table. Management and service staff reserve the right to 'cut off' or cease service to any table where guests appear dangerously intoxicated, as mandated by State Liquor Authority (SLA) regulations. No alcohol may be removed from the premises ('to-go' bottles are prohibited by law). Any 'tampering' with bottles, including refilling or bringing outside alcohol into the venue, will result in immediate termination of the table reservation and a mandatory fine of $1,000.00 USD added to the final bill as a penalty for breach of liquor license protocols."
    },
    {
        ref: "ARTICLE IX",
        title: "CYBERSECURITY, ENCRYPTION & BLOCKCHAIN PAYMENT DISCLOSURE",
        content: "All digital interactions with The Bradford are secured by the 'Bradford Encrypted System', utilizing AES-256 bit encryption for data at rest and TLS 1.3 for data in transit. Cryptocurrency payments (BTC, ETH, USDC) for online deposits are processed through decentralized protocols. The Guest acknowledges that blockchain transactions are immutable and subject to network volatility. Once a transaction is broadcast to the network, it is considered a final payment and is not subject to refund, regardless of subsequent changes in the asset's market value. The Bradford is not liable for losses resulting from user-side security failures, such as compromised private keys or incorrect wallet addresses provided by The Guest."
    },
    {
        ref: "ARTICLE X",
        title: "FORCE MAJEURE & OPERATIONAL CONTINUITY",
        content: "The Bradford shall not be liable for any delay or failure in performance resulting from causes beyond its reasonable control, including, without limitation, 'Acts of God' (hurricanes, earthquakes, floods), pandemics, government-mandated lockdowns, civil unrest, terrorist threats, localized power grid failures, or international cyber-warfare impacting digital reservation systems. In the event of a Force Majeure closure, table deposits will be issued as 'Bradford Credit' valid for 12 months, but cash or crypto refunds will not be processed. This ensures the operational stability of The Group's global infrastructure."
    },
    {
        ref: "ARTICLE XI",
        title: "GOVERNING LAW, VENUE & SEVERABILITY",
        content: "This Agreement is governed by the laws of the State where the specific venue is located (Florida for Miami; New York for NYC; California for LA/SF). If any provision of this Agreement is found by an arbitrator or court of competent jurisdiction to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. This document constitutes the entire legal framework between the parties. Any failure by The Bradford to enforce a specific clause does not constitute a waiver of its right to enforce that clause in the future. All legal notices must be sent via certified mail to: The Bradford Headquarters, Legal Dept, 1234 Collins Ave, Miami Beach, FL 33139."
    },
{
        ref: "ARTICLE XII",
        title: "INTELLECTUAL PROPERTY, TRADEMARKS & DIGITAL ASSETS",
        content: "All content included on this interface, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the exclusive property of The Bradford Group or its content suppliers and is protected by United States and international copyright, trademark, and patent laws. The compilation of all content on this site is the exclusive property of The Group. Any unauthorized use, including but not limited to the reproduction, distribution, display, or transmission of the content of this site is strictly prohibited. The 'Bradford' name, the lion/crest logo, and the 'Bradford Encrypted System' are federally registered trademarks. Any 'cloning' of this interface or unauthorized use of our branding for promotional events not sanctioned by the Group will be met with immediate injunctive relief and statutory damages of up to $150,000 per infringement under the Digital Millennium Copyright Act (DMCA)."
    },
    {
        ref: "ARTICLE XIII",
        title: "CYBER-SECURITY, DATA BREACH & LIMITATION OF ELECTRONIC LIABILITY",
        content: "While the 'Bradford Encrypted System' employs military-grade AES-256 encryption, The Guest acknowledges that no electronic transmission or digital storage is 100% secure. In the event of a sophisticated cyber-attack or data breach, The Bradford’s liability is strictly limited to the notification requirements set forth by the Florida Information Protection Act (FIPA) and California’s CCPA. The Group shall not be liable for any indirect, incidental, or consequential damages resulting from a third-party breach of our secure servers. The Guest is responsible for maintaining the confidentiality of any account credentials used to access the Bradford portal and agrees to accept responsibility for all activities that occur under their credentials."
    },
    {
        ref: "ARTICLE XIV",
        title: "DRONE POLICY & AERIAL SURVEILLANCE RESTRICTIONS",
        content: "To protect the privacy of our high-profile clientele and ensure the safety of our airspace, the operation of Unmanned Aircraft Systems (Drones) over or near any Bradford property is strictly prohibited without a valid FAA Part 107 waiver and written consent from our Shadow Unit. Any unauthorized drone will be treated as a security threat. The Group reserves the right to utilize signal jamming technology or other legal defensive measures to neutralize unauthorized aerial surveillance. Any footage captured via unauthorized drones is the immediate property of The Bradford, and the operator will be liable for privacy invasion damages."
    },
    {
        ref: "ARTICLE XV",
        title: "SUBSTANCE ABUSE, NARCOTICS & CHEMICAL TESTING POLICY",
        content: "The Bradford maintains a drug-free environment in accordance with the Federal Controlled Substances Act. The Guest agrees that the use, possession, or distribution of illegal narcotics, including synthetic substances and non-prescribed pharmaceuticals, is strictly prohibited. The Shadow Unit reserves the right to conduct non-invasive chemical trace detection on any bags or surfaces within a VIP area. Any guest found in violation will be immediately turned over to local authorities. Furthermore, the use of 'vaping' devices is restricted to designated outdoor lounges only; any interference with fire suppression systems or smoke detectors is a felony and will be prosecuted accordingly."
    },
    {
        ref: "ARTICLE XVI",
        title: "ANTI-MONEY LAUNDERING (AML) & KYC COMPLIANCE",
        content: "As a global entity handling high-value transactions, The Bradford complies with the Bank Secrecy Act and Anti-Money Laundering (AML) regulations. For any transaction exceeding $10,000 USD (or equivalent in cryptocurrency), The Guest may be required to undergo a 'Know Your Customer' (KYC) verification, including providing proof of funds and additional government documentation. The Group reserves the right to report suspicious financial activity to the Financial Crimes Enforcement Network (FinCEN). We do not accept 'smurfing' or structured payments designed to evade federal reporting requirements."
    },
    {
        ref: "ARTICLE XVII",
        title: "DRESS CODE & AESTHETIC STANDARDS ENFORCEMENT",
        content: "The Bradford enforces a 'Strict Luxury' dress code. The definition of 'appropriate attire' is at the sole and subjective discretion of the Front-of-House Management. Prohibited items include, but are not limited to: athletic wear, tank tops, distressed denim, flip-flops, and branded headwear. Any Guest who is denied entry based on aesthetic non-compliance is not entitled to a refund of their table deposit. The Group maintains that the atmosphere of the venue is a core component of the service provided, and dress code enforcement is a necessary tool for brand integrity."
    },
    {
        ref: "ARTICLE XVIII",
        title: "THIRD-PARTY PROMOTERS & UNAUTHORIZED TICKET SALES",
        content: "The Bradford does not recognize tickets or table reservations purchased through unauthorized third-party secondary markets (e.g., Craigslist, unofficial Telegram bots, or scalpers). Only reservations made through bradfordnightclub.com or via an official @bradfordnightclub.com email address are valid. Any guest presenting a fraudulent or resold reservation will be denied entry without compensation. We reserve the right to cancel, without refund, any reservation that we suspect has been resold for profit."
    },
    {
        ref: "ARTICLE XIX",
        title: "HEALTH, SAFETY & INFECTIOUS DISEASE WAIVER",
        content: "By attending The Bradford, The Guest acknowledges the contagious nature of various infectious diseases (including but not limited to COVID-19 and its variants). Despite our high standards of sanitation, The Group cannot guarantee that you will not become infected. You voluntarily assume the risk of exposure and agree to hold The Bradford harmless from any claims related to illness or medical expenses incurred following your visit. Guests must comply with all posted health protocols and temperature checks if mandated by local health authorities."
    },
    {
        ref: "ARTICLE XX",
        title: "RIGHT TO SEARCH & SEIZURE OF PROHIBITED ITEMS",
        content: "The Shadow Unit reserves the right to search all persons, clothing, bags, and vehicles on or entering the premises. Prohibited items include: weapons of any kind, professional recording equipment, outside food/beverage, and hazardous chemicals. Any seized items may be discarded or held for law enforcement. Refusal to submit to a search will result in immediate denial of entry or ejection from the venue."
    },
    {
        ref: "ARTICLE XXI",
        title: "NON-DISPARAGEMENT & REPUTATIONAL INTEGRITY",
        content: "The Guest agrees not to make any public statements, online reviews, or social media posts that are knowingly false, defamatory, or intended to cause malicious harm to the reputation of The Bradford Group. While we value honest feedback, the systematic 'review bombing' or organized smear campaigns orchestrated by competitors or disgruntled former guests will be met with litigation for tortious interference with business relations."
    },
    {
        ref: "ARTICLE XXII",
        title: "ENTIRE AGREEMENT & AMENDMENTS",
        content: "This Agreement constitutes the entire and sole agreement between The Guest and The Bradford regarding the subject matter herein. The Bradford reserves the right to amend these terms at any time by posting the updated version on our website. Continued use of our services after such changes constitutes your acceptance of the new terms. No waiver by The Group of any term or condition set forth in this Agreement shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition."
    }
];


    APP_CONTENT.innerHTML = `
        <div class="legal-container fade-in">
            <div class="legal-header">
                <h1 class="legal-title">LEGAL & PRIVACY POLICIES</h1>
                <p class="legal-date">LAST UPDATED: FEBRUARY 2026</p>
                <div class="legal-line"></div>
            </div>

            <div class="legal-scroll-area">
                ${legalSections.map(section => `
                    <section class="legal-section">
                        <span class="legal-ref">${section.ref}</span>
                        <h2 class="legal-sub">${section.title}</h2>
                        <p class="legal-text">${section.content}</p>
                    </section>
                `).join('')}
                
                <div class="legal-full-disclosure">
                    <h3>OFFICIAL DISCLOSURE</h3>
                    <p>The Bradford Headquarters - 1234 Collins Ave, Miami Beach, FL 33139. All rights reserved. The term "Member" refers to individuals approved by the internal committee and does not imply ownership or voting rights within the corporation.</p>
                </div>
            </div>

            <div class="legal-footer">
                <button class="btn-print-minimal" onclick="window.print()">
                    DOWNLOAD PDF VERSION
                </button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function renderPressPage() {
    if (!APP_CONTENT) return;

    const pressSections = [
    {
        ref: "PROTOCOL I",
        title: "STRATEGIC MEDIA ACCREDITATION, GLOBAL CREDENTIALING STANDARDS & ACCESS HIERARCHY",
        content: "Access to the Bradford Group’s global ecosystem—including our flagship venues in Miami, NYC, Los Angeles, and the upcoming Las Vegas hub—is governed by a sovereign selection mandate administered by the Global Communications Bureau. Media professionals, encompassing traditional Tier-1 journalism, international broadcast syndicates, and ultra-high-tier digital architects, must undergo a rigorous vetting process. All accreditation petitions must be formally lodged via media@bradfordnightclub.com no later than twenty-one (21) business days prior to any requested deployment. We strictly prohibit 'guerrilla journalism', unvetted freelance coverage, or unauthorized walk-in media attempts. Credentials, once issued, are strictly site-specific, non-transferable, and subject to instantaneous revocation by the Chief Communications Officer (CCO) for any perceived breach of decorum. Furthermore, an approved media credential does not grant entry to 'Sanctum' zones, VVIP enclaves, or Shadow Unit operational sectors, which remain under a permanent, non-negotiable media blackout to ensure the total anonymity of our global elite clientele."
    },
    {
        ref: "PROTOCOL II",
        title: "CORPORATE IDENTITY, VISUAL INTEGRITY STATUTES & TRADEMARK ENFORCEMENT",
        content: "The Bradford crest, the proprietary 'Encrypted' typography, and all associated brand signatures are protected as federally registered intellectual property under the USPTO and international WIPO treaties. Any utilization of these assets for print, digital, cinematic, or broadcast distribution is strictly subject to a restrictive Brand Licensing Agreement (BLA). Media partners are categorically forbidden from modifying, distorting, or recoloring hex codes (Bradford Gold #D4AF37 / Obsidian #050505). The Group reserves the unilateral right to audit any digital or physical environment in which our trademarks appear to prevent brand dilution or unauthorized association with mass-market entities. High-resolution style guides, raw vectors, and 8K cinematic B-roll assets are sequestered in our secure servers and only released upon the execution of a notarized Brand Integrity Agreement (BIA) and a verified proof of intended use."
    },
    {
        ref: "PROTOCOL III",
        title: "MANDATORY EDITORIAL VETTING, FORENSIC FACT-CHECKING & PRE-PUBLICATION CLEARANCE",
        content: "To uphold the 'Global Excellence' benchmark, The Bradford Group enforces a mandatory pre-publication review for any editorial piece, broadcast segment, or visual essay featuring our properties, executive staff, or internal economic data. This protocol is not designed to impede editorial independence but to ensure absolute forensic accuracy regarding our inventory valuations (e.g., the historical verification of the Macallan 1926 Fine & Rare) and our sophisticated security architecture. Media outlets must submit final drafts or 'locked' edits to the Communications Bureau for factual verification 48 hours prior to public distribution. Any entity found disseminating speculative financial data, unauthorized guest list leaks, or 'paparazzi-style' candid content will face immediate permanent de-listing from the Global Media Pool, immediate revocation of all existing licenses, and potential litigation for tortious interference with business relations and breach of confidentiality."
    },
    {
        ref: "PROTOCOL IV",
        title: "VVIP PRIVACY SHIELD, ANTI-PAPARAZZI MANDATE & SURVEILLANCE NEUTRALIZATION",
        content: "The Bradford is a sovereign sanctuary. We maintain a 'Zero-Visibility' policy for all celebrity and high-profile guests. Media representatives caught utilizing long-range telephoto lenses, infrared capture technology, parabolic microphones, or unauthorized drone-based aerial surveillance directed at our patrons or premises will be intercepted by the Shadow Unit. Under the 'Sanctuary Protocol', all captured media will be seized as forensic evidence for privacy violation lawsuits and trespass charges. Any media partner that publishes 'candid', intrusive, or non-consensual imagery of a Guest within our security perimeter—regardless of the source—will have their corporate credentials permanently terminated across all global hubs. The Bradford Group maintains an active litigation fund specifically dedicated to the prosecution of unauthorized media intrusion to protect the peace and privacy of our Members."
    },
    {
        ref: "PROTOCOL V",
        title: "GLOBAL INFLUENCER SYNDICATION, AESTHETIC ALIGNMENT & PERFORMANCE AUDITS",
        content: "The Bradford does not engage in mass-market influencer marketing. We partner exclusively with digital architects whose aesthetic footprint, audience demographics, and personal brand equity align with the Group’s ultra-luxury ethos. Influencer access is managed through a 'Performance & Discretion Contract' (PDC) which outlines strictly defined deliverables, ironclad Non-Disclosure Agreements (NDA), and behavioral expectations. We categorically reject 'comp-for-post' solicitations from unverified or low-engagement accounts. Prospective partners must submit an audited media kit, verified 12-month audience analytics (specifically targeting the 0.1% wealth bracket), and three professional references from Tier-1 luxury hospitality or high-jewelry sectors. Failure to meet the PDC deliverables or any public conduct deemed detrimental to the Bradford brand will result in immediate termination of the partnership and potential clawback of provided services."
    },
    {
        ref: "PROTOCOL VI",
        title: "CINEMATIC PRODUCTIONS, COMMERCIAL SITE LEASING & SECURE PRODUCTION LOGISTICS",
        content: "The utilization of Bradford architecture for feature-length films, high-budget music videos, or global commercial campaigns is governed by a formal 'Venue Master Lease' and Production Rider. Production companies must provide a comprehensive storyboard for Board review, a security bond of no less than $500,000.00 USD, and a certificate of liability insurance with a minimum coverage of $10,000,000.00 USD per occurrence. All filming must be conducted during 'Closed-Set' hours under the continuous supervision of a Bradford Site Liaison and Shadow Unit liaison. We reserve the right of 'Final Aesthetic Approval' for any scene where the Bradford brand, staff, or logos are visible, ensuring the portrayal remains consistent with our prestige global positioning. Unauthorized use of the venue’s likeness in any cinematic medium will be met with immediate cease-and-desist orders and copyright infringement litigation."
    },
    {
        ref: "PROTOCOL VII",
        title: "RED CARPET MANAGEMENT, SPECIAL EVENTS & TALENT LOGISTICS",
        content: "During high-profile events, artist residencies, or global launches, The Bradford operates a 'Controlled Media Line'. Photographers and videographers assigned to the press line must adhere to strict positioning and lighting requirements to maintain visual consistency. Individual interviews (junkets) with resident artists or executive leadership must be pre-arranged and are limited to three (3) vetted questions. Media personnel are prohibited from breaking the line or approaching guests outside of the designated press zone. Breach of this protocol results in immediate expulsion and forfeiture of equipment until the event’s conclusion to prevent unauthorized data transmission."
    },
    {
        ref: "PROTOCOL VIII",
        title: "CRISIS COMMUNICATIONS BUREAU & EMERGENCY REPUTATIONAL MANAGEMENT",
        content: "In the event of an operational anomaly, security incident, or force majeure, all media inquiries must be channeled through the 'Rapid Response PR' desk. No staff member, including C-suite executives, is authorized to provide 'on-the-record' statements, 'off-the-record' background, or deep-background commentary without a signed directive from the Bradford Legal Department. Unauthorized statements are considered a fundamental breach of employment and non-disclosure contracts. The Bradford Group maintains a 24/7 litigation-ready posture against any outlet publishing defamatory, libelous, or 'click-bait' headlines intended to damage our brand equity or stock valuation. We utilize global monitoring tools to detect and neutralize misinformation in real-time."
    },
    {
        ref: "PROTOCOL IX",
        title: "DIGITAL ASSET PROTECTION, STEGANOGRAPHY & BLOCKCHAIN MEDIA TRACKING",
        content: "To combat digital piracy, unauthorized 're-posting', and the AI-generated manipulation of our signature event footage, The Bradford utilizes advanced steganographic watermarking and blockchain-recorded metadata for all press assets. All officially released videos and images are digitally signed and tracked globally. Any unauthorized commercial use, AI-training utilization, or social media re-distribution of Bradford-owned content detected by our automated crawlers will trigger an immediate DMCA takedown notice and an invoice for 'Unauthorized Commercial Licensing' starting at a minimum of $25,000.00 USD per asset, per day of use. We do not negotiate on intellectual property theft."
    },
    {
        ref: "PROTOCOL X",
        title: "INTERNATIONAL JURISDICTION & COMMUNICATIONS GOVERNANCE",
        content: "All media relations and communications protocols are governed by the laws of the State of Florida for global headquarters operations, with local jurisdiction applied in New York, California, and Nevada for regional specificities. By accepting Bradford credentials, media organizations irrevocably consent to the jurisdiction of the courts in Miami-Dade County for any disputes arising from brand use or privacy breaches. These protocols are subject to change without notice to reflect evolving global security standards and digital rights management technologies. All formal legal notices regarding media must be served via certified mail to the Bradford Legal Bureau, Attn: Communications Division."
    }
];


    APP_CONTENT.innerHTML = `
        <div class="legal-container fade-in">
            <div class="legal-header">
                <h1 class="legal-title">PRESS & MEDIA RELATIONS</h1>
                <p class="legal-date">GLOBAL COMMUNICATIONS BUREAU</p>
                <div class="legal-line"></div>
            </div>

            <div class="legal-scroll-area">
                ${pressSections.map(section => `
                    <section class="legal-section">
                        <span class="legal-ref">${section.ref}</span>
                        <h2 class="legal-sub">${section.title}</h2>
                        <p class="legal-text">${section.content}</p>
                    </section>
                `).join('')}
                
                <div class="press-contact-grid">
                    <div class="press-card">
                        <h3>GLOBAL INQUIRIES</h3>
                        <p>media@bradfordnightclub.com</p>
                    </div>
                    <div class="press-card">
                        <h3>URGENT PRESS</h3>
                        <p>+1 305-VIP-BRAD (Ext. Media)</p>
                    </div>
                </div>

                <div class="legal-full-disclosure">
                    <p>The Bradford Media Relations department operates 24/7 across Miami, New York, and London time zones to support international news cycles.</p>
                </div>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}


function renderLocationPage() {
    const locations = [
        { city: "MIAMI", country: "🇺🇸", address: "1234 Collins Avenue", area: "Miami Beach, FL 33139", hours: "THU–SUN | 00:00 – 06:00", status: "FLAGSHIP" },
        { city: "LOS ANGELES", country: "🇺🇸", address: "850 Sunset Boulevard", area: "Beverly Hills, CA 90210", hours: "THU–SUN | 00:00 – 06:00", status: "ELITE" },
        { city: "NEW YORK", country: "🇺🇸", address: "25 Park Avenue", area: "Manhattan, NY 10016", hours: "THU–SUN | 00:00 – 06:00", status: "URBAN LUXE" },
        { city: "SAN FRANCISCO", country: "🇺🇸", address: "555 Lombard Street", area: "California 94133", hours: "THU–SUN | 00:00 – 06:00", status: "TECH ELITE" }
    ];

    APP_CONTENT.innerHTML = `
        <div class="location-container fade-in">
            <header class="location-header">
                <h1 class="title-page">GLOBAL LOCATIONS</h1>
                <p class="subtitle-page">LES CAPITALES DU LUXE, NOTRE MAISON.</p>
                <div class="gold-separator"></div>
            </header>

            <div class="location-grid">
                ${locations.map(loc => `
                    <div class="location-card">
                        <div class="card-status">${loc.status}</div>
                        <h2 class="card-city">${loc.city} ${loc.country}</h2>
                        <div class="card-details">
                            <p class="card-address">${loc.address}</p>
                            <p class="card-area">${loc.area}</p>
                            <div class="card-divider"></div>
                            <p class="card-hours">${loc.hours}</p>
                        </div>
                        <button class="card-btn" onclick="window.open('https://maps.google.com/?q=${loc.address} ${loc.city}')">GET DIRECTIONS</button>
                    </div>
                `).join('')}
            </div>

            <footer class="location-footer">
                <p>PRIVATE EVENTS & WORLDWIDE INQUIRIES: +1-305-VIP-BRAD</p>
            </footer>
        </div>
    `;
    window.scrollTo(0, 0);
}

function renderEntryPolicy() {
    const protocols = [
        {
            id: "01",
            title: "VERIFICATION BIOMÉTRIQUE & AGE",
            desc: "L'accès est un privilège, non un droit. Identification gouvernementale physique (Passeport/ID) obligatoire. Aucune copie numérique acceptée.",
            details: ["Âge minimum : 21 ans révolus", "Vérification d'authenticité systématique", "Scan de sécurité biométrique"]
        },
        {
            id: "02",
            title: "SÉCURITÉ INFLEXIBLE",
            desc: "Un sanctuaire sans stress nécessite une surveillance absolue. Nos protocoles de fouille surpassent les standards aéroportuaires.",
            details: ["Fouille électronique et manuelle", "Politique zéro stupéfiant", "Protection des VVIP garantie"]
        },
        {
            id: "03",
            title: "DISCRÉTION MANAGÉRIALE",
            desc: "Nos 'Door Selectors' sont les gardiens de l'atmosphère. Le refus d'entrée est à leur discrétion totale, sans justification requise.",
            details: ["Comportement impeccable exigé", "Contrôle d'ébriété pré-entrée", "Alignement esthétique requis"]
        }
    ];

    APP_CONTENT.innerHTML = `
        <div class="policy-page">
            <div class="hero-section reveal">
                <div class="hero-line"></div>
                <h1 class="title-page">ENTRY PROTOCOL</h1>
                <p class="subtitle-page">UN PROCESSUS D'ADMISSION CONÇU POUR L'ÉLITE</p>
            </div>

            <div class="protocol-grid">
                ${protocols.map(p => `
                    <div class="protocol-box reveal">
                        <span class="protocol-number">${p.id}</span>
                        <h2 class="protocol-heading">${p.title}</h2>
                        <p class="protocol-text">${p.desc}</p>
                        <ul class="protocol-list">
                            ${p.details.map(d => `<li><span class="gold-dot"></span> ${d}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>

            <div class="entry-disclaimer reveal">
                <div class="disclaimer-content">
                    <h3>DROIT DE REFUS ABSOLU</h3>
                    <p>Le Bradford se réserve le droit d'interdire l'accès à toute personne ne reflétant pas les valeurs de prestige et de respect portées par l'établissement. Une réservation de table ne garantit pas l'admission automatique.</p>
                </div>
            </div>

            <div class="action-footer reveal">
              <button class="btn-primary" onclick="renderDressCodePage()">CONSULTER LE DRESS CODE</button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);

    // --- BLOC ANIMATION SCROLL ---
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.3 }); 

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
}

function renderVIPPolicy() {
   
    APP_CONTENT.innerHTML = '';

    const vipHTML = `
        <div class="vip-page">
            <header class="vip-hero reveal"> <h1 class="title-page">PRESTIGE VIP POLICY</h1>
                <p class="subtitle-page">LE SOMMET DE L'HOSPITALITÉ EXCLUSIVE</p>
            </header>

            <div class="vip-grid">
                <div class="vip-card highlight reveal"> <div class="card-inner">
                        <div class="vip-tag">GUARANTEE</div>
                        <h2 class="card-title">RÉSERVATION & DÉPÔT</h2>
                        <p class="card-desc">Accès direct à une soirée personnalisée. Votre table est un sanctuaire réservé.</p>
                        <div class="vip-price-box">
                            <span class="currency">$</span><span class="amount">200</span>
                            <span class="price-label">DÉPÔT NON-REMBOURSABLE*</span>
                        </div>
                        <ul class="vip-perks">
                            <li><span class="gold-line"></span> Appliqué au Minimum Spend</li>
                            <li><span class="gold-line"></span> Confirmation SMS à H-24</li>
                        </ul>
                    </div>
                </div>

             <div class="card-inner reveal"> <div class="vip-tag">DYNAMIC</div>
    <h2 class="card-title">MINIMUM SPEND</h2>
    
      <div class="spend-levels">
        <div class="level-item active">
            <span class="level-label">VIP MAIN FLOOR</span>
            <div class="level-bar"><div class="level-fill" style="width: 65%;"></div></div>
        </div>
        <div class="level-item active">
            <span class="level-label">VIP DANCEFLOOR</span>
            <div class="level-bar"><div class="level-fill" style="width: 85%;"></div></div>
        </div>
    </div>

    <p class="card-desc" style="margin-top: 20px;">
        Engagement d'achat exclusif de bouteilles, calculé selon l'affluence et le prestige de la soirée.
    </p>
    
    <p class="card-desc" style="margin-top: 10px; font-size: 0.65rem; color: #555;">
        * Hors taxes et 20% de frais de service standard.
    </p>
    
    
    <div class="vip-alert">
        <span class="alert-dot"></span> RETARD MAX : 30 MINUTES
    </div>
</div>


            <div class="cancellation-banner reveal"> <div class="banner-content">
                    <h3>POLITIQUE D'ANNULATION</h3>
                    <p>Notification requise 48H avant pour transfert de crédit. Le "No-Show" est un acte définitif.</p>
                </div>
                <div class="banner-footer">BRADFORD ELITE PROTOCOL</div>
            </div>

            <div class="vip-actions reveal"> <button class="btn-primary" onclick="window.scrollTo(0,0); navigate('reservations')">RESERVER UNE TABLE</button>

            </div>
        </div>
    `;
    
    APP_CONTENT.innerHTML = vipHTML;
    window.scrollTo(0, 0);

    // --- BLOC ANIMATION SCROLL ---
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 }); 

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
}


function renderBottleRequirements() {
    
    APP_CONTENT.innerHTML = '';

    const bottleHTML = `
        <div class="bottle-page">
            <header class="bottle-hero reveal"> <h1 class="title-page">BOTTLE SERVICE EXIGENCY</h1>
                <p class="subtitle-page">L'ESSENCE MÊME DE L'EXPÉRIENCE BRADFORD</p>
            </header>

            <section class="ratio-section reveal"> <div class="ratio-display">
                    <div class="ratio-box">
                        <span class="ratio-num">1</span>
                        <span class="ratio-label">BOTTLE</span>
                    </div>
                    <div class="ratio-divider">:</div>
                    <div class="ratio-box">
                        <span class="ratio-num">4</span>
                        <span class="ratio-label">GUESTS</span>
                    </div>
                </div>
                <p class="ratio-disclaimer">Ratio impératif pour garantir l'excellence du service à votre table.</p>
            </section>

            <div class="requirements-container">
                <div class="req-block reveal"> <h2 class="luxury-main-title">PROTOCOLE DE SERVICE</h2>
                    
                    <div class="service-cards">
                        <div class="s-card">
                            <span class="s-value">20%</span>
                            <span class="s-label">SERVICE CHARGE</span>
                            <p class="s-details">Appliqué sur la facture finale pour l'excellence du staff.</p>
                        </div>
                        <div class="s-card">
                            <span class="s-value">∞</span>
                            <span class="s-label">ACCOMPAGNEMENTS</span>
                            <p class="s-details">Softs et garnitures premium à discrétion toute la nuit.</p>
                        </div>
                    </div>
                </div>

                <div class="prestige-gallery reveal"> <h2 class="luxury-main-title">PRESTIGE & SÉLECTION</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item">
                            <div class="top-line"></div>
                            <h3>RARE SPIRITS</h3>
                            <p>Curated list de spiritueux rares et millésimes exclusifs.</p>
                        </div>
                        <div class="gallery-item">
                            <div class="top-line"></div>
                            <h3>SECURE TABLE</h3>
                            <p>Protection de table et gestion sécurisée par nos agents dédiés.</p>
                        </div>
                        <div class="gallery-item">
                            <div class="top-line"></div>
                            <h3>DEDICATED HOST</h3>
                            <p>Host personnel pour une personnalisation totale de vos Add-Ons.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="minimum-disclaimero reveal"> <div class="disclaimero-line"></div>
                <div class="disclaimero-content">
                    <span class="disclaimero-tag">ENGAGEMENT</span>
                    <p>Les minimums de table doivent être atteints via vos achats de <strong>Bouteilles</strong> ou de <strong>Services Additionnels (Add-ons)</strong>.</p>
                </div>
                <div class="disclaimero-line"></div>
            </div>

            <div class="bottle-footer reveal"> <button class="btn-primary" onclick="window.scrollTo(0,0); navigate('menu')">DÉCOUVRIR LA CARTE</button>
            </div>
        </div>
    `;

    APP_CONTENT.innerHTML = bottleHTML;
    window.scrollTo(0, 0);

    // --- BLOC ANIMATION SCROLL ---
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
}



window.addEventListener('scroll', function() {
    const bar = document.querySelector('.floating-prestige-bar');
    if (!bar) return;

    let scrollY = window.scrollY;
    
    // 1. Ton décalage souhaité au repos (en pixels)
    let maxOffset = -28; 
    
    // 2. On réduit ce décalage sur les 100 premiers pixels de scroll
    // Plus tu scrolles, plus "currentOffset" se rapproche de 0
    let currentOffset = Math.min(0, maxOffset + (scrollY * 0.28)); 

    // 3. On applique le décalage dynamiquement
    bar.style.marginTop = currentOffset + 'px';
});


function renderHouseRules() {
    APP_CONTENT.innerHTML = '';

    const rulesHTML = `
        <div class="rules-page">
            <header class="rules-hero reveal"> <div class="hero-accent"></div>
                <h1 class="title-page">HOUSE RULES</h1>
                <p class="subtitle-page">BRADFORD HOUSE RULES & ETIQUETTE</p>
            </header>

            <section class="protocol-highlight reveal"> <div class="p-accent-box">
                    <span class="p-top">PREMIUM ETIQUETTE</span>
                    <div class="p-main-val">SILENCE & ELEGANCE</div>
                    <span class="p-bottom">NOTRE SANCTUAIRE, VOS RÈGLES</span>
                </div>
                <p class="p-disclaimer">L'accès au Bradford implique une acceptation tacite de nos codes de conduite.</p>
            </section>

            <div class="rules-grid-container">
                
                <div class="rule-block main-rule reveal"> <h2 class="rule-title">01. CONDUITE & RESPECT</h2>
                    <p class="rule-text">Nous maintenons une atmosphère de sérénité absolue. Toute perturbation du service ou manque de respect envers nos collaborateurs est proscrit.</p>
                    <ul class="rule-list">
                        <li><span>COMPORTEMENT</span> <span>IRRÉPROCHABLE</span></li>
                        <li><span>HARCÈLEMENT</span> <span>TOLÉRANCE ZÉRO</span></li>
                        <li><span>EXPULSION</span> <span>IMMÉDIATE</span></li>
                    </ul>
                </div>

                <div class="rule-block reveal"> <h2 class="rule-title">02. ATMOSPHÈRE</h2>
                    <p class="rule-text">L'ambiance est notre priorité. Certains protocoles sont en place pour garantir l'immersion totale de nos invités.</p>
                    <ul class="rule-list">
                        <li><span>SMOKING / VAPE</span> <span>PROHIBÉ</span></li>
                        <li><span>VESTIAIRE</span> <span>MANDATAIRE</span></li>
                        <li><span>DÉGRADATION</span> <span>FRAIS FIXES</span></li>
                    </ul>
                </div>

                <div class="rule-block security-focus reveal"> <h2 class="rule-title">03. SÉCURITÉ & CAPACITÉ</h2>
                    <p class="rule-text">Pour votre confort, nous filtrons strictement les accès. Le respect des limites de capacité est une exigence légale et de prestige.</p>
                    <ul class="rule-list">
                        <li><span>MOBILIER</span> <span>FIXE</span></li>
                        <li><span>SÉCURITÉ</span> <span>AGENTS DÉDIÉS</span></li>
                        <li><span>ÉVACUATION</span> <span>PROCÉDURE VIP</span></li>
                    </ul>
                </div>

                <div class="rule-block privacy-focus reveal"> <h2 class="rule-title">04. DISCRÉTION</h2>
                    <p class="rule-text">La protection de l'image de nos clients est capitale. L'usage de caméras est strictement encadré au sein du sanctuaire.</p>
                    <ul class="rule-list">
                        <li><span>PHOTOS</span> <span>RESTREINTES</span></li>
                        <li><span>FLASH</span> <span>INTERDIT</span></li>
                        <li><span>ANONYMAT</span> <span>GARANTI</span></li>
                    </ul>
                </div>
            </div>

            <div class="rules-footer reveal"> <div class="footer-divider"></div>
              
                <button class="btn-primary" onclick="window.scrollTo(0,0); navigate('reservations')">RÉSERVEZ VOTRE TABLE</button>
            </div>
        </div>
    `;

    APP_CONTENT.innerHTML = rulesHTML;
    window.scrollTo(0, 0);

    // --- BLOC ANIMATION SCROLL ---
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
}



function renderAboutBradford() {
    APP_CONTENT.innerHTML = '';

    const aboutHTML = `
        <div class="about-page fade-in">
            <header class="about-hero">
                <div class="hero-overlay"></div>
                <div class="hero-content">
                  
                    <h1 class="title-page">ABOUT BRADFORD</h1>
                    <p class="subtitle-page">UNE MARQUE MONDIALE, SYNONYME DE NIGHTLIFE DE PRESTIGE.</p>
                </div>
            </header>

            <section class="story-section">
                <div class="story-container">
                    <div class="story-text-wrapper">
                        <h2 class="section-gold-title">Notre Vision de l'Exclusivité</h2>
                        <p class="story-paragraph">
                               <span class="drop-cap">F</span>ondé il y a près de huit ans, Bradford Night Club s'est imposé comme une référence mondiale du nightlife ultra-luxueux. Présent dans quatre villes emblématiques: Miami, Los Angeles, New York et San Francisco, chaque établissement allie design exclusif, ambiance raffinée et service sur-mesure pour une clientèle exigeante.
                        </p>

                        <p class="story-paragraph">
                            Bradford n'est pas seulement un lieu pour danser ou écouter les meilleurs DJs internationaux : c'est un univers dédié à l'excellence du divertissement, où chaque détail, du mobilier aux cocktails signatures, est pensé pour offrir une expérience immersive unique. Les espaces VIP, les tables de prestige et le service bouteille garantissent que chaque soirée se transforme en événement mémorable parfaitement orchestré par un personnel formé à anticiper chaque désir.
                        </p>

                        <p class="story-paragraph">
                            Le fondateur passionné par le lifestyle et les expériences haut de gamme a personnellement investi dans une vision où luxe et discrétion se rencontrent. Chaque Club Bradford reflète cette philosophie par des intérieurs élégants, des technologies de pointe, et une carte de boisson et de cocktail parmi les plus prestigieuses au monde, allant des champagnes rares aux spiritueux en éditions limitées, ainsi que des créations signatures exclusivement conçues pour nos invités VIP.
                        </p>

                        <p class="story-paragraph">
                            Ouvert quatre soirs par semaine, de jeudi à dimanche, de minuit à 6h, Bradford attire une moyenne de 5500 invités par soirée dont un segment VIP de 800 personnes bénéficiant d'un service entièrement personnalisé. Que vous découvriez Bradford pour la première fois ou que vous soyez un habitué, chaque visite est une immersion dans un univers où luxe, élégance et sophistication se rencontrent.
                        </p>
                    </div>

                    <div class="about-highlights">
                        <div class="highlight-item">
                            <span class="h-icon">✦</span>
                            <p>Fondé sur le concept du service bouteille exclusif.</p>
                        </div>
                        <div class="highlight-item">
                            <span class="h-icon">✦</span>
                            <p>Présence mondiale dans quatre métropoles du luxe.</p>
                        </div>
                        <div class="highlight-item">
                            <span class="h-icon">✦</span>
                            <p>Design intérieur primé pour son opulence.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="stats-grid">
                <div class="stat-card">
                    <span class="stat-num">04</span>
                    <span class="stat-label">CITIES</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num">5500</span>
                    <span class="stat-label">GUESTS / NIGHT</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num">800</span>
                    <span class="stat-label">VIP SEGMENT</span>
                </div>
                <div class="stat-card">
                    <span class="stat-num">08</span>
                    <span class="stat-label">YEARS OF EXCELLENCE</span>
                </div>
            </section>


           <section class="hours-display-section">
                <div class="hours-wrapper">
                    <div class="hours-header">
                        <div class="line"></div>
                        <h2 class="hours-title">OPENING HOURS</h2>
                        <div class="line"></div>
                    </div>
                    
                    <div class="hours-card">
                        <span class="day-range">THU — SUN</span>
                        <div class="time-slot">
                            <span class="time-digit">00:00</span>
                            <span class="time-to">TO</span>
                            <span class="time-digit">06:00</span>
                        </div>
                     
                    
                    <div class="hours-status">
                        <span class="status-dot"></span>
                        <span class="status-text">ADMISSION BY RESERVATION ONLY</span>
                    </div>
                </div>
            </section>

            <footer class="about-footer">
                <p>CHAQUE VISITE EST UNE IMMERSION DANS UN UNIVERS OÙ L'ÉLÉGANCE ET LA SOPHISTICATION SE RENCONTRENT.</p>
                   <button class="btn-primary" onclick="window.scrollTo(0,0); navigate('reservations')">
                    REJOINDRE L'EXPÉRIENCE
                </button>
            </footer>
        </div>
    `;

    APP_CONTENT.innerHTML = aboutHTML;
    window.scrollTo(0, 0);
}

function renderGuestGuidelines() {
    APP_CONTENT.innerHTML = `
        <div class="luxury-container fade-in">
            <h1 class="title-page reveal">EXCLUSIVE GUEST GUIDELINES</h1>
            <p class="subtitle-page reveal">LE PACTE D'EXCELLENCE DE NOTRE ÉLITE CLIENTÈLE</p>

            <div class="bento-protocol-body">
                
                <div class="p-card reveal">
                    <div class="p-card-accent"></div>
                    <div class="p-card-header">
                        <span class="p-tag">PROTOCOL I</span>
                        <h2 class="p-title">DISCRÉTION & SOPHISTICATION</h2>
                    </div>
                    <p class="p-main-text">
                        Le succès du Bradford repose sur l'invisibilité du service et la retenue de ses hôtes. Le luxe est un murmure, pas un cri.
                    </p>
                    <div class="p-sub-grid">
                        <div class="p-sub-item">
                            <span class="p-sub-label">ACOUSTIQUE</span>
                            <p>Discussions maintenues à un volume feutré pour préserver l'intimité des tables adjacentes.</p>
                        </div>
                        <div class="p-sub-item">
                            <span class="p-sub-label">FLUIDITÉ</span>
                            <p>Circulation limitée au strict nécessaire pour garantir une immersion totale.</p>
                        </div>
                    </div>
                    <div class="p-highlight-box">
                        <span class="p-highlight-icon">◈</span>
                        <p>Votre Host dédié est votre unique point de contact pour toute assistance discrète.</p>
                    </div>
                </div>

                <div class="p-card alt reveal">
                    <div class="p-card-accent"></div>
                    <div class="p-card-header">
                        <span class="p-tag">PROTOCOL II</span>
                        <h2 class="p-title">UTILISATION DES MÉDIAS</h2>
                    </div>
                    <p class="p-main-text">
                        Nous protégeons l'anonymat de notre cercle. Votre image est libre, celle des autres est sacrée.
                    </p>
                    <div class="p-media-warning">
                        <div class="w-top">
                            <span class="w-label">STRICT NO-FLASH POLICY</span>
                            <span class="w-status">ACTIVE</span>
                        </div>
                        <p>L'usage du flash est proscrit dans l'ensemble des zones VIP et tables de service.</p>
                    </div>
                    <ul class="p-feature-list">
                        <li><span class="p-check"></span> Branding Bradford : Valorisation positive uniquement</li>
                        <li><span class="p-check"></span> Capture d'autrui : Interdiction absolue sans consentement</li>
                        <li><span class="p-check"></span> Live Streaming : Soumis à autorisation managériale</li>
                    </ul>
                </div>

                <div class="p-card reveal full-width">
                    <div class="p-card-header center">
                        <span class="p-tag">ENGAGEMENT</span>
                        <h2 class="p-title">DROIT DE SÉJOUR</h2>
                    </div>
                    <p class="p-centered-text">
                        Le Bradford se réserve le droit d'interrompre l'expérience de tout invité dont la conduite ne reflète pas l'exigence de l'établissement.
                    </p>
                </div>

            </div>

            <div class="p-footer-action reveal">
                <button class="btn-primary" onclick="window.scrollTo(0,0); navigate('reservations')">RÉSERVER UNE TABLE</button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function renderPressMentions() {
    APP_CONTENT.innerHTML = '';

    const pressHTML = `
        <div class="press-page fadeIn">
            <header class="press-hero">
                <h1 class="title-page">GLOBAL ACCLAIM</h1>
                <p class="subtitle-page">LA RECONNAISSANCE MONDIALE DE LA MARQUE BRADFORD</p>
            </header>

            <section class="quotes-sanctuary">
                            <div class="quote-card reveal">
                    <span class="quote-source">THE NEW YORK TIMES</span>
                    <blockquote class="quote-content">"Au-delà des listes d'invités, le Bradford s'est imposé comme l'épicentre des cercles de pouvoir à Manhattan."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">FORBES BUSINESS</span>
                    <blockquote class="quote-content">"Le Bradford n'est pas une simple boîte de nuit ; c'est un modèle économique de rareté qui redéfinit la valeur de l'exclusivité."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">LOS ANGELES TIMES</span>
                    <blockquote class="quote-content">"Une gestion de la confidentialité qui frise la paranoïa, faisant du club le refuge privilégié de l'industrie."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">WALL STREET JOURNAL</span>
                    <blockquote class="quote-content">"Une forteresse de discrétion où les politiques d'admission strictes assurent un environnement de networking sans précédent."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">LAS VEGAS WEEKLY</span>
                    <blockquote class="quote-content">"L'expansion prévue pour 2027 pourrait bien forcer le Strip à repenser l'intégralité de son offre ultra-luxe."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">VOGUE US</span>
                    <blockquote class="quote-content">"Plus qu'une adresse, un manifeste visuel. Le Bradford impose une esthétique qui influence désormais le design global du luxe."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">HARPER'S BAZAAR US</span>
                    <blockquote class="quote-content">"Une curation esthétique rigoureuse où le style n'est pas une suggestion, mais une condition d'entrée."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">GQ MAGAZINE</span>
                    <blockquote class="quote-content">"L'incarnation moderne du 'Private Members Club'. Un équilibre parfait entre héritage européen et exigence américaine."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">SAN FRANCISCO CHRONICLE</span>
                    <blockquote class="quote-content">"Le seul lieu de la côte Ouest où les leaders de la Tech délaissent le virtuel pour une réalité physique protégée."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">TOWN & COUNTRY</span>
                    <blockquote class="quote-content">"Le Bradford a réussi l'impossible : importer la discrétion des clubs privés européens dans le chaos américain."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">W MAGAZINE</span>
                    <blockquote class="quote-content">"L'éclairage et l'acoustique y sont pensés comme une mise en scène cinématographique de chaque instant."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">BILLBOARD</span>
                    <blockquote class="quote-content">"Plus qu'un club, c'est le carrefour stratégique où se négocient les plus gros contrats de l'industrie musicale."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">THE TIMES (LONDON)</span>
                    <blockquote class="quote-content">"Une rigueur opérationnelle impressionnante qui justifie son rang parmi les adresses les plus fermées au monde."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">LE FIGARO LUXE</span>
                    <blockquote class="quote-content">"Une approche du service qui privilégie la pertinence et la réserve, loin de l'ostentation habituelle."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">VOGUE JAPAN</span>
                    <blockquote class="quote-content">"L'harmonie parfaite entre un minimalisme structurel et une expérience sensorielle de haut vol."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">KHALEEJ TIMES (DUBAI)</span>
                    <blockquote class="quote-content">"Le Bradford impose un standard de sélectivité qui redéfinit les attentes d'une clientèle habituée à l'exceptionnel."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">MIAMI HERALD</span>
                    <blockquote class="quote-content">"Depuis son ouverture, l'établissement a transformé le paysage économique du secteur de l'hospitalité premium."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">ELLE DECOR</span>
                    <blockquote class="quote-content">"L'architecture intérieure utilise les matériaux comme des éléments de langage à part entière."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>

                <div class="quote-card reveal">
                    <span class="quote-source">BLOOMBERG</span>
                    <blockquote class="quote-content">"Le Bradford est devenu un indicateur de la santé du marché de l'hospitalité ultra-premium. Une performance insolente."</blockquote>
                    <div class="quote-rating">★★★★★</div>
                </div>
                  

            </section>

                    <section class="press-manifesto">
                <div class="manifesto-item">
                    <div class="manifesto-header">
                        <span class="m-number">I.</span>
                        <span class="m-badge">MÉDIA & PRESTIGE</span>
                    </div>
                    <h2 class="m-title">LE CLUB LE PLUS PARLÉ AU MONDE</h2>
                    <p class="m-text">
                        <span class="dropcap">L</span>e Bradford Nightclub est régulièrement cité par les publications de luxe et de lifestyle les plus prestigieuses comme étant le sommet de l'hospitalité nocturne. Nos résidences de DJ, notre design primé et notre service Concierge définissent la référence mondiale.
                    </p>
                </div>

                <div class="manifesto-item">
                    <div class="manifesto-header">
                        <span class="m-number">II.</span>
                        <span class="m-badge">IMAGE & DROIT</span>
                    </div>
                    <h2 class="m-title">L'IMPACT DE LA MARQUE</h2>
                    <p class="m-text">
                        <span class="dropcap">N</span>ous exigeons des médias de respecter notre image de prestige. Toute couverture médiatique doit être approuvée par notre département des Relations Publiques. Notre excellence est une histoire qui doit être racontée avec le plus grand raffinement.
                    </p>
                </div>
            </section>


            <div class="press-logo-wall">
                <div class="logo-wall-header">OFFICIAL PARTNERS & MEDIA</div>
          <div class="logo-grid reveal">
    <span>FORBES</span>
    <span>VOGUE</span>
    <span>NY TIMES</span>
    <span>WSJ</span>
    <span>BLOOMBERG</span>
    <span>AD US</span>
    <span>GQ US</span>
    <span>ROLLING STONE</span>
    <span>LA TIMES</span>
    <span>ROBB REPORT</span>
    <span>VANITY FAIR</span>
    <span>HYPEBEAST</span>
    <span>BILLBOARD</span>
    <span>BAZAAR US</span>
    <span>THE TIMES</span>
    <span>LE FIGARO</span>
    <span>VOGUE JAPAN</span>
    <span>MONOCLE</span>
    <span>BBC LUXURY</span>
    <span>W MAGAZINE</span>
    <span>SF CHRONICLE</span>
    <span>MIAMI HERALD</span>
    <span>LV WEEKLY</span>
</div>

            </div>

            <footer class="press-footer">
                <button class="btn-primary" onclick="window.scrollTo(0,0); navigate('home')">RETOUR AU SANCTUAIRE</button>
                <p class="pr-contact">PR ENQUIRIES: media@bradfordnightclub.com</p>
            </footer>
        </div>
    `;

    APP_CONTENT.innerHTML = pressHTML;
    window.scrollTo(0, 0);
        // --- BLOC ANIMATION SCROLL ---
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
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
