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
            case 'bottle_service_req': renderBottleRequirements(); break;
            case 'vip_policy': renderVIPPolicy(); break;
            case 'entry_policy': renderEntryPolicy(); break;
         case 'legal': renderLegalPage(); break;
         case 'press': renderPressPage(); break;
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

      <div class="privilege-teaser-container">
    <div class="privilege-card-link" onclick="renderPrivilegePage()">
        <div class="card-glow"></div>
        <div class="card-content">
            <span class="event-tag">EXCLUSIVE EVENT</span>
            <h2 class="card-title">THE 21 PRIVILEGE</h2>
            <div class="timer-display" id="teaserTimer">
                <span class="time-part">00D</span>
                <span class="time-part">00H</span>
                <span class="time-part">00M</span>
                <span class="time-part">00S</span>
            </div>
            <div class="card-footer">
                <span>ACCESS THE VAULT</span>
                <i class="arrow-icon">→</i>
            </div>
        </div>
    </div>
</div>
  
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

        <div class="privilege-teaser-container">
    <div class="privilege-card-link" onclick="renderPrivilegePage()">
        <div class="card-glow"></div>
        <div class="card-content">
            <span class="event-tag">EXCLUSIVE EVENT</span>
            <h2 class="card-title">THE 21 PRIVILEGE</h2>
            <div class="timer-display" id="teaserTimer">
                <span class="time-part">00D</span>
                <span class="time-part">00H</span>
                <span class="time-part">00M</span>
                <span class="time-part">00S</span>
            </div>
            <div class="card-footer">
                <span>ACCESS THE VAULT</span>
                <i class="arrow-icon">→</i>
            </div>
        </div>
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


`;

}

// Définir la date actuelle pour la démo
// En production, vous utiliseriez 'new Date();'
const dateActuelle = new Date(); 

// --- BASE DE DONNÉES COMPLÈTE DES ÉVÉNEMENTS ---
const donneesEvenements = [
   // --- JEUDI 26 FÉVRIER 2026 ---
    { date: '2026-02-26', jour: 'JEU.', ville: 'LA', artiste: 'BRENT FAIYAZ', details: 'It’s A Wasteland (R&B/Soul Showcase - $90)' },
    { date: '2026-02-26', jour: 'JEU.', ville: 'MIAMI', artiste: 'WIZKID', details: 'More Love, Less Ego (Afrobeats/Highlife - $90)' },
    { date: '2026-02-26', jour: 'JEU.', ville: 'NYC', artiste: 'TEMS', details: 'Born in the Wild (Afro-Fusion/R&B Showcase - $90)' },
    { date: '2026-02-26', jour: 'JEU.', ville: 'SF', artiste: 'J HUS', details: 'Beautiful and Brutal Yard (UK Afroswing/Rap - $90)' },

    // --- VENDREDI 27 FÉVRIER 2026 ---
    { date: '2026-02-27', jour: 'VEN.', ville: 'LA', artiste: 'FEID', details: 'FerxxoCalipsis (Reggaeton/Trap Latino - Accès restreint)' },
    { date: '2026-02-27', jour: 'VEN.', ville: 'MIAMI', artiste: 'KAYCYY', details: 'Who Is KayCyy? (Experimental Trap/R&B - $120)' },
    { date: '2026-02-27', jour: 'VEN.', ville: 'NYC', artiste: 'PESO PLUMA', details: 'Éxodo Club (Corrido/Trap Latino - $110)' },
    { date: '2026-02-27', jour: 'VEN.', ville: 'SF', artiste: 'SKEE MASK', details: 'Compro Live (IDM/Breakbeat Techno Set - $90)' },

    // --- SAMEDI 28 FÉVRIER 2026 ---
    { date: '2026-02-28', jour: 'SAM.', ville: 'LA', artiste: 'METRO BOOMIN', details: 'Heroes & Villains (Cinematic Trap - Accès sur liste VIP uniquement)' },
    { date: '2026-02-28', jour: 'SAM.', ville: 'MIAMI', artiste: 'FUTURE', details: 'Pluto Never Died (Toxic Trap Showcase - $180)' },
    { date: '2026-02-28', jour: 'SAM.', ville: 'NYC', artiste: 'LIL BABY', details: 'It’s Only Us (Atlanta Street-Rap - $150)' },
    { date: '2026-02-28', jour: 'SAM.', ville: 'SF', artiste: 'YEAT', details: '2093 Lyfestyle (Experimental Rage/Trap - $90)' },

    // --- DIMANCHE 01 MARS 2026 ---
    { date: '2026-03-01', jour: 'DIM.', ville: 'LA', artiste: 'TYCHO', details: 'Infinite Health (Dreamwave/Electronic Live - $90)' },
    { date: '2026-03-01', jour: 'DIM.', ville: 'MIAMI', artiste: 'SARA LANDRY', details: 'High Voltage (Hard Techno/Industrial - $90)' },
    { date: '2026-03-01', jour: 'DIM.', ville: 'NYC', artiste: 'SEXYY RED', details: 'Hood Hottest Princess (Ratchet Trap Showcase - $90)' },
    { date: '2026-03-01', jour: 'DIM.', ville: 'SF', artiste: 'MARLON HOFFSTADT', details: 'Daddy Trance (Eurodance/Techno - $90)' }
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
    else {
        // Pour les pages restantes (House Rules, Dress Code, etc.)
        navigate(page); 
    }
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
<div class="privilege-teaser-container">
    <div class="privilege-card-link" onclick="renderPrivilegePage()">
        <div class="card-glow"></div>
        <div class="card-content">
            <span class="event-tag">EXCLUSIVE EVENT</span>
            <h2 class="card-title">THE 21 PRIVILEGE</h2>
            <div class="timer-display" id="teaserTimer">
                <span class="time-part">00D</span>
                <span class="time-part">00H</span>
                <span class="time-part">00M</span>
                <span class="time-part">00S</span>
            </div>
            <div class="card-footer">
                <span>ACCESS THE VAULT</span>
                <i class="arrow-icon">→</i>
            </div>
        </div>
    </div>
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
                            <div class="faq-item" data-search="${item.q.toLowerCase()}">
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
        content: "The Bradford operates in strict adherence to the National Minimum Drinking Age Act (23 U.S.C. § 158) and the specific Liquor Liability Laws of the respective states. Admission is strictly prohibited to any person under the age of twenty-one (21). The Guest must present a valid, non-expired, government-issued identification containing a photograph and date of birth (e.g., U.S. State Driver’s License, U.S. Military ID, or International Passport). The Venue utilizes the 'Bradford Inscribed System', a high-fidelity forensic scanning technology, to verify the authenticity of identification documents. The Group reserves the unilateral, absolute right to refuse admission to any individual, including confirmed reservation holders and Members, if: (a) ID authenticity is questioned; (b) The Guest exhibits signs of pre-arrival intoxication; (c) Dress code standards are not met; (d) The Guest's name appears on any global internal blacklist or sanctioned entity list. Admission is a revocable license granted by The Venue, and this license may be terminated at any moment for any non-discriminatory reason by the Lead Security Officer or Management."
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
        content: "All content included on this interface, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the exclusive property of The Bradford Group or its content suppliers and is protected by United States and international copyright, trademark, and patent laws. The compilation of all content on this site is the exclusive property of The Group. Any unauthorized use, including but not limited to the reproduction, distribution, display, or transmission of the content of this site is strictly prohibited. The 'Bradford' name, the lion/crest logo, and the 'Bradford Inscribed System' are federally registered trademarks. Any 'cloning' of this interface or unauthorized use of our branding for promotional events not sanctioned by the Group will be met with immediate injunctive relief and statutory damages of up to $150,000 per infringement under the Digital Millennium Copyright Act (DMCA)."
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
        content: "The Bradford crest, the proprietary 'Inscribed' typography, and all associated brand signatures are protected as federally registered intellectual property under the USPTO and international WIPO treaties. Any utilization of these assets for print, digital, cinematic, or broadcast distribution is strictly subject to a restrictive Brand Licensing Agreement (BLA). Media partners are categorically forbidden from modifying, distorting, or recoloring hex codes (Bradford Gold #D4AF37 / Obsidian #050505). The Group reserves the unilateral right to audit any digital or physical environment in which our trademarks appear to prevent brand dilution or unauthorized association with mass-market entities. High-resolution style guides, raw vectors, and 8K cinematic B-roll assets are sequestered in our secure servers and only released upon the execution of a notarized Brand Integrity Agreement (BIA) and a verified proof of intended use."
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
        <div class="policy-page fade-in">
            <div class="hero-section">
                <div class="hero-line"></div>
                <h1 class="title-page">ENTRY PROTOCOL</h1>
                <p class="subtitle-page">UN PROCESSUS D'ADMISSION CONÇU POUR L'ÉLITE</p>
            </div>

            <div class="protocol-grid">
                ${protocols.map(p => `
                    <div class="protocol-box">
                        <span class="protocol-number">${p.id}</span>
                        <h2 class="protocol-heading">${p.title}</h2>
                        <p class="protocol-text">${p.desc}</p>
                        <ul class="protocol-list">
                            ${p.details.map(d => `<li><span class="gold-dot"></span> ${d}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>

            <div class="entry-disclaimer">
                <div class="disclaimer-content">
                    <h3>DROIT DE REFUS ABSOLU</h3>
                    <p>Le Bradford se réserve le droit d'interdire l'accès à toute personne ne reflétant pas les valeurs de prestige et de respect portées par l'établissement. Une réservation de table ne garantit pas l'admission automatique.</p>
                </div>
            </div>

            <div class="action-footer">
              <button class="btn-primary" onclick="renderDressCodePage()">CONSULTER LE DRESS CODE</button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function renderVIPPolicy() {
   
    APP_CONTENT.innerHTML = '';

    const vipHTML = `
        <div class="vip-page fade-in">
            <header class="vip-hero">
                <h1 class="title-page">PRESTIGE VIP POLICY</h1>
                <p class="subtitle-page">LE SOMMET DE L'HOSPITALITÉ EXCLUSIVE</p>
            </header>

            <div class="vip-grid">
                <div class="vip-card highlight">
                    <div class="card-inner">
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

             <div class="card-inner">
    <div class="vip-tag">DYNAMIC</div>
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


            <div class="cancellation-banner">
                <div class="banner-content">
                    <h3>POLITIQUE D'ANNULATION</h3>
                    <p>Notification requise 48H avant pour transfert de crédit. Le "No-Show" est un acte définitif.</p>
                </div>
                <div class="banner-footer">BRADFORD ELITE PROTOCOL</div>
            </div>

            <div class="vip-actions">
              <button class="btn-primary" onclick="window.scrollTo(0,0); navigate('reservations')">RESERVER UNE TABLE</button>

            </div>
        </div>
    `;
    
    APP_CONTENT.innerHTML = vipHTML;
    window.scrollTo(0, 0);
}
function renderBottleRequirements() {
    
    APP_CONTENT.innerHTML = '';

    const bottleHTML = `
        <div class="bottle-page fade-in">
            <header class="bottle-hero">
             
                <h1 class="title-page">BOTTLE SERVICE EXIGENCY</h1>
                <p class="subtitle-page">L'ESSENCE MÊME DE L'EXPÉRIENCE BRADFORD</p>
            </header>

            <section class="ratio-section">
                <div class="ratio-display">
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
    <div class="req-block">
        <h2 class="luxury-main-title">PROTOCOLE DE SERVICE</h2>
        
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



    <div class="prestige-gallery">
        <h2 class="luxury-main-title">PRESTIGE & SÉLECTION</h2>
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

<div class="minimum-disclaimero">
    <div class="disclaimero-line"></div>
    <div class="disclaimero-content">
        <span class="disclaimero-tag">ENGAGEMENT</span>
        <p>Les minimums de table doivent être atteints via vos achats de <strong>Bouteilles</strong> ou de <strong>Services Additionnels (Add-ons)</strong>.</p>
    </div>
    <div class="disclaimero-line"></div>
</div>



            <div class="bottle-footer">
              <button class="btn-primary" onclick="window.scrollTo(0,0); navigate('menu')">DÉCOUVRIR LA CARTE</button>

            </div>
        </div>
    `;

    APP_CONTENT.innerHTML = bottleHTML;
    window.scrollTo(0, 0);
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

function initTeaserTimer() {
    // Date de fin : Jeudi 26 Février 2026 à 23:59:59
    const targetDate = new Date("February 26, 2026 23:59:59").getTime();

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("teaserTimer").innerHTML = "CONCOURS TERMINÉ";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("teaserTimer").innerHTML = `
            <span class="time-part">${days}D</span>
            <span class="time-part">${hours}H</span>
            <span class="time-part">${minutes}M</span>
            <span class="time-part">${seconds}S</span>
        `;
    }, 1000);
}

// Lancement au chargement
document.addEventListener('DOMContentLoaded', initTeaserTimer);


window.renderPrivilegePage = function() {
    // 1. On bloque tout mouvement de scroll parasite
    if (event) event.stopPropagation();
    
    // 2. On cible le container (on essaie plusieurs ID courants au cas où)
    const container = document.getElementById('app') || 
                      document.getElementById('APP_CONTENT') || 
                      document.body; 

    if (!container) {
        console.error("Bradford Error: Container non trouvé");
        return;
    }

    // 3. On vide le container et on injecte (ton code de folie est ici)
    container.innerHTML = `
    <div class="privilege-page-wrapper" style="display:block !important; visibility:visible !important; opacity:1 !important;">
        <header class="privilege-header">
            <button onclick="location.reload()" class="back-btn">← EXIT</button>
            <div class="p-logo">BRADFORD</div>
        </header>
        <main class="privilege-content">
            <section class="p-hero">
                <h1 class="p-title">THE 21 PRIVILEGE</h1>
                <p class="p-subtitle">EXCLUSIVITÉ MONDIALE • SAMEDI 28 FÉVRIER</p>
                <div class="p-lineup">
                    <div class="artist-card">
                        <img src="https://www.thefamouspeople.com/profiles/images/future-2.jpg" alt="Future">
                        <div class="artist-info"><h3>FUTURE</h3><p>MIAMI</p></div>
                    </div>
                    <div class="artist-card">
                        <img src="https://www.thefamouspeople.com/profiles/images/metro-boomin-1.jpg" alt="Metro Boomin">
                        <div class="artist-info"><h3>METRO BOOMIN</h3><p>LOS ANGELES</p></div>
                    </div>
                    <div class="artist-card">
                        <img src="https://www.thefamouspeople.com/profiles/images/lil-baby-1.jpg" alt="Lil Baby">
                        <div class="artist-info"><h3>LIL BABY</h3><p>NEW YORK</p></div>
                    </div>
                    <div class="artist-card">
                        <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop" alt="Yeat">
                        <div class="artist-info"><h3>YEAT</h3><p>SAN FRANCISCO</p></div>
                    </div>
                </div>
            </section>

         <section class="p-rewards">
    <div class="reward-box">
        <h3>THE VAULT EXPERIENCE</h3>
        <p class="reward-desc"><strong>LE GRAAL (1 GAGNANT PAR VILLE)</strong></p>
        <p>Table VIP privatisée pour vous et 7 de vos proches (8 personnes total). Inclus : 2 bouteilles de prestige servies à table et un accès prioritaire sans attente.</p>
    </div>
    <div class="reward-box">
        <h3>THE ACCESS PASS</h3>
        <p class="reward-desc"><strong>(15 GAGNANTS PAR VILLE)</strong></p>
        <p>Entrée individuelle gratuite toute la nuit avec 2 consommations "Signature" offertes au bar principal.</p>
    </div>
    <div class="reward-box">
        <h3>THE GUEST LIST</h3>
        <p class="reward-desc"><strong>(50 GAGNANTS PAR VILLE)</strong></p>
        <p>Accès direct à l'établissement sans frais d'entrée (Cover Charge offert). Présentez votre QR Code à l'accueil.</p>
    </div>
</section>
 

            <section class="p-form-section">
                <div class="p-form-container">
                    <h2>THE ACCESS PROTOCOL</h2>
                    <form onsubmit="event.preventDefault(); submitPrivilege(event);">
                        <div class="input-group">
                            <input type="text" id="p-lastname" placeholder="LAST NAME" required>
                            <input type="text" id="p-firstname" placeholder="FIRST NAME" required>
                        </div>
                        <input type="email" id="p-email" placeholder="EMAIL ADDRESS" required>
                        <div class="age-check-box">
                            <label>DATE OF BIRTH</label>
                            <input type="date" id="p-dob" required style="color-scheme: dark;">
                        </div>
                        <div class="city-selector">
                            <div class="city-chips">
                                <div class="chip" onclick="selectCity('MIAMI', this)">MIAMI</div>
                                <div class="chip" onclick="selectCity('LA', this)">L.A.</div>
                                <div class="chip" onclick="selectCity('NY', this)">N.Y.</div>
                                <div class="chip" onclick="selectCity('SF', this)">S.F.</div>
                            </div>
                            <input type="hidden" id="selectedCity">
                        </div>
                       <div class="confirmation-wrapper">
    <label class="confirm-container">
        <input type="checkbox" id="confirmAttendance">
        <span class="checkmark"></span>
        I CONFIRM MY ABILITY TO ATTEND THE EVENT IN THE SELECTED CITY IF GRANTED ACCESS.
    </label>
</div>
<button type="submit" id="submitBtn" class="submit-privilege-btn" disabled>REQUEST ACCESS</button>

                    </form>
                </div>
            </section>
        </main>
    </div>`;

    // Attendre que le DOM soit chargé ou l'insérer dans ton script d'ouverture
const setupCheckboxLogic = () => {
    const checkbox = document.getElementById('confirmAttendance');
    const submitBtn = document.getElementById('submitBtn');

    if (checkbox && submitBtn) {
        checkbox.addEventListener('change', function() {
            submitBtn.disabled = !this.checked;
        });
    }
};

// Appelle cette fonction juste après avoir injecté ton HTML
setupCheckboxLogic();


    // 4. On injecte le CSS
    injectPrivilegeCSS();

    // 5. On force le scroll en haut de la NOUVELLE page
    window.scrollTo({ top: 0, behavior: 'instant' });
};


// Logique de soumission et vérification d'âge
window.submitPrivilege = function(e) {
    e.preventDefault();
    const dob = new Date(document.getElementById('p-dob').value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) { age--; }

    if (age < 21) {
        alert("MATURITY REQUIRED. Bradford is 21+ only.");
        return;
    }

    const city = document.getElementById('selectedCity').value;
    if(!city) { alert("Please select a destination."); return; }

    // Simulation de succès
    const form = document.querySelector('.p-form-container');
    form.innerHTML = `
        <div class="success-msg">
            <div class="success-icon">✦</div>
            <h2>ACCESS REQUESTED</h2>
            <p>Votre demande pour <strong>${city}</strong> a été enregistrée.</p>
            <p>Réponse par email le 27 février.</p>
        </div>
    `;
};

window.selectCity = function(city, el) {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('selectedCity').value = city;
};


function injectPrivilegeCSS() {
    const styleId = 'privilege-style';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
       .privilege-page-wrapper {
    background: #050505;
    color: white;
    font-family: 'Cinzel', serif;
    padding-bottom: 100px;
    
    /* LES MODIFS CRUCIALES ICI */
    position: fixed;     /* 1. Bloque la page au-dessus du site */
    top: 0;              /* 2. Colle au haut de l'écran */
    left: 0;             /* 3. Colle à gauche */
    width: 100vw;        /* 4. Prend toute la largeur */
    height: 100vh;       /* 5. Prend toute la hauteur */
    z-index: 999999;     /* 6. Passe devant ton header et tout le reste */
    overflow-y: auto;    /* 7. Permet de scroller le formulaire si besoin */
    padding-top: 80px;   /* 8. Décale le contenu pour qu'il soit sous ton header */
}


        .privilege-header {
            display: flex;
            justify-content: space-between;
            padding: 30px;
            align-items: center;
        }

        .back-btn {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            padding: 10px 20px;
            cursor: pointer;
            transition: 0.3s;
        }

        .p-title {
            text-align: center;
            font-size: 4rem;
            letter-spacing: 10px;
            margin-top: 50px;
            background: linear-gradient(to bottom, #fff, #D4AF37);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .p-subtitle {
            text-align: center;
            letter-spacing: 5px;
            color: rgba(255,255,255,0.5);
            font-size: 0.9rem;
        }

        /* LINEUP CARDS */
        .p-lineup {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 50px;
        }

        .artist-card {
            position: relative;
            height: 400px;
            overflow: hidden;
            border: 1px solid rgba(212, 175, 55, 0.2);
            filter: grayscale(100%);
            transition: 0.5s;
        }

        .artist-card:hover {
            filter: grayscale(0%);
            border-color: #D4AF37;
            transform: scale(1.02);
        }

        .artist-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .artist-info {
            position: absolute;
            bottom: 0;
            padding: 20px;
            background: linear-gradient(transparent, black);
            width: 100%;
        }

        /* REWARDS */
        .p-rewards {
            display: flex;
            justify-content: center;
            gap: 30px;
            padding: 50px;
            flex-wrap: wrap;
        }

        .reward-box {
            border: 1px solid rgba(255,255,255,0.1);
            padding: 30px;
            text-align: center;
            width: 300px;
            background: rgba(255,255,255,0.02);
        }

        .reward-box h3 { color: #D4AF37; margin-bottom: 10px; }

        /* FORM */
       .p-form-container {
    max-width: 600px;
    margin: 0 auto;
    background: rgba(255,255,255,0.03);
    padding: 40px 20px;  /* On réduit un peu le padding latéral pour gagner de la place */
    border-top: 1px solid #D4AF37;
}


        .input-group { display: flex; gap: 20px; }
        
        input {
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            color: white;
            padding: 15px 5px;
            width: 100%;
            margin-bottom: 30px;
            outline: none;
            transition: 0.3s;
        }

        input:focus { border-bottom-color: #D4AF37; }

        .city-chips {
    display: flex;
    gap: 10px;           /* Espace entre les carrés */
    margin-top: 15px;
    margin-bottom: 40px;
    justify-content: flex-start; /* Aligne au début (gauche) */
    flex-wrap: wrap;     /* Force le retour à la ligne si l'écran est trop petit au lieu de déborder */
}

       .chip {
    flex: 1;             /* Force les carrés à avoir la même largeur */
    min-width: 80px;     /* Empêche qu'ils deviennent trop minuscules */
    max-width: 120px;    /* Limite leur taille pour qu'ils restent élégants */
    padding: 12px 5px;   /* Ajustement du padding interne */
    border: 1px solid rgba(255,255,255,0.3);
    cursor: pointer;
    transition: 0.3s;
    text-align: center;  /* Centre bien le nom de la ville */
    font-size: 0.8rem;   /* Taille de police optimale */
}

        .chip.active {
            background: #D4AF37;
            color: black;
            border-color: #D4AF37;
        }

        .submit-privilege-btn {
            width: 100%;
            padding: 20px;
            background: transparent;
            border: 1px solid #D4AF37;
            color: #D4AF37;
            font-family: 'Cinzel', serif;
            cursor: pointer;
            font-size: 1.2rem;
            transition: 0.3s;
        }

        .submit-privilege-btn:hover {
            background: #D4AF37;
            color: black;
        }

        .confirmation-wrapper {
    margin-bottom: 25px;
    padding: 10px 5px;
}

.confirm-container {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255,255,255,0.6);
    font-size: 0.7rem;
    letter-spacing: 1px;
    cursor: pointer;
    text-transform: uppercase;
}

/* Style du bouton quand il est bloqué */
.submit-privilege-btn:disabled {
    border-color: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.2);
    cursor: not-allowed;
    background: transparent;
}

/* Style de la checkbox (discret et luxe) */
input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #D4AF37;
    cursor: pointer;
}


.reward-desc {
    color: #D4AF37;
    font-size: 0.75rem;
    letter-spacing: 2px;
    margin-bottom: 10px;
    text-transform: uppercase;
}

.reward-box p {
    font-size: 0.85rem;
    line-height: 1.5;
    color: rgba(255,255,255,0.7);
    font-family: 'Helvetica', sans-serif; /* Plus lisible pour les règles */
}


        .success-msg { text-align: center; }
        .success-icon { font-size: 4rem; color: #D4AF37; margin-bottom: 20px; }
        /* --- ADAPTATION RESPONSIVE (ORDI / TABLETTE / MOBILE) --- */

/* 1. Ajustements pour les écrans larges (Ordinateurs) */
@media (min-width: 1024px) {
    .p-lineup {
        grid-template-columns: repeat(4, 1fr); /* 4 rappeurs alignés sur une ligne */
        max-width: 1400px;
        margin: 0 auto;
    }
    
    .p-title {
        font-size: 5rem; /* Titre imposant sur grand écran */
    }
}

/* 2. Ajustements pour les Tablettes */
@media (max-width: 1023px) and (min-width: 768px) {
    .p-lineup {
        grid-template-columns: repeat(2, 1fr); /* 2 colonnes par ligne */
        padding: 30px;
    }
    
    .p-title {
        font-size: 3rem;
    }
}

/* 3. Ajustements pour les Mobiles (iPhone/Android) */
@media (max-width: 767px) {
    .p-title {
        font-size: 2rem; /* Réduction pour éviter que le titre sorte de l'écran */
        letter-spacing: 5px;
        margin-top: 20px;
    }

    .p-lineup {
        grid-template-columns: 1fr; /* 1 seul rappeur par ligne pour la lisibilité */
        padding: 20px;
    }

    .artist-card {
        height: 300px; /* On réduit un peu la hauteur des cartes sur mobile */
    }

    .p-rewards {
        gap: 15px;
        padding: 20px;
    }

    .reward-box {
        width: 100%; /* Les boîtes de récompenses prennent toute la largeur */
    }

    .input-group {
        flex-direction: column; /* Nom et Prénom l'un sous l'autre sur mobile */
        gap: 0;
    }

    .privilege-page-wrapper {
        padding-top: 60px; /* Moins d'espace en haut pour laisser respirer le titre */
    }
}

    `;
    document.head.appendChild(style);
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
