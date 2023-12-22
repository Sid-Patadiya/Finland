const countries = [
  {
    name: 'Afghanistan',
    alpha2Code: 'AF',
    callingCode: '93',
  },
  {
    name: 'Åland Islands',
    alpha2Code: 'AX',
    callingCode: '358',
  },
  {
    name: 'Albania',
    alpha2Code: 'AL',
    callingCode: '355',
  },
  {
    name: 'Algeria',
    alpha2Code: 'DZ',
    callingCode: '213',
  },
  {
    name: 'American Samoa',
    alpha2Code: 'AS',
    callingCode: '1684',
  },
  {
    name: 'Andorra',
    alpha2Code: 'AD',
    callingCode: '376',
  },
  {
    name: 'Angola',
    alpha2Code: 'AO',
    callingCode: '244',
  },
  {
    name: 'Anguilla',
    alpha2Code: 'AI',
    callingCode: '1264',
  },
  {
    name: 'Antarctica',
    alpha2Code: 'AQ',
    callingCode: '672',
  },
  {
    name: 'Antigua and Barbuda',
    alpha2Code: 'AG',
    callingCode: '1268',
  },
  {
    name: 'Argentina',
    alpha2Code: 'AR',
    callingCode: '54',
  },
  {
    name: 'Armenia',
    alpha2Code: 'AM',
    callingCode: '374',
  },
  {
    name: 'Aruba',
    alpha2Code: 'AW',
    callingCode: '297',
  },
  {
    name: 'Australia',
    alpha2Code: 'AU',
    callingCode: '61',
  },
  {
    name: 'Austria',
    alpha2Code: 'AT',
    callingCode: '43',
  },
  {
    name: 'Azerbaijan',
    alpha2Code: 'AZ',
    callingCode: '994',
  },
  {
    name: 'Bahamas',
    alpha2Code: 'BS',
    callingCode: '1242',
  },
  {
    name: 'Bahrain',
    alpha2Code: 'BH',
    callingCode: '973',
  },
  {
    name: 'Bangladesh',
    alpha2Code: 'BD',
    callingCode: '880',
  },
  {
    name: 'Barbados',
    alpha2Code: 'BB',
    callingCode: '1246',
  },
  {
    name: 'Belarus',
    alpha2Code: 'BY',
    callingCode: '375',
  },
  {
    name: 'Belgium',
    alpha2Code: 'BE',
    callingCode: '32',
  },
  {
    name: 'Belize',
    alpha2Code: 'BZ',
    callingCode: '501',
  },
  {
    name: 'Benin',
    alpha2Code: 'BJ',
    callingCode: '229',
  },
  {
    name: 'Bermuda',
    alpha2Code: 'BM',
    callingCode: '1441',
  },
  {
    name: 'Bhutan',
    alpha2Code: 'BT',
    callingCode: '975',
  },
  {
    name: 'Bolivia (Plurinational State of)',
    alpha2Code: 'BO',
    callingCode: '591',
  },
  {
    name: 'Bonaire, Sint Eustatius and Saba',
    alpha2Code: 'BQ',
    callingCode: '5997',
  },
  {
    name: 'Bosnia and Herzegovina',
    alpha2Code: 'BA',
    callingCode: '387',
  },
  {
    name: 'Botswana',
    alpha2Code: 'BW',
    callingCode: '267',
  },
  {
    name: 'Brazil',
    alpha2Code: 'BR',
    callingCode: '55',
  },
  {
    name: 'British Indian Ocean Territory',
    alpha2Code: 'IO',
    callingCode: '246',
  },
  {
    name: 'Virgin Islands (British)',
    alpha2Code: 'VG',
    callingCode: '1284',
  },
  {
    name: 'Virgin Islands (U.S.)',
    alpha2Code: 'VI',
    callingCode: '1 340',
  },
  {
    name: 'Brunei Darussalam',
    alpha2Code: 'BN',
    callingCode: '673',
  },
  {
    name: 'Bulgaria',
    alpha2Code: 'BG',
    callingCode: '359',
  },
  {
    name: 'Burkina Faso',
    alpha2Code: 'BF',
    callingCode: '226',
  },
  {
    name: 'Burundi',
    alpha2Code: 'BI',
    callingCode: '257',
  },
  {
    name: 'Cambodia',
    alpha2Code: 'KH',
    callingCode: '855',
  },
  {
    name: 'Cameroon',
    alpha2Code: 'CM',
    callingCode: '237',
  },
  {
    name: 'Canada',
    alpha2Code: 'CA',
    callingCode: '1',
  },
  {
    name: 'Cabo Verde',
    alpha2Code: 'CV',
    callingCode: '238',
  },
  {
    name: 'Cayman Islands',
    alpha2Code: 'KY',
    callingCode: '1345',
  },
  {
    name: 'Central African Republic',
    alpha2Code: 'CF',
    callingCode: '236',
  },
  {
    name: 'Chad',
    alpha2Code: 'TD',
    callingCode: '235',
  },
  {
    name: 'Chile',
    alpha2Code: 'CL',
    callingCode: '56',
  },
  {
    name: 'China',
    alpha2Code: 'CN',
    callingCode: '86',
  },
  {
    name: 'Christmas Island',
    alpha2Code: 'CX',
    callingCode: '61',
  },
  {
    name: 'Cocos (Keeling) Islands',
    alpha2Code: 'CC',
    callingCode: '61',
  },
  {
    name: 'Colombia',
    alpha2Code: 'CO',
    callingCode: '57',
  },
  {
    name: 'Comoros',
    alpha2Code: 'KM',
    callingCode: '269',
  },
  {
    name: 'Congo',
    alpha2Code: 'CG',
    callingCode: '242',
  },
  {
    name: 'Congo (Democratic Republic of the)',
    alpha2Code: 'CD',
    callingCode: '243',
  },
  {
    name: 'Cook Islands',
    alpha2Code: 'CK',
    callingCode: '682',
  },
  {
    name: 'Costa Rica',
    alpha2Code: 'CR',
    callingCode: '506',
  },
  {
    name: 'Croatia',
    alpha2Code: 'HR',
    callingCode: '385',
  },
  {
    name: 'Cuba',
    alpha2Code: 'CU',
    callingCode: '53',
  },
  {
    name: 'Curaçao',
    alpha2Code: 'CW',
    callingCode: '599',
  },
  {
    name: 'Cyprus',
    alpha2Code: 'CY',
    callingCode: '357',
  },
  {
    name: 'Czech Republic',
    alpha2Code: 'CZ',
    callingCode: '420',
  },
  {
    name: 'Denmark',
    alpha2Code: 'DK',
    callingCode: '45',
  },
  {
    name: 'Djibouti',
    alpha2Code: 'DJ',
    callingCode: '253',
  },
  {
    name: 'Dominica',
    alpha2Code: 'DM',
    callingCode: '1767',
  },
  {
    name: 'Dominican Republic',
    alpha2Code: 'DO',
    callingCode: '1809',
  },
  {
    name: 'Ecuador',
    alpha2Code: 'EC',
    callingCode: '593',
  },
  {
    name: 'Egypt',
    alpha2Code: 'EG',
    callingCode: '20',
  },
  {
    name: 'El Salvador',
    alpha2Code: 'SV',
    callingCode: '503',
  },
  {
    name: 'Equatorial Guinea',
    alpha2Code: 'GQ',
    callingCode: '240',
  },
  {
    name: 'Eritrea',
    alpha2Code: 'ER',
    callingCode: '291',
  },
  {
    name: 'Estonia',
    alpha2Code: 'EE',
    callingCode: '372',
  },
  {
    name: 'Ethiopia',
    alpha2Code: 'ET',
    callingCode: '251',
  },
  {
    name: 'Falkland Islands (Malvinas)',
    alpha2Code: 'FK',
    callingCode: '500',
  },
  {
    name: 'Faroe Islands',
    alpha2Code: 'FO',
    callingCode: '298',
  },
  {
    name: 'Fiji',
    alpha2Code: 'FJ',
    callingCode: '679',
  },
  {
    name: 'Finland',
    alpha2Code: 'FI',
    callingCode: '358',
  },
  {
    name: 'France',
    alpha2Code: 'FR',
    callingCode: '33',
  },
  {
    name: 'French Guiana',
    alpha2Code: 'GF',
    callingCode: '594',
  },
  {
    name: 'French Polynesia',
    alpha2Code: 'PF',
    callingCode: '689',
  },
  {
    name: 'Gabon',
    alpha2Code: 'GA',
    callingCode: '241',
  },
  {
    name: 'Gambia',
    alpha2Code: 'GM',
    callingCode: '220',
  },
  {
    name: 'Georgia',
    alpha2Code: 'GE',
    callingCode: '995',
  },
  {
    name: 'Germany',
    alpha2Code: 'DE',
    callingCode: '49',
  },
  {
    name: 'Ghana',
    alpha2Code: 'GH',
    callingCode: '233',
  },
  {
    name: 'Gibraltar',
    alpha2Code: 'GI',
    callingCode: '350',
  },
  {
    name: 'Greece',
    alpha2Code: 'GR',
    callingCode: '30',
  },
  {
    name: 'Greenland',
    alpha2Code: 'GL',
    callingCode: '299',
  },
  {
    name: 'Grenada',
    alpha2Code: 'GD',
    callingCode: '1473',
  },
  {
    name: 'Guadeloupe',
    alpha2Code: 'GP',
    callingCode: '590',
  },
  {
    name: 'Guam',
    alpha2Code: 'GU',
    callingCode: '1671',
  },
  {
    name: 'Guatemala',
    alpha2Code: 'GT',
    callingCode: '502',
  },
  {
    name: 'Guernsey',
    alpha2Code: 'GG',
    callingCode: '44',
  },
  {
    name: 'Guinea',
    alpha2Code: 'GN',
    callingCode: '224',
  },
  {
    name: 'Guinea-Bissau',
    alpha2Code: 'GW',
    callingCode: '245',
  },
  {
    name: 'Guyana',
    alpha2Code: 'GY',
    callingCode: '592',
  },
  {
    name: 'Haiti',
    alpha2Code: 'HT',
    callingCode: '509',
  },
  {
    name: 'Holy See',
    alpha2Code: 'VA',
    callingCode: '379',
  },
  {
    name: 'Honduras',
    alpha2Code: 'HN',
    callingCode: '504',
  },
  {
    name: 'Hong Kong',
    alpha2Code: 'HK',
    callingCode: '852',
  },
  {
    name: 'Hungary',
    alpha2Code: 'HU',
    callingCode: '36',
  },
  {
    name: 'Iceland',
    alpha2Code: 'IS',
    callingCode: '354',
  },
  {
    name: 'India',
    alpha2Code: 'IN',
    callingCode: '91',
  },
  {
    name: 'Indonesia',
    alpha2Code: 'ID',
    callingCode: '62',
  },
  {
    name: "Côte d'Ivoire",
    alpha2Code: 'CI',
    callingCode: '225',
  },
  {
    name: 'Iran (Islamic Republic of)',
    alpha2Code: 'IR',
    callingCode: '98',
  },
  {
    name: 'Iraq',
    alpha2Code: 'IQ',
    callingCode: '964',
  },
  {
    name: 'Ireland',
    alpha2Code: 'IE',
    callingCode: '353',
  },
  {
    name: 'Isle of Man',
    alpha2Code: 'IM',
    callingCode: '44',
  },
  {
    name: 'Israel',
    alpha2Code: 'IL',
    callingCode: '972',
  },
  {
    name: 'Italy',
    alpha2Code: 'IT',
    callingCode: '39',
  },
  {
    name: 'Jamaica',
    alpha2Code: 'JM',
    callingCode: '1876',
  },
  {
    name: 'Japan',
    alpha2Code: 'JP',
    callingCode: '81',
  },
  {
    name: 'Jersey',
    alpha2Code: 'JE',
    callingCode: '44',
  },
  {
    name: 'Jordan',
    alpha2Code: 'JO',
    callingCode: '962',
  },
  {
    name: 'Kazakhstan',
    alpha2Code: 'KZ',
    callingCode: '76',
  },
  {
    name: 'Kenya',
    alpha2Code: 'KE',
    callingCode: '254',
  },
  {
    name: 'Kiribati',
    alpha2Code: 'KI',
    callingCode: '686',
  },
  {
    name: 'Kuwait',
    alpha2Code: 'KW',
    callingCode: '965',
  },
  {
    name: 'Kyrgyzstan',
    alpha2Code: 'KG',
    callingCode: '996',
  },
  {
    name: "Lao People's Democratic Republic",
    alpha2Code: 'LA',
    callingCode: '856',
  },
  {
    name: 'Latvia',
    alpha2Code: 'LV',
    callingCode: '371',
  },
  {
    name: 'Lebanon',
    alpha2Code: 'LB',
    callingCode: '961',
  },
  {
    name: 'Lesotho',
    alpha2Code: 'LS',
    callingCode: '266',
  },
  {
    name: 'Liberia',
    alpha2Code: 'LR',
    callingCode: '231',
  },
  {
    name: 'Libya',
    alpha2Code: 'LY',
    callingCode: '218',
  },
  {
    name: 'Liechtenstein',
    alpha2Code: 'LI',
    callingCode: '423',
  },
  {
    name: 'Lithuania',
    alpha2Code: 'LT',
    callingCode: '370',
  },
  {
    name: 'Luxembourg',
    alpha2Code: 'LU',
    callingCode: '352',
  },
  {
    name: 'Macao',
    alpha2Code: 'MO',
    callingCode: '853',
  },
  {
    name: 'Macedonia (the former Yugoslav Republic of)',
    alpha2Code: 'MK',
    callingCode: '389',
  },
  {
    name: 'Madagascar',
    alpha2Code: 'MG',
    callingCode: '261',
  },
  {
    name: 'Malawi',
    alpha2Code: 'MW',
    callingCode: '265',
  },
  {
    name: 'Malaysia',
    alpha2Code: 'MY',
    callingCode: '60',
  },
  {
    name: 'Maldives',
    alpha2Code: 'MV',
    callingCode: '960',
  },
  {
    name: 'Mali',
    alpha2Code: 'ML',
    callingCode: '223',
  },
  {
    name: 'Malta',
    alpha2Code: 'MT',
    callingCode: '356',
  },
  {
    name: 'Marshall Islands',
    alpha2Code: 'MH',
    callingCode: '692',
  },
  {
    name: 'Martinique',
    alpha2Code: 'MQ',
    callingCode: '596',
  },
  {
    name: 'Mauritania',
    alpha2Code: 'MR',
    callingCode: '222',
  },
  {
    name: 'Mauritius',
    alpha2Code: 'MU',
    callingCode: '230',
  },
  {
    name: 'Mayotte',
    alpha2Code: 'YT',
    callingCode: '262',
  },
  {
    name: 'Mexico',
    alpha2Code: 'MX',
    callingCode: '52',
  },
  {
    name: 'Micronesia (Federated States of)',
    alpha2Code: 'FM',
    callingCode: '691',
  },
  {
    name: 'Moldova (Republic of)',
    alpha2Code: 'MD',
    callingCode: '373',
  },
  {
    name: 'Monaco',
    alpha2Code: 'MC',
    callingCode: '377',
  },
  {
    name: 'Mongolia',
    alpha2Code: 'MN',
    callingCode: '976',
  },
  {
    name: 'Montenegro',
    alpha2Code: 'ME',
    callingCode: '382',
  },
  {
    name: 'Montserrat',
    alpha2Code: 'MS',
    callingCode: '1664',
  },
  {
    name: 'Morocco',
    alpha2Code: 'MA',
    callingCode: '212',
  },
  {
    name: 'Mozambique',
    alpha2Code: 'MZ',
    callingCode: '258',
  },
  {
    name: 'Myanmar',
    alpha2Code: 'MM',
    callingCode: '95',
  },
  {
    name: 'Namibia',
    alpha2Code: 'NA',
    callingCode: '264',
  },
  {
    name: 'Nauru',
    alpha2Code: 'NR',
    callingCode: '674',
  },
  {
    name: 'Nepal',
    alpha2Code: 'NP',
    callingCode: '977',
  },
  {
    name: 'Netherlands',
    alpha2Code: 'NL',
    callingCode: '31',
  },
  {
    name: 'New Caledonia',
    alpha2Code: 'NC',
    callingCode: '687',
  },
  {
    name: 'New Zealand',
    alpha2Code: 'NZ',
    callingCode: '64',
  },
  {
    name: 'Nicaragua',
    alpha2Code: 'NI',
    callingCode: '505',
  },
  {
    name: 'Niger',
    alpha2Code: 'NE',
    callingCode: '227',
  },
  {
    name: 'Nigeria',
    alpha2Code: 'NG',
    callingCode: '234',
  },
  {
    name: 'Niue',
    alpha2Code: 'NU',
    callingCode: '683',
  },
  {
    name: 'Norfolk Island',
    alpha2Code: 'NF',
    callingCode: '672',
  },
  {
    name: "Korea (Democratic People's Republic of)",
    alpha2Code: 'KP',
    callingCode: '850',
  },
  {
    name: 'Northern Mariana Islands',
    alpha2Code: 'MP',
    callingCode: '1670',
  },
  {
    name: 'Norway',
    alpha2Code: 'NO',
    callingCode: '47',
  },
  {
    name: 'Oman',
    alpha2Code: 'OM',
    callingCode: '968',
  },
  {
    name: 'Pakistan',
    alpha2Code: 'PK',
    callingCode: '92',
  },
  {
    name: 'Palau',
    alpha2Code: 'PW',
    callingCode: '680',
  },
  {
    name: 'Palestine, State of',
    alpha2Code: 'PS',
    callingCode: '970',
  },
  {
    name: 'Panama',
    alpha2Code: 'PA',
    callingCode: '507',
  },
  {
    name: 'Papua New Guinea',
    alpha2Code: 'PG',
    callingCode: '675',
  },
  {
    name: 'Paraguay',
    alpha2Code: 'PY',
    callingCode: '595',
  },
  {
    name: 'Peru',
    alpha2Code: 'PE',
    callingCode: '51',
  },
  {
    name: 'Philippines',
    alpha2Code: 'PH',
    callingCode: '63',
  },
  {
    name: 'Pitcairn',
    alpha2Code: 'PN',
    callingCode: '64',
  },
  {
    name: 'Poland',
    alpha2Code: 'PL',
    callingCode: '48',
  },
  {
    name: 'Portugal',
    alpha2Code: 'PT',
    callingCode: '351',
  },
  {
    name: 'Puerto Rico',
    alpha2Code: 'PR',
    callingCode: '1787',
  },
  {
    name: 'Qatar',
    alpha2Code: 'QA',
    callingCode: '974',
  },
  {
    name: 'Republic of Kosovo',
    alpha2Code: 'XK',
    callingCode: '383',
  },
  {
    name: 'Réunion',
    alpha2Code: 'RE',
    callingCode: '262',
  },
  {
    name: 'Romania',
    alpha2Code: 'RO',
    callingCode: '40',
  },
  {
    name: 'Russian Federation',
    alpha2Code: 'RU',
    callingCode: '7',
  },
  {
    name: 'Rwanda',
    alpha2Code: 'RW',
    callingCode: '250',
  },
  {
    name: 'Saint Barthélemy',
    alpha2Code: 'BL',
    callingCode: '590',
  },
  {
    name: 'Saint Helena, Ascension and Tristan da Cunha',
    alpha2Code: 'SH',
    callingCode: '290',
  },
  {
    name: 'Saint Kitts and Nevis',
    alpha2Code: 'KN',
    callingCode: '1869',
  },
  {
    name: 'Saint Lucia',
    alpha2Code: 'LC',
    callingCode: '1758',
  },
  {
    name: 'Saint Martin (French part)',
    alpha2Code: 'MF',
    callingCode: '590',
  },
  {
    name: 'Saint Pierre and Miquelon',
    alpha2Code: 'PM',
    callingCode: '508',
  },
  {
    name: 'Saint Vincent and the Grenadines',
    alpha2Code: 'VC',
    callingCode: '1784',
  },
  {
    name: 'Samoa',
    alpha2Code: 'WS',
    callingCode: '685',
  },
  {
    name: 'San Marino',
    alpha2Code: 'SM',
    callingCode: '378',
  },
  {
    name: 'Sao Tome and Principe',
    alpha2Code: 'ST',
    callingCode: '239',
  },
  {
    name: 'Saudi Arabia',
    alpha2Code: 'SA',
    callingCode: '966',
  },
  {
    name: 'Senegal',
    alpha2Code: 'SN',
    callingCode: '221',
  },
  {
    name: 'Serbia',
    alpha2Code: 'RS',
    callingCode: '381',
  },
  {
    name: 'Seychelles',
    alpha2Code: 'SC',
    callingCode: '248',
  },
  {
    name: 'Sierra Leone',
    alpha2Code: 'SL',
    callingCode: '232',
  },
  {
    name: 'Singapore',
    alpha2Code: 'SG',
    callingCode: '65',
  },
  {
    name: 'Sint Maarten (Dutch part)',
    alpha2Code: 'SX',
    callingCode: '1721',
  },
  {
    name: 'Slovakia',
    alpha2Code: 'SK',
    callingCode: '421',
  },
  {
    name: 'Slovenia',
    alpha2Code: 'SI',
    callingCode: '386',
  },
  {
    name: 'Solomon Islands',
    alpha2Code: 'SB',
    callingCode: '677',
  },
  {
    name: 'Somalia',
    alpha2Code: 'SO',
    callingCode: '252',
  },
  {
    name: 'South Africa',
    alpha2Code: 'ZA',
    callingCode: '27',
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    alpha2Code: 'GS',
    callingCode: '500',
  },
  {
    name: 'Korea (Republic of)',
    alpha2Code: 'KR',
    callingCode: '82',
  },
  {
    name: 'South Sudan',
    alpha2Code: 'SS',
    callingCode: '211',
  },
  {
    name: 'Spain',
    alpha2Code: 'ES',
    callingCode: '34',
  },
  {
    name: 'Sri Lanka',
    alpha2Code: 'LK',
    callingCode: '94',
  },
  {
    name: 'Sudan',
    alpha2Code: 'SD',
    callingCode: '249',
  },
  {
    name: 'Suriname',
    alpha2Code: 'SR',
    callingCode: '597',
  },
  {
    name: 'Svalbard and Jan Mayen',
    alpha2Code: 'SJ',
    callingCode: '4779',
  },
  {
    name: 'Swaziland',
    alpha2Code: 'SZ',
    callingCode: '268',
  },
  {
    name: 'Sweden',
    alpha2Code: 'SE',
    callingCode: '46',
  },
  {
    name: 'Switzerland',
    alpha2Code: 'CH',
    callingCode: '41',
  },
  {
    name: 'Syrian Arab Republic',
    alpha2Code: 'SY',
    callingCode: '963',
  },
  {
    name: 'Taiwan',
    alpha2Code: 'TW',
    callingCode: '886',
  },
  {
    name: 'Tajikistan',
    alpha2Code: 'TJ',
    callingCode: '992',
  },
  {
    name: 'Tanzania, United Republic of',
    alpha2Code: 'TZ',
    callingCode: '255',
  },
  {
    name: 'Thailand',
    alpha2Code: 'TH',
    callingCode: '66',
  },
  {
    name: 'Timor-Leste',
    alpha2Code: 'TL',
    callingCode: '670',
  },
  {
    name: 'Togo',
    alpha2Code: 'TG',
    callingCode: '228',
  },
  {
    name: 'Tokelau',
    alpha2Code: 'TK',
    callingCode: '690',
  },
  {
    name: 'Tonga',
    alpha2Code: 'TO',
    callingCode: '676',
  },
  {
    name: 'Trinidad and Tobago',
    alpha2Code: 'TT',
    callingCode: '1868',
  },
  {
    name: 'Tunisia',
    alpha2Code: 'TN',
    callingCode: '216',
  },
  {
    name: 'Turkey',
    alpha2Code: 'TR',
    callingCode: '90',
  },
  {
    name: 'Turkmenistan',
    alpha2Code: 'TM',
    callingCode: '993',
  },
  {
    name: 'Turks and Caicos Islands',
    alpha2Code: 'TC',
    callingCode: '1649',
  },
  {
    name: 'Tuvalu',
    alpha2Code: 'TV',
    callingCode: '688',
  },
  {
    name: 'Uganda',
    alpha2Code: 'UG',
    callingCode: '256',
  },
  {
    name: 'Ukraine',
    alpha2Code: 'UA',
    callingCode: '380',
  },
  {
    name: 'United Arab Emirates',
    alpha2Code: 'AE',
    callingCode: '971',
  },
  {
    name: 'United Kingdom of Great Britain and Northern Ireland',
    alpha2Code: 'GB',
    callingCode: '44',
  },
  {
    name: 'United States of America',
    alpha2Code: 'US',
    callingCode: '1',
  },
  {
    name: 'Uruguay',
    alpha2Code: 'UY',
    callingCode: '598',
  },
  {
    name: 'Uzbekistan',
    alpha2Code: 'UZ',
    callingCode: '998',
  },
  {
    name: 'Vanuatu',
    alpha2Code: 'VU',
    callingCode: '678',
  },
  {
    name: 'Venezuela (Bolivarian Republic of)',
    alpha2Code: 'VE',
    callingCode: '58',
  },
  {
    name: 'Viet Nam',
    alpha2Code: 'VN',
    callingCode: '84',
  },
  {
    name: 'Wallis and Futuna',
    alpha2Code: 'WF',
    callingCode: '681',
  },
  {
    name: 'Western Sahara',
    alpha2Code: 'EH',
    callingCode: '212',
  },
  {
    name: 'Yemen',
    alpha2Code: 'YE',
    callingCode: '967',
  },
  {
    name: 'Zambia',
    alpha2Code: 'ZM',
    callingCode: '260',
  },
  {
    name: 'Zimbabwe',
    alpha2Code: 'ZW',
    callingCode: '263',
  },
];
export default countries;