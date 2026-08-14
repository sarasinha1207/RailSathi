CATEGORY_CODE_MAP = {
    ("bed roll", "dirty / torn"): "BED_DIRTY/TORN",
    ("bed roll", "non availability"): "BED_NOT_AVAIL",
    ("bed roll", "others"): "BED_OTHER",
    ("bed roll", "overcharging"): "BED_OVERCHARGE",

    ("catering & vending services", "e-catering"): "CAT_ECATER",
    ("catering & vending services", "food & water not available"): "CAT_FOOD_WATER",
    ("catering & vending services", "food quality"): "CAT_FOOD_QLTY",
    ("catering & vending services", "food quality & quantity"): "CAT_FOOD_QLTY_QTY",
    ("catering & vending services", "food quantity"): "CAT_FOOD_QTY",
    ("catering & vending services", "hygiene"): "CAT_HYGIENE",
    ("catering & vending services", "others"): "CAT_OTHER",
    ("catering & vending services", "overcharging"): "CAT_OVERCHARGE",
    ("catering & vending services", "service quality"): "CAT_SERVICE",
    ("catering & vending services", "service quality & hygiene"): "CAT_SERVICE_HYGIENE",

    ("cleanliness", "others"): "CLN_OTHER",
    ("cleanliness", "platform"): "CLN_PLATFORM",
    ("cleanliness", "stalls"): "CLN_STALL",
    ("cleanliness", "station entrance / building"): "CLN_ENTRANCE",
    ("cleanliness", "toilet"): "CLN_TOILET",
    ("cleanliness", "waiting room / retiring room"): "CLN_WAITING_ROOM",

    ("coach - cleanliness", "coach exterior"): "COACH_EXT_CLEAN",
    ("coach - cleanliness", "coach interior"): "COACH_INT_CLEAN",
    ("coach - cleanliness", "cockroach / rodents"): "COACH_PEST",
    ("coach - cleanliness", "others"): "COACH_OTHER",
    ("coach - cleanliness", "toilet"): "COACH_TOILET",
    ("coach - cleanliness", "washbasin"): "COACH_WASHBASIN",

    ("coach - maintenance", "broken/missing toilet fittings"): "COACH_TOILET_BROKEN",
    ("coach - maintenance", "jerks/abnormal sound"): "COACH_JERK_SOUND",
    ("coach - maintenance", "others"): "COACH_OTHER_MAINT",
    ("coach - maintenance", "tap leaking/tap not working"): "COACH_TAP_LEAK",
    ("coach - maintenance", "window/door locking problem"): "COACH_DOOR_WINDOW",
    ("coach - maintenance", "window/seat broken"): "COACH_SEAT_WINDOW",

    ("corruption / bribery", "corruption / bribery"): "CORRUPTION",

    ("divyangjan facilities", "braille signage in coach"): "DIV_BRAILLE",
    ("divyangjan facilities", "divyangjan coach unavailability"): "DIV_COACH",
    ("divyangjan facilities", "divyangjan toilet /washbasin"): "DIV_TOILET",
    ("divyangjan facilities", "others"): "DIV_OTHER",
    ("divyangjan facilities", "low height ticket counter"): "DIV_TICKET_COUNTER",
    ("divyangjan facilities", "low height water booth"): "DIV_WATER_BOOTH",
    ("divyangjan facilities", "low seat toilet"): "DIV_LOW_TOILET",
    ("divyangjan facilities", "parking"): "DIV_PARKING",
    ("divyangjan facilities", "ramp at entry/exit gates"): "DIV_RAMP",
    ("divyangjan facilities", "seating arrangement at station/waiting area"): "DIV_SEATING",
    ("divyangjan facilities", "tactile pathway"): "DIV_TACTILE",
    ("divyangjan facilities", "travel concession"): "DIV_CONCESSION",
    ("divyangjan facilities", "wheel chair/battery operated car/divyang sahayak (on payment, feasible)"): "DIV_WHEELCHAIR",

    ("electrical equipment", "air conditioner"): "ELEC_AC",
    ("electrical equipment", "charging points"): "ELEC_CHARGING",
    ("electrical equipment", "fans"): "ELEC_FAN",
    ("electrical equipment", "lights"): "ELEC_LIGHT",
    ("electrical equipment", "others"): "ELEC_OTHER",
    ("electrical equipment", "display / coach indicator board"): "ELEC_DISPLAY",
    ("electrical equipment", "fans / lights"): "ELEC_FAN_LIGHT",
    ("electrical equipment", "lifts / escalators"): "ELEC_LIFT",

    ("facilities for women with special needs", "baby food"): "FAC_BABY_FOOD",
    ("facilities for women with special needs", "others"): "FAC_OTHER",
    ("facilities for women with special needs", "segregated area for lactating mothers in waiting hall"): "FAC_SEGREGATED_AREA",

    ("goods", "booking"): "GOODS_BOOKING",
    ("goods", "delivery"): "GOODS_DELIVERY",
    ("goods", "demurrage / wharfage"): "GOODS_DEMURRAGE",
    ("goods", "freight facilitation"): "GOODS_FREIGHT",
    ("goods", "others"): "GOODS_OTHER",
    ("goods", "overcharging"): "GOODS_OVERCHARGE",
    ("goods", "staff not available"): "GOODS_NO_STAFF",
    ("goods", "touts"): "GOODS_TOUT",

    ("luggage / parcels", "booking"): "LUG_BOOKING",
    ("luggage / parcels", "delivery"): "LUG_DELIVERY",
    ("luggage / parcels", "others"): "LUG_OTHER",
    ("luggage / parcels", "overcharging"): "LUG_OVERCHARGE",
    ("luggage / parcels", "parcel facilitation"): "LUG_PARCEL",
    ("luggage / parcels", "staff not available"): "LUG_NO_STAFF",
    ("luggage / parcels", "touts"): "LUG_TOUT",

    ("medical assistance", "medical assistance"): "MED_ASSISTANCE",
    ("miscellaneous", "miscellaneous"): "MISC",

    ("passenger amenities", "139"): "PASS_139",
    ("passenger amenities", "benches/sheds"): "PASS_BENCH_SHED",
    ("passenger amenities", "enquiry office/inadequate counter"): "PASS_ENQUIRY",
    ("passenger amenities", "foot over/under bridge"): "PASS_FOOT_BRIDGE",
    ("passenger amenities", "others"): "PASS_OTHER",
    ("passenger amenities", "pa (public announcement) system"): "PASS_ANNOUNCEMENT",
    ("passenger amenities", "parking"): "PASS_PARKING",
    ("passenger amenities", "wi-fi"): "PASS_WIFI",

    ("punctuality", "late running"): "PUNC_LATE",
    ("punctuality", "ntes app"): "PUNC_NTES",
    ("punctuality", "others"): "PUNC_OTHER",

    ("refund of tickets", "counter ticket"): "REFUND_COUNTER",
    ("refund of tickets", "online ticket"): "REFUND_ONLINE",
    ("refund of tickets", "others"): "REFUND_OTHER",

    ("reserved ticketing", "e-ticketing"): "RES_E_TICKET",
    ("reserved ticketing", "inadequate counters"): "RES_COUNTER",
    ("reserved ticketing", "others"): "RES_OTHER",
    ("reserved ticketing", "overcharging"): "RES_OVERCHARGE",
    ("reserved ticketing", "tatkal"): "RES_TATKAL",
    ("reserved ticketing", "touts"): "RES_TOUT",

    ("security", "dacoity/robbery/murder/riots"): "SEC_ROBBERY",
    ("security", "eve-teasing"): "SEC_EVE_TEASING",
    ("security", "eveteasing/misbehaviour with lady passengers/rape"): "SEC_EVE_MISBEHAV",
    ("security", "harassment/extortion by security personnel/railway personnel"): "SEC_HARASS",
    ("security", "luggage left behind/unclaimed/suspected articles"): "SEC_LUGGAGE_LEFT",
    ("security", "misbehaviour"): "SEC_MISBEHAV",
    ("security", "misbehaviour with lady passenger"): "SEC_MISBEHAV_LADY",
    ("security", "misbehaviour with lady passengers"): "SEC_MISBEHAV_LADY_2",
    ("security", "nuisance by hawkers/beggar/eunuch"): "SEC_HAWKER",
    ("security", "nuisance by passenger"): "SEC_PASSENGER_NUISANCE",
    ("security", "others"): "SEC_OTHER",
    ("security", "passenger missing/not responding call"): "SEC_PASS_MISSING",
    ("security", "passenger fallen down"): "SEC_PASS_FALL",
    ("security", "quarrelling/hooliganism"): "SEC_HOOLIGAN",
    ("security", "rape"): "SEC_RAPE",
    ("security", "smoking/drinking alcohol/narcotics"): "SEC_SMOKING_DRINKING",
    ("security", "theft of passengers belongings/snatching"): "SEC_THEFT",
    ("security", "unauthorized person in ladies/disabled coach/slr/reserve coach"): "SEC_UNAUTHORIZED",

    ("staff behaviour", "staff behaviour"): "STAFF_BEHAV",

    ("unreserved ticketing", "atvm"): "UNRES_ATVM",
    ("unreserved ticketing", "inadequate counters"): "UNRES_COUNTER",
    ("unreserved ticketing", "mst"): "UNRES_MST",
    ("unreserved ticketing", "others"): "UNRES_OTHER",
    ("unreserved ticketing", "overcharging"): "UNRES_OVERCHARGE",
    ("unreserved ticketing", "uts app login issue"): "UNRES_APP_LOGIN",
    ("unreserved ticketing", "uts app mobile handset change"): "UNRES_APP_MOBILE",
    ("unreserved ticketing", "uts rwallet"): "UNRES_R_WALLET",
    ("unreserved ticketing", "uts/atvm - digital payment"): "UNRES_DIGITAL_PAY",

    ("water availability", "others"): "WATER_OTHER",
    ("water availability", "packaged drinking water / rail neer"): "WATER_PACKAGED",
    ("water availability", "toilet"): "WATER_TOILET",
    ("water availability", "washbasin"): "WATER_WASHBASIN",
    ("water availability", "drinking water at platform"): "WATER_PLATFORM",
    ("water availability", "retiring room / waiting room"): "WATER_RETIRING_ROOM",
    ("water availability", "water vending machines"): "WATER_VENDING",
}

import os
import csv
import re
from datetime import datetime, date, time
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from .database import Base, engine, SessionLocal
STATIONS_DATA = [
    ('NDLS', 'NEW DELHI', 28.642314, 77.22000399999999, 16, 'Delhi', 'NR'),
    ('NGP', 'NAGPUR', 21.153567, 79.089004, 8, 'Nagpur', 'CR'),
    ('LKO', 'LUCKNOW', 26.830675, 80.925291, 9, 'Lucknow NER', 'NER'),
    ('CNB', 'KANPUR CENTRAL', 26.454240000000002, 80.350966, 10, 'Lucknow NR', 'NR'),
    ('ET', 'ITARSI JN', 22.608258, 77.767128, 8, 'Bhopal', 'WCR'),
    ('BZA', 'VIJAYAWADA JN', 16.518262, 80.61864800000001, 10, 'Vijayawada', 'SCR'),
    ('BPL', 'BHOPAL JN', 23.266884384300003, 77.4131428577, 6, 'Bhopal', 'WCR'),
    ('KYN', 'KALYAN JN', 19.234716000000002, 73.12974, 7, 'Mumbai CSMT', 'CR'),
    ('NZM', 'DELHI H NIZAMUDDIN', 28.587329999999998, 77.254249, 9, 'Delhi', 'NR'),
    ('JBP', 'JABALPUR', 23.164636, 79.950919, 6, 'Jabalpur', 'WCR'),
    ('TATA', 'TATANAGAR JN', 22.768954, 86.20056000000001, 6, 'Chakradharpur', 'SER'),
    ('BSL', 'BHUSAVAL JN', 21.0472812, 75.78867170000001, 8, 'Bhusawal', 'CR'),
    ('ANVT', 'ANAND VIHAR TRM', 28.650503565399998, 77.31521255, 7, 'Delhi', 'NR'),
    ('BSB', 'VARANASI JN', 25.327281, 82.986468, 8, 'Varanasi', 'NER'),
    ('MB', 'MORADABAD', 28.831621000000002, 78.765801, 8, 'Moradabad', 'NR'),
    ('SC', 'SECUNDERABAD JN', 17.433146999999998, 78.50148100000001, 10, 'Secunderabad', 'SCR'),
    ('UMB', 'AMBALA CANT JN', 30.338918, 76.826966, 7, 'Ambala', 'NR'),
    ('ST', 'SURAT', 21.206568, 72.840793, 8, 'Bhavnagar', 'WR'),
    ('PNBE', 'PATNA JN', 25.60256, 85.136824, 10, 'Danapur', 'ECR'),
    ('PUNE', 'PUNE JN', 18.529378, 73.873086, 6, 'Pune', 'CR'),
    ('BPQ', 'BALHARSHAH', 19.8490173, 79.3485858, 8, 'Nagpur', 'CR'),
    ('HWH', 'HOWRAH JN', 22.584077999999998, 88.34099900000001, 23, 'Howrah', 'ER'),
    ('MFP', 'MUZAFFARPUR JN', 26.122311, 85.378006, 8, 'Sonpur', 'ECR'),
    ('MMR', 'MANMAD JN', 20.249887, 74.438305, 8, 'Bhusawal', 'CR'),
    ('MTJ', 'MATHURA JN', 27.480145, 77.67311699999999, 8, 'Agra', 'NCR'),
    ('BBS', 'BHUBANESWAR', 20.265388, 85.84259499999999, 8, 'Khurda Road', 'ECoR'),
    ('BRC', 'VADODARA JN', 22.310756, 73.181065, 7, 'Vadodara', 'WR'),
    ('LDH', 'LUDHIANA JN', 30.912367, 75.84787299999999, 7, 'Ambala', 'NR'),
    ('CPR', 'CHHAPRA', 25.788320000000002, 84.725004, 8, 'Danapur', 'ECR'),
    ('GWL', 'GWALIOR JN', 26.216483, 78.18229199999999, 8, 'Jhansi', 'NCR'),
    ('KZJ', 'KAZIPET JN', 17.974211, 79.511025, 8, 'Secunderabad', 'SCR'),
    ('SBC', 'BANGALORE CITY JN', 12.977595, 77.56808299999999, 10, 'Bengaluru', 'SWR'),
    ('YPR', 'YESVANTPUR JN', 13.022839000000001, 77.55117399999999, 8, 'Bengaluru', 'SWR'),
    ('BE', 'BAREILLY', 28.337154299999998, 79.4108444, 8, 'Izzatnagar', 'NER'),
    ('TDL', 'TUNDLA JN', 27.207747, 78.233285, 8, 'Agra', 'NCR'),
    ('AGC', 'AGRA CANTT', 27.157992, 77.990153, 8, 'Agra', 'NCR'),
    ('RU', 'RENIGUNTA JN', 13.636261, 79.50628999999999, 8, 'Chennai', 'SR'),
    ('G', 'GONDIA JN', 21.462435, 80.190842, 8, 'Nagpur SECR', 'SECR'),
    ('GDR', 'GUDUR JN', 14.148227, 79.845121, 8, 'Chennai', 'SR'),
    ('GKP', 'GORAKHPUR JN', 26.759311, 83.381499, 9, 'Varanasi', 'NER'),
    ('GZB', 'GHAZIABAD', 28.649702, 77.431099, 8, 'Delhi', 'NR'),
    ('STA', 'SATNA', 24.568619, 80.827717, 8, 'Jabalpur', 'WCR'),
    ('BST', 'BASTI', 26.815678, 82.77005899999999, 8, 'Varanasi', 'NER'),
    ('ADI', 'AHMEDABAD JN', 23.025515, 72.601516, 12, 'Ahmedabad', 'WR'),
    ('JP', 'JAIPUR', 26.920203, 75.786923, 7, 'Jaipur', 'NWR'),
    ('PPI', 'PIPARIYA', 22.753941, 78.354538, 8, 'Bhopal', 'WCR'),
    ('RJY', 'RAJAMUNDRY', 16.984159000000002, 81.783901, 8, 'Vijayawada', 'SCR'),
    ('BVI', 'BORIVALI', 19.228739, 72.85641199999999, 8, 'Mumbai Central', 'WR'),
    ('CTC', 'CUTTACK', 20.466587999999998, 85.90156, 8, 'Khurda Road', 'ECoR'),
    ('NLR', 'NELLORE', 14.460592, 79.989383, 8, 'Chennai', 'SR'),
    ('DNR', 'DANAPUR', 25.581921, 85.044629, 6, 'Danapur', 'ECR'),
    ('WL', 'WARANGAL', 17.972477, 79.604929, 6, 'Secunderabad', 'SCR'),
    ('KNE', 'KISHANGANJ', 26.097746, 87.949657, 6, 'Katihar', 'NFR'),
    ('BSR', 'VASAI ROAD', 19.3824486, 72.8322217, 6, 'Mumbai Central', 'WR'),
    ('MAS', 'CHENNAI CENTRAL', 13.0847613, 80.27485630000001, 17, 'Chennai', 'SR'),
    ('VSKP', 'VISHAKAPATNAM', 17.72159, 83.289514, 6, 'Waltair', 'ECoR'),
    ('ARA', 'ARA', 25.548889, 84.66259600000001, 6, 'Danapur', 'ECR'),
    ('SPN', 'SHAHJEHANPUR', 27.894224, 79.904605, 6, 'Izzatnagar', 'NER'),
    ('KNW', 'KHANDWA', 21.823596, 76.353227, 6, 'Bhusawal', 'CR'),
    ('OGL', 'ONGOLE', 15.498064000000001, 80.057404, 6, 'Guntur', 'SCR'),
    ('NK', 'NASIK ROAD', 19.947627, 73.841897, 6, 'Mumbai CSMT', 'CR'),
    ('KPD', 'KATPADI JN', 12.972734, 79.13534100000001, 6, 'Chennai', 'SR'),
    ('BSP', 'BILASPUR JN', 22.057473, 82.167585, 6, 'Bilaspur', 'SECR'),
    ('BJU', 'BARAUNI JN', 25.461768000000003, 85.988748, 6, 'Samastipur', 'ECR'),
    ('ALJN', 'ALIGARH JN', 27.889584, 78.074559, 6, 'Agra', 'NCR'),
    ('KOTA', 'KOTA JN', 25.223553, 75.8805, 6, 'Kota', 'WCR'),
    ('JL', 'JALGAON JN', 21.018114999999998, 75.56287499999999, 6, 'Bhusawal', 'CR'),
    ('HRI', 'HARDOI', 27.399414, 80.147877, 6, 'Lucknow NR', 'NR'),
    ('BXR', 'BUXAR', 25.562067, 83.982184, 6, 'Pt Deen Dayal Upadhyaya', 'ECR'),
    ('ETW', 'ETAWAH', 26.785970000000002, 79.021502, 6, 'Agra', 'NCR'),
    ('SPJ', 'SAMASTIPUR JN', 25.858304, 85.78736, 6, 'Samastipur', 'ECR'),
    ('KIR', 'KATIHAR JN', 25.548947, 87.566409, 6, 'Katihar', 'NFR'),
    ('KGP', 'KHARAGPUR JN', 22.341431999999998, 87.32845599999999, 12, 'Kharagpur', 'SER'),
    ('ON', 'UNNAO JN', 26.548354, 80.486199, 6, 'Lucknow NR', 'NR'),
    ('SRE', 'SAHARANPUR', 29.960529, 77.54173899999999, 6, 'Ambala', 'NR'),
    ('BH', 'BHARUCH JN', 21.706907, 72.997689, 6, 'Vadodara', 'WR'),
    ('SRC', 'SANTRAGACHI JN', 22.58393, 88.284011, 6, 'Howrah', 'ER'),
    ('VZM', 'VIZIANAGRAM JN', 18.111374, 83.39558600000001, 6, 'Waltair', 'ECoR'),
    ('PER', 'PERAMBUR', 13.10702, 80.24453299999999, 6, 'Chennai', 'SR'),
    ('DEOS', 'DEORIA SADAR', 26.5076811676, 83.7819590961, 6, 'Pt Deen Dayal Upadhyaya', 'ECR'),
    ('BKP', 'BAKHTIYARPUR JN', 25.456110000000002, 85.52956400000001, 6, 'Sonpur', 'ECR'),
    ('KUR', 'KHURDA ROAD JN', 20.153076, 85.70823399999999, 6, 'Khurda Road', 'ECoR'),
    ('BINA', 'BINA JN', 24.170973500000002, 78.1831998, 6, 'Bhopal', 'WCR'),
    ('KCG', 'KACHEGUDA', 17.389561, 78.499756, 6, 'Hyderabad', 'SCR'),
    ('BAM', 'BRAHMAPUR', 19.2961348, 84.7966912, 6, 'Khurda Road', 'ECoR'),
    ('PNVL', 'PANVEL', 18.990918999999998, 73.121756, 6, 'Mumbai CSMT', 'CR'),
    ('ANND', 'ANAND JN', 22.561307, 72.965733, 6, 'Vadodara', 'WR'),
    ('MKP', 'MANIKPUR JN', 25.063492, 81.09365700000001, 6, 'Prayagraj', 'NCR'),
    ('PNP', 'PANIPAT JN', 29.388948, 76.96379300000001, 6, 'Delhi', 'NR'),
    ('JSG', 'JHARSUGUDA JN', 21.862274, 84.017427, 6, 'Sambalpur', 'ECoR'),
    ('ANG', 'AHMADNAGAR', 19.075519477700002, 74.721882467, 6, 'Pune', 'CR'),
    ('MZP', 'MIRZAPUR', 25.13435, 82.56986900000001, 6, 'Varanasi', 'NER'),
    ('R', 'RAIPUR JN', 21.256462000000003, 81.629328, 6, 'Raipur', 'SECR'),
    ('KMT', 'KHAMMAM', 17.249347, 80.138491, 6, 'Vijayawada', 'SCR'),
    ('ASN', 'ASANSOL JN', 23.691441, 86.975152, 6, 'Asansol', 'ER'),
    ('RTM', 'RATLAM JN', 23.34038, 75.050826, 6, 'Ratlam', 'WR'),
    ('TNA', 'THANE', 19.185757000000002, 72.97541700000001, 6, 'Mumbai CSMT', 'CR'),
    ('PND', 'PENDRA ROAD', 22.755824999999998, 81.89917, 6, 'Bilaspur', 'SECR'),
    ('SUR', 'SOLAPUR JN', 17.664496, 75.893401, 8, 'Solapur', 'CR'),
    ('SLO', 'SAMALKOT JN', 17.044827, 82.168724, 6, 'Waltair', 'ECoR'),
    ('KTE', 'KATNI', 23.833385, 80.400543, 6, 'Jabalpur', 'WCR'),
    ('LAR', 'LALITPUR', 24.688222, 78.395791, 6, 'Jhansi', 'NCR'),
    ('DLI', 'OLD DELHI', 28.661815999999998, 77.228356, 16, 'Delhi', 'NR'),
    ('VAPI', 'VAPI', 20.374337999999998, 72.90912700000001, 6, 'Mumbai Central', 'WR'),
    ('UJN', 'UJJAIN JN', 23.178154, 75.781403, 6, 'Ratlam', 'WR'),
    ('GD', 'GONDA JN', 27.154613, 81.97815200000001, 6, 'Lucknow NER', 'NER'),
    ('DO', 'DAUSA', 26.900046999999997, 76.330336, 6, 'Jaipur', 'NWR'),
    ('GTL', 'GUNTAKAL JN', 15.17556, 77.36661099999999, 6, 'Guntakal', 'SCR'),
    ('RE', 'REWARI', 28.202779000000003, 76.609414, 6, 'Jaipur', 'NWR'),
    ('RN', 'RATNAGIRI', 17.002793, 73.356938, 6, 'Ratnagiri', 'KR'),
    ('ASH', 'AISHBAGH', 26.8373880081, 80.90960679930001, 6, 'Lucknow NR', 'NR'),
    ('NJP', 'NEW JALPAIGURI', 26.683025, 88.443391, 6, 'Alipurduar', 'NFR'),
    ('JPE', 'JALPAIGURI ROAD', 26.559016999999997, 88.70945300000001, 6, 'Alipurduar', 'NFR'),
    ('SWM', 'SAWAI MADHOPUR', 26.018279, 76.35622, 6, 'Kota', 'WCR'),
    ('JAT', 'JAMMU TAWI', 32.706975, 74.880117, 6, 'Firozpur', 'NR'),
    ('SEGM', 'SEVAGRAM', 20.739076, 78.619225, 6, 'Nagpur', 'CR'),
    ('NNA', 'NAUGACHIA', 25.385261, 87.09387, 6, 'Katihar', 'NFR'),
    ('GAYA', 'GAYA JN', 24.803978, 84.999294, 6, 'Danapur', 'ECR'),
    ('SA', 'SALEM JN', 11.671726000000001, 78.113415, 6, 'Salem', 'SR'),
    ('SGO', 'SAUGOR', 23.84735, 78.74292, 6, 'Jabalpur', 'WCR'),
    ('FTP', 'FATEHPUR', 25.917489, 80.801869, 6, 'Lucknow NR', 'NR'),
    ('PPTA', 'PATLIPUTRA', 25.621426, 85.068505, 6, 'Danapur', 'ECR'),
    ('HJP', 'HAJIPUR JN', 25.702909000000002, 85.2155, 6, 'Sonpur', 'ECR'),
    ('RDM', 'RAMGUNDAM', 18.763329, 79.43509999999999, 6, 'Secunderabad', 'SCR'),
    ('BOR', 'BOISAR', 19.7985273, 72.76189900000001, 6, 'Mumbai Central', 'WR'),
    ('PURI', 'PURI', 19.811459000000003, 85.839992, 6, 'Khurda Road', 'ECoR'),
    ('BBK', 'BARABANKI JN', 26.935335, 81.18104, 6, 'Lucknow NER', 'NER'),
    ('TUP', 'TIRUPPUR', 11.108906, 77.341247, 6, 'Palakkad', 'SR'),
    ('LNL', 'LONAVALA', 18.748883, 73.407657, 6, 'Pune', 'CR'),
    ('KYQ', 'KAMAKHYA', 26.156154, 91.689505, 6, 'Rangiya', 'NFR'),
    ('DHN', 'DHANBAD JN', 23.790966, 86.428956, 6, 'Dhanbad', 'ECR'),
    ('JJKR', 'JAJPUR KEONJHAR ROAD', 20.943544, 86.132518, 6, 'Khurda Road', 'ECoR'),
    ('MLDT', 'MALDA TOWN', 25.015659, 88.130338, 6, 'Malda', 'ER'),
    ('DR', 'MUMBAI DADAR CENTRAL', 19.017179, 72.842972, 6, 'Mumbai CSMT', 'CR'),
    ('DWX', 'DEWAS', 22.977556, 76.051191, 6, 'Ratlam', 'WR'),
    ('UBL', 'HUBLI JN', 15.350302000000001, 75.148104, 6, 'Hubballi', 'SWR'),
    ('JRC', 'JALANDHAR CANT', 31.306235, 75.63210600000001, 6, 'Firozpur', 'NR'),
    ('DEE', 'DELHI SARAI ROHILLA', 28.662992, 77.187106, 6, 'Delhi', 'NR'),
    ('KIUL', 'KIUL JN', 25.171504, 86.106198, 6, 'Samastipur', 'ECR'),
    ('TPTY', 'TIRUPATI MAIN', 13.62763, 79.418968, 6, 'Chennai', 'SR'),
    ('GHY', 'GUWAHATI', 26.182635, 91.751851, 6, 'Rangiya', 'NFR'),
    ('YNK', 'YELHANKA JN', 13.102795, 77.593069, 6, 'Bengaluru', 'SWR'),
    ('BDTS', 'MUMBAI BANDRA TERMINUS', 19.061911, 72.840535, 7, 'Mumbai Central', 'WR'),
    ('SHG', 'SHAHGANJ JN', 26.061399, 82.679662, 6, 'Varanasi', 'NER'),
    ('NCB', 'NEW COOCH BEHAR', 26.353158999999998, 89.469766, 6, 'Alipurduar', 'NFR'),
    ('SHM', 'KOLKATA SHALIMAR', 22.555508, 88.315615, 6, 'Kharagpur', 'SER'),
    ('JTJ', 'JOLARPETTAI', 12.560851999999999, 78.57781999999999, 6, 'Salem', 'SR'),
    ('ND', 'NADIAD JN', 22.694105999999998, 72.855718, 6, 'Ahmedabad', 'WR'),
    ('VG', 'VIRAMGAM JN', 23.129098, 72.052968, 6, 'Ahmedabad', 'WR'),
    ('KQR', 'KODERMA', 24.434741000000002, 85.52945799999999, 6, 'Dhanbad', 'ECR'),
    ('NDB', 'NANDURBAR', 21.374812, 74.246482, 4, 'Vadodara', 'WR'),
    ('PNC', 'PATNA SAHEB', 25.585856, 85.230942, 4, 'Sonpur', 'ECR'),
    ('SBP', 'SAMBALPUR', 21.4830514376, 83.9603252667, 4, 'Sambalpur', 'ECoR'),
    ('FUT', 'FATWA', 25.50144, 85.305488, 4, 'Sonpur', 'ECR'),
    ('RIG', 'RAIGARH', 21.891288999999997, 83.39067, 4, 'Sambalpur', 'ECoR'),
    ('JAJ', 'JHAJHA', 24.779456, 86.399854, 4, 'Dhanbad', 'ECR'),
    ('ED', 'ERODE JN', 11.327682, 77.72593400000001, 4, 'Salem', 'SR'),
    ('EE', 'ELURU', 16.717816, 81.11976200000001, 4, 'Vijayawada', 'SCR'),
    ('NAD', 'NAGDA JN', 23.45592, 75.41249099999999, 4, 'Ratlam', 'WR'),
    ('MBNR', 'MAHBUBNAGAR', 16.757768, 77.999429, 4, 'Hyderabad', 'SCR'),
    ('AII', 'AJMER JN', 26.456612, 74.63746400000001, 4, 'Ajmer', 'NWR'),
    ('BHP', 'BOLPUR SHANTINIKETAN', 23.657804000000002, 87.698136, 4, 'Asansol', 'ER'),
    ('HUP', 'HINDUPUR', 13.819144000000001, 77.500362, 4, 'Bengaluru', 'SWR'),
    ('KGG', 'KHAGARIA JN', 25.505891, 86.46525100000001, 4, 'Samastipur', 'ECR'),
    ('DVD', 'DUVVADA', 17.703843, 83.152059, 4, 'Waltair', 'ECoR'),
    ('PNU', 'PALANPUR JN', 24.174433, 72.430172, 4, 'Ahmedabad', 'WR'),
    ('MJF', 'MALKAJGIRI', 17.448392000000002, 78.529606, 4, 'Secunderabad', 'SCR'),
    ('NLDA', 'NALGONDA', 17.06118, 79.283436, 4, 'Hyderabad', 'SCR'),
    ('MYR', 'MAIHAR', 24.255485, 80.763148, 4, 'Jabalpur', 'WCR'),
    ('BBU', 'BHABUA ROAD', 25.173007, 83.618913, 4, 'Pt Deen Dayal Upadhyaya', 'ECR'),
    ('MURI', 'MURI', 23.376284371, 85.8669906885, 4, 'Ranchi', 'SER'),
    ('DURG', 'DURG', 21.200326999999998, 81.291837, 4, 'Raipur', 'SECR'),
    ('BTE', 'BHARATPUR JN', 27.237106999999998, 77.488613, 4, 'Agra', 'NCR'),
    ('BHS', 'VIDISHA', 23.5222886, 77.8148356, 4, 'Bhopal', 'WCR'),
    ('ADH', 'ANDHERI', 19.1174289, 72.84685300000001, 4, 'Mumbai Central', 'WR'),
    ('HBJ', 'HABIBGANJ', 23.221979, 77.43942899999999, 4, 'Bhopal', 'WCR'),
    ('SDAH', 'KOLKATA SEALDAH', 22.566758, 88.374713, 21, 'Sealdah', 'ER'),
    ('FZD', 'FIROZABAD', 27.147415, 78.386691, 4, 'Agra', 'NCR'),
    ('BWN', 'BARDDHAMAN JN', 23.249718, 87.87028099999999, 4, 'Howrah', 'ER'),
    ('INDB', 'INDORE JN BG', 22.71757, 75.868429, 4, 'Ratlam', 'WR'),
    ('GOY', 'GOVINDPURI', 26.454423, 80.313203, 4, 'Lucknow NR', 'NR'),
    ('KWV', 'KURDUVADI', 18.091348, 75.41711799999999, 4, 'Solapur', 'CR'),
    ('MKA', 'MOKAMEH JN', 25.391885, 85.91304899999999, 4, 'Samastipur', 'ECR'),
    ('AWR', 'ALWAR', 27.559273, 76.62126500000001, 4, 'Jaipur', 'NWR'),
    ('SSM', 'SASARAM', 24.955926, 84.019423, 4, 'Pt Deen Dayal Upadhyaya', 'ECR'),
    ('ROU', 'ROURKELA', 22.22844, 84.86313200000001, 4, 'Chakradharpur', 'SER'),
    ('TDU', 'TANDUR', 17.25044, 77.585037, 4, 'Hyderabad', 'SCR'),
    ('FDB', 'FARIDABAD', 28.411473, 77.30734799999999, 4, 'Delhi', 'NR'),
    ('GADJ', 'GANDHINAGAR JAIPUR', 26.873067000000002, 75.79827999999999, 4, 'Jaipur', 'NWR'),
    ('VR', 'VIRAR', 19.454407, 72.811737, 4, 'Mumbai Central', 'WR'),
    ('HTE', 'HATIA', 23.311612999999998, 85.308218, 4, 'Ranchi', 'SER'),
    ('SKZR', 'SIRPUR KAGAZNAGAR', 19.345659, 79.489201, 4, 'Nagpur', 'CR'),
    ('KPN', 'KUPPAM', 12.746834, 78.339549, 4, 'Bengaluru', 'SWR'),
    ('KUN', 'KARNAL', 29.694566000000002, 76.969821, 4, 'Ambala', 'NR'),
    ('TDD', 'TADEPALLIGUDEM', 16.809960999999998, 81.526314, 4, 'Vijayawada', 'SCR'),
    ('MAO', 'MADGAON', 15.267911000000002, 73.97072399999999, 4, 'Karwar', 'KR'),
    ('BWT', 'BANGARAPET', 12.984808, 78.178188, 4, 'Bengaluru', 'SWR'),
    ('CSN', 'CHALISGAON JN', 20.464109, 74.999049, 4, 'Bhusawal', 'CR'),
    ('TRL', 'TIRUVALLUR', 13.115764, 79.913105, 4, 'Chennai', 'SR'),
    ('RMU', 'RAMPUR', 28.778862999999998, 79.023419, 4, 'Moradabad', 'NR'),
    ('RNC', 'RANCHI', 23.348811, 85.33352, 4, 'Ranchi', 'SER'),
    ('TK', 'TUMKUR', 13.333033, 77.10243899999999, 4, 'Bengaluru', 'SWR'),
    ('BOE', 'BARSOI JN', 25.651242200000002, 87.9229421, 4, 'Katihar', 'NFR'),
    ('AWB', 'AURANGABAD', 19.859276, 75.31064599999999, 4, 'Nanded', 'SCR'),
    ('AJJ', 'ARAKKONAM', 13.081512, 79.667991, 4, 'Chennai', 'SR'),
    ('MKC', 'MAKSI', 23.251625, 76.159116, 4, 'Ratlam', 'WR'),
    ('SLN', 'SULTANPUR', 26.263027, 82.066106, 4, 'Prayagraj', 'NCR'),
    ('BLM', 'BALAMU JN', 27.167362999999998, 80.352497, 4, 'Lucknow NR', 'NR'),
    ('TVC', 'TRIVANDRUM CENTRAL', 8.486679, 76.95120999999999, 4, 'Trivandrum', 'SR'),
    ('GTJT', 'GETOR JAGATPURA', 26.836925, 75.832384, 4, 'Jaipur', 'NWR'),
    ('SV', 'SIWAN JN', 26.210724000000003, 84.359267, 4, 'Danapur', 'ECR'),
    ('BTA', 'BIHTA', 25.560948600000003, 84.8740874, 4, 'Danapur', 'ECR'),
    ('QLN', 'KOLLAM JN', 8.886586000000001, 76.59675299999999, 4, 'Trivandrum', 'SR'),
    ('BZU', 'BETUL', 21.896393, 77.90589700000001, 4, 'Nagpur', 'CR'),
    ('WR', 'WARDHA JN', 20.732777, 78.594157, 4, 'Nagpur', 'CR'),
    ('GGN', 'GURGAON', 28.489165, 77.010739, 4, 'Delhi', 'NR'),
    ('KPG', 'KOPARGAON', 19.902943, 74.503328, 4, 'Pune', 'CR'),
    ('RJN', 'RAJ NANDGAON', 21.101186000000002, 81.039019, 4, 'Raipur', 'SECR'),
    ('PTKC', 'PATHANKOT CANTT', 32.2593, 75.636044, 4, 'Firozpur', 'NR'),
    ('GBD', 'GAURIBIDANUR', 13.613081000000001, 77.512781, 4, 'Bengaluru', 'SWR'),
    ('CHE', 'SRIKAKULAM ROAD', 18.408679, 83.903771, 4, 'Waltair', 'ECoR'),
    ('RJPB', 'RAJENDRA NAGAR BIHAR', 25.603351, 85.162449, 4, 'Sonpur', 'ECR'),
    ('AY', 'AYODHYA', 26.787784, 82.200604, 4, 'Lucknow NER', 'NER'),
    ('BLS', 'BALASORE', 21.500521, 86.91958199999999, 4, 'Kharagpur', 'SER'),
    ('MDP', 'MADHUPUR JN', 24.270633, 86.642183, 4, 'Dhanbad', 'ECR'),
    ('BKSC', 'BOKARO STEEL CITY', 23.656551, 86.08501600000001, 4, 'Dhanbad', 'ECR'),
    ('MRGA', 'MIRYALAGUDA', 16.860392, 79.533503, 4, 'Guntur', 'SCR'),
    ('PBN', 'PARBHANI JN', 19.257460000000002, 76.774119, 4, 'Nanded', 'SCR'),
    ('JUC', 'JALANDHAR CITY', 31.331665, 75.591499, 4, 'Firozpur', 'NR'),
    ('ATP', 'ANANTAPUR', 14.686478, 77.59531199999999, 4, 'Guntakal', 'SCR'),
    ('BYT', 'BHATAPARA', 21.732464, 81.946062, 4, 'Bilaspur', 'SECR'),
    ('GYN', 'GYANPUR ROAD', 25.280144010999997, 82.4272883557, 4, 'Varanasi', 'NER'),
    ('BAZ', 'BARAN', 25.0967701, 76.50512839999999, 4, 'Kota', 'WCR'),
    ('KSG', 'KISHANGARH', 26.588968, 74.855553, 4, 'Ajmer', 'NWR'),
    ('TLD', 'TILDA', 21.550734, 81.794586, 4, 'Raipur', 'SECR'),
    ('JSME', 'JASIDIH JN', 24.514517, 86.644255, 4, 'Dhanbad', 'ECR'),
    ('BGS', 'BEGU SARAI', 25.425296, 86.134476, 4, 'Samastipur', 'ECR'),
    ('AK', 'AKOLA JN', 20.723084, 77.005497, 4, 'Bhusawal', 'CR'),
    ('CD', 'CHANDRAPUR', 19.960126000000002, 79.300505, 4, 'Nagpur', 'CR'),
    ('CKP', 'CHAKRADHARPUR', 22.678979, 85.62777100000001, 4, 'Chakradharpur', 'SER'),
    ('BAP', 'BELAPUR', 19.619569311800003, 74.6617443079, 4, 'Pune', 'CR'),
    ('NU', 'NARSINGHPUR', 22.943112, 79.214385, 4, 'Jabalpur', 'WCR'),
    ('BALU', 'BALUGAON', 19.747366, 85.200953, 4, 'Khurda Road', 'ECoR'),
    ('BRD', 'BHANDARA ROAD', 21.238512, 79.64752299999999, 4, 'Nagpur SECR', 'SECR'),
    ('RNY', 'RANGIYA JN', 26.447900999999998, 91.605929, 4, 'Rangiya', 'NFR'),
    ('ERS', 'ERNAKULAM JN', 9.969541999999999, 76.290672, 4, 'Palakkad', 'SR'),
    ('TEL', 'TENALI JN', 16.242409000000002, 80.640413, 4, 'Guntur', 'SCR'),
    ('JNU', 'JAUNPUR JN', 25.762849, 82.69969599999999, 4, 'Lucknow NR', 'NR'),
    ('LRJ', 'LAKSAR JN', 29.754037999999998, 78.019628, 4, 'Moradabad', 'NR'),
    ('DMM', 'DHARMAVARAM JN', 14.424368999999999, 77.717115, 4, 'Guntakal', 'SCR'),
    ('KMZ', 'KATNI MURWARA', 23.8343563, 80.4014844, 4, 'Jabalpur', 'WCR'),
    ('FL', 'PHULERA JN', 26.872814, 75.24545599999999, 4, 'Jaipur', 'NWR'),
    ('HX', 'CUDDAPAH', 14.451690000000001, 78.829184, 4, 'Guntakal', 'SCR'),
    ('RPH', 'RAMPUR HAT', 24.179797, 87.78214700000001, 4, 'Malda', 'ER'),
    ('MSH', 'MAHESANA JN', 23.602623, 72.388708, 4, 'Ahmedabad', 'WR'),
    ('MS', 'CHENNAI EGMORE', 13.077677999999999, 80.260193, 4, 'Chennai', 'SR'),
    ('NHH', 'NIHALGARH', 26.460131, 81.632581, 4, 'Lucknow NER', 'NER'),
    ('GUNA', 'GUNA', 24.6405, 77.314104, 4, 'Bhopal', 'WCR'),
    ('CPJ', 'KAPTANGANJ JN', 26.926388, 83.69990700000001, 4, 'Varanasi', 'NER'),
    ('BAU', 'BURHANPUR', 21.3343976, 76.1986787, 4, 'Bhusawal', 'CR'),
    ('RC', 'RAICHUR', 16.192441000000002, 77.339165, 4, 'Guntakal', 'SCR'),
    ('KOAA', 'KOLKATA CHITPUR', 22.601174999999998, 88.385179, 4, 'Kolkata Metro', 'METRO'),
    ('AKP', 'ANAKAPALLE', 17.695503, 83.00885099999999, 4, 'Waltair', 'ECoR'),
    ('BER', 'BEAWAR', 26.1089078, 74.3149711, 4, 'Ajmer', 'NWR'),
    ('BL', 'VALSAD', 20.6085595, 72.9335291, 4, 'Bhavnagar', 'WR'),
    ('KSV', 'KOSI KALAN', 27.788551, 77.445999, 4, 'Agra', 'NCR'),
    ('CKTD', 'CHITRAKUTDHAM KARWI', 25.217610999999998, 80.922775, 4, 'Prayagraj', 'NCR'),
    ('GDG', 'GADAG JN', 15.437048, 75.642481, 4, 'Hubballi', 'SWR'),
    ('CHI', 'CHIPLUN', 17.542507399999998, 73.522429, 4, 'Ratnagiri', 'KR'),
    ('SELU', 'SELU', 19.448059999999998, 76.43326400000001, 4, 'Nanded', 'SCR'),
    ('ASR', 'AMRITSAR JN', 31.631511999999997, 74.858025, 6, 'Firozpur', 'NR'),
    ('STP', 'SITAPUR', 27.558728, 80.697762, 4, 'Lucknow NER', 'NER'),
    ('VM', 'VILLUPURAM JN', 11.942971, 79.500101, 4, 'Chennai', 'SR'),
    ('DLN', 'DILDARNAGAR JN', 25.419424, 83.668324, 4, 'Pt Deen Dayal Upadhyaya', 'ECR'),
    ('TCR', 'THRISUR', 10.514790000000001, 76.207919, 4, 'Palakkad', 'SR'),
    ('PPN', 'Punpun', 25.488229642500002, 85.09876768800001, 4, 'Danapur', 'ECR'),
    ('DBG', 'DARBHANGA JN', 26.157088, 85.907575, 4, 'Samastipur', 'ECR'),
    ('ROK', 'ROHTAK JN', 28.890904, 76.57955000000001, 4, 'Delhi', 'NR'),
    ('LPI', 'LINGAMPALLI', 17.482874000000002, 78.31677400000001, 4, 'Secunderabad', 'SCR'),
    ('GDYA', 'GHORADONGRI', 22.126423, 78.001987, 4, 'Bhopal', 'WCR'),
    ('BNC', 'BANGALORE CANT', 12.9936735, 77.59932690000001, 4, 'Bengaluru', 'SWR'),
    ('WFD', 'WHITEFIELD', 12.995253, 77.76130500000001, 4, 'Bengaluru', 'SWR'),
    ('AMLA', 'AMLA JN', 21.919717000000002, 78.123187, 4, 'Nagpur', 'CR'),
    ('HRS', 'HATHRAS JN', 27.62483, 78.13706699999999, 4, 'Agra', 'NCR'),
    ('IDG', 'INDARGARH', 25.727874, 76.232938, 4, 'Kota', 'WCR'),
    ('BHC', 'BHADRAKH', 21.091745799999998, 86.5162305, 4, 'Khurda Road', 'ECoR'),
    ('CRJ', 'CHITTARANJAN', 23.857138000000003, 86.878036, 4, 'Asansol', 'ER'),
    ('GNT', 'GUNTUR JN', 16.300784, 80.44197299999999, 4, 'Guntur', 'SCR'),
    ('PNME', 'PARASNATH', 23.987971, 86.037862, 4, 'Dhanbad', 'ECR'),
    ('MBA', 'MAHOBA', 25.306914, 79.849079, 4, 'Jhansi', 'NCR'),
    ('BMB', 'BAMRA', 22.051355, 84.291044, 4, 'Sambalpur', 'ECoR'),
    ('AN', 'AMALNER', 21.049008999999998, 75.057314, 4, 'Bhusawal', 'CR'),
    ('SGP', 'SOHAGPUR', 22.693813, 78.194338, 4, 'Bhopal', 'WCR'),
    ('JHL', 'JAKHAL JN', 29.8018131127, 75.8245009833, 4, 'Ambala', 'NR'),
    ('DMO', 'DAMOH', 23.836693, 79.432246, 4, 'Jabalpur', 'WCR'),
    ('CHD', 'CHANDIA ROAD', 23.6454399, 80.701436, 4, 'Jabalpur', 'WCR'),
    ('PSA', 'PALASA', 18.756782, 84.42209100000001, 4, 'Waltair', 'ECoR'),
    ('PWL', 'PALWAL', 28.151841, 77.34223200000001, 4, 'Delhi', 'NR'),
    ('GY', 'GOOTY JN', 15.149208, 77.625823, 4, 'Guntakal', 'SCR'),
    ('AWY', 'ALUVA', 10.108163, 76.356508, 4, 'Palakkad', 'SR'),
    ('KRNT', 'KURNOOL TOWN', 15.833715, 78.032655, 4, 'Guntakal', 'SCR'),
    ('HPU', 'HAPUR', 28.739613, 77.77957599999999, 4, 'Delhi', 'NR'),
    ('BEAS', 'BEAS', 31.5193738, 75.2908085, 4, 'Firozpur', 'NR'),
    ('ALLP', 'ALLEPPEY', 9.483759, 76.32247600000001, 4, 'Trivandrum', 'SR'),
    ('ERN', 'ERNAKULAM TOWN', 9.991582000000001, 76.2861, 4, 'Palakkad', 'SR'),
    ('KYE', 'KHURAI', 24.051525, 78.33112799999999, 4, 'Bhopal', 'WCR'),
    ('SJP', 'SHUJALPUR', 23.381235999999998, 76.72347500000001, 4, 'Bhopal', 'WCR'),
    ('HD', 'HARDA', 22.338414, 77.10084, 4, 'Bhopal', 'WCR'),
    ('TBM', 'TAMBARAM', 12.926035689399999, 80.1191573807, 4, 'Chennai', 'SR'),
    ('HW', 'HARIDWAR JN', 29.947787, 78.15489899999999, 6, 'Moradabad', 'NR'),
    ('PC', 'PACHORA JN', 20.668385, 75.34831, 4, 'Bhusawal', 'CR'),
    ('JMP', 'JAMALPUR JN', 25.313906, 86.492285, 4, 'Samastipur', 'ECR'),
    ('SMI', 'SITAMARHI JN', 26.594374000000002, 85.504707, 4, 'Samastipur', 'ECR'),
    ('GDA', 'GODHRA JN', 22.776974, 73.603672, 4, 'Vadodara', 'WR'),
    ('SGG', 'SULTANGANJ', 25.24085, 86.736175, 4, 'Katihar', 'NFR'),
    ('NDD', 'NIDADAVOLU JN', 16.898297, 81.67550399999999, 4, 'Vijayawada', 'SCR'),
    ('GLPT', 'GOALPARA TOWN', 26.126534999999997, 90.62065899999999, 4, 'Rangiya', 'NFR'),
    ('TLY', 'THALASSERY', 11.75314, 75.492987, 4, 'Palakkad', 'SR'),
    ('SCM', 'SIMHACHALAM', 17.744667, 83.220449, 4, 'Waltair', 'ECoR'),
    ('DDR', 'MUMBAI DADAR WEST', 19.019731, 72.84346500000001, 4, 'Mumbai Central', 'WR'),
    ('DSS', 'DALSINGH SARAI', 25.6647486, 85.84146519999999, 4, 'Samastipur', 'ECR'),
    ('UD', 'UDUPI', 13.336341000000001, 74.771733, 4, 'Karwar', 'KR'),
    ('HAN', 'HINDAUN CITY', 26.756164000000002, 77.03168600000001, 4, 'Kota', 'WCR'),
    ('NED', 'HUZUR SAHIB NANDED', 19.160522, 77.31047799999999, 4, 'Nanded', 'SCR'),
    ('BNLW', 'BANSTHALI NIWAI', 26.383927808699998, 75.93511006349999, 4, 'Jaipur', 'NWR'),
    ('JNH', 'JANGHAI JN', 25.549911, 82.310962, 4, 'Prayagraj', 'NCR'),
    ('SKB', 'SHIKOHABAD JN', 27.085686, 78.57495499999999, 4, 'Agra', 'NCR'),
    ('MLMR', 'MELMARUVATTUR', 12.429554, 79.83380100000001, 4, 'Chennai', 'SR'),
    ('GOL', 'GOILKERA', 22.505290000000002, 85.37935200000001, 4, 'Chakradharpur', 'SER'),
    ('NOQ', 'NEW ALIPURDAUR', 26.48572, 89.541398, 4, 'Alipurduar', 'NFR'),
    ('KSNG', 'KESINGA', 20.188102999999998, 83.224709, 4, 'Sambalpur', 'ECoR'),
    ('BGP', 'BHAGALPUR', 25.241909300000003, 86.9767918, 4, 'Katihar', 'NFR'),
    ('DNKL', 'DHENKANAL', 20.676825, 85.59087799999999, 4, 'Khurda Road', 'ECoR'),
    ('RK', 'ROORKEE', 29.851671, 77.87417, 4, 'Ambala', 'NR'),
    ('GP', 'RAJ GANGPUR', 22.186062000000003, 84.58205099999999, 4, 'Sambalpur', 'ECoR'),
    ('HTZ', 'HATHIDAH JN', 25.367027, 85.987826, 4, 'Samastipur', 'ECR'),
    ('DEC', 'DELHI CANTT', 28.613534, 77.116577, 4, 'Delhi', 'NR'),
    ('PRR', 'PURULIA JN', 23.324911, 86.37787, 4, 'Adra', 'SER'),
    ('SBG', 'SAHIBGANJ JN', 25.241391999999998, 87.63457700000001, 4, 'Katihar', 'NFR'),
    ('MRA', 'MORENA', 26.500504, 78.003442, 4, 'Agra', 'NCR'),
    ('DGA', 'DIGHWARA', 25.743938, 85.003168, 4, 'Danapur', 'ECR'),
    ('GGJ', 'GOSHAINGANJ', 26.569524, 82.384123, 4, 'Prayagraj', 'NCR'),
    ('CNI', 'CHANDIL JN', 22.956014, 86.07210900000001, 4, 'Chakradharpur', 'SER'),
    ('SMPR', 'Shri Madhopur', 27.457628, 75.59829400000001, 4, 'Jaipur', 'NWR'),
    ('J', 'JALNA', 19.830781, 75.893142, 4, 'Nanded', 'SCR'),
    ('LMG', 'LUMDING JN', 25.750035999999998, 93.17660000000001, 4, 'Lumding', 'NFR'),
    ('SDL', 'SHAHDOL', 23.285961999999998, 81.36407299999999, 4, 'Jabalpur', 'WCR'),
    ('DD', 'DAUND JN', 18.463547, 74.578622, 4, 'Pune', 'CR'),
    ('KEI', 'KASHI', 25.326563999999998, 83.031939, 4, 'Varanasi', 'NER'),
    ('NZB', 'NIZAMABAD', 18.679164999999998, 78.103238, 4, 'Nanded', 'SCR'),
    ('CDG', 'CHANDIGARH', 30.7019773, 76.82208, 6, 'Ambala', 'NR'),
    ('PAU', 'PURNA JN', 19.180526999999998, 77.024985, 2, 'Nanded', 'SCR'),
    ('BAQ', 'GANJ BASODA', 23.845347, 77.944826, 2, 'Bhopal', 'WCR'),
    ('CAR', 'CHUNAR', 25.103351, 82.874703, 2, 'Varanasi', 'NER'),
    ('SEM', 'SERAM', 17.180683000000002, 77.28353, 2, 'Hyderabad', 'SCR'),
    ('MTD', 'MERTA ROAD JN', 26.728077000000003, 73.917896, 2, 'Ajmer', 'NWR'),
    ('DYD', 'DARYABAD', 26.861303, 81.550114, 2, 'Lucknow NER', 'NER'),
    ('ARJ', 'AUNRIHAR JN', 25.54466, 83.18727200000001, 2, 'Varanasi', 'NER'),
    ('KNN', 'KHANNA', 30.707973, 76.22513400000001, 2, 'Ambala', 'NR'),
    ('KRH', 'KHAIRTHAL', 27.797324415, 76.64170412169999, 2, 'Jaipur', 'NWR'),
    ('RTA', 'RUTHIYAI', 24.531922, 77.175827, 2, 'Bhopal', 'WCR'),
    ('LKR', 'LUCKEESARAI JN', 25.1716617005, 86.093210587, 2, 'Samastipur', 'ECR'),
    ('MEX', 'MUKERIAN', 31.941873, 75.61183799999999, 2, 'Firozpur', 'NR'),
    ('BCH', 'BERCHHA', 23.282480800000002, 76.33419289999999, 2, 'Bhopal', 'WCR'),
    ('MKU', 'MALKAPUR', 20.891974, 76.202946, 2, 'Bhusawal', 'CR'),
    ('AKV', 'ANKLESHWAR JN', 21.623889, 73.000633, 2, 'Vadodara', 'WR'),
    ('BHUJ', 'BHUJ', 23.2660225, 69.6778278, 2, 'Rajkot', 'WR'),
    ('KHS', 'KHARSIA', 21.99178, 83.102414, 2, 'Bilaspur', 'SECR'),
    ('JU', 'JODHPUR JN', 26.283765, 73.02319, 2, 'Jodhpur', 'NWR'),
    ('CRLM', 'Carmelaram', 12.907633, 77.706014, 2, 'Bengaluru', 'SWR'),
    ('NVS', 'NAVSARI', 20.946851, 72.914294, 2, 'Bhavnagar', 'WR'),
    ('SRJ', 'SHANKARGARH', 25.1813005966, 81.6190324237, 2, 'Prayagraj', 'NCR'),
    ('KOJ', 'KOKRAJHAR', 26.405057, 90.274125, 2, 'Alipurduar', 'NFR'),
    ('NBQ', 'NEW BONGAIGAON', 26.4758354405, 90.53684346440001, 2, 'Alipurduar', 'NFR'),
    ('BV', 'BABHNAN', 26.938525000000002, 82.500127, 2, 'Lucknow NER', 'NER'),
    ('AF', 'AGRA FORT', 27.183308, 78.0191, 2, 'Agra', 'NCR'),
    ('SSB', 'SHAKURBASTI', 28.680227328700003, 77.1299115857, 2, 'Delhi', 'NR'),
    ('RKM', 'RAJA KI MANDI', 27.193811, 77.996613, 2, 'Agra', 'NCR'),
    ('BGM', 'BELGAUM', 15.8492433, 74.5095639, 2, 'Hubballi', 'SWR'),
    ('RRB', 'BIRUR JN', 13.591101, 75.974749, 2, 'Mysuru', 'SWR'),
    ('SAN', 'SANDILA', 27.059455, 80.517354, 2, 'Lucknow NR', 'NR'),
    ('GCT', 'GHAZIPUR CITY', 25.583144, 83.568045, 2, 'Varanasi', 'NER'),
    ('DUA', 'DHAURA', 24.44965, 78.321791, 2, 'Jhansi', 'NCR'),
    ('MAU', 'MAU JN', 25.93948, 83.564347, 2, 'Pt Deen Dayal Upadhyaya', 'ECR'),
    ('SZM', 'SUBZI MANDI', 28.668683, 77.199696, 2, 'Delhi', 'NR'),
    ('GGC', 'GANGAPUR CITY', 26.468979, 76.72770799999999, 2, 'Kota', 'WCR'),
    ('MTC', 'MEERUT CITY', 28.977610000000002, 77.675106, 2, 'Delhi', 'NR'),
    ('STL', 'SIMULTALA', 24.713365, 86.541782, 2, 'Dhanbad', 'ECR'),
    ('TPT', 'TIRUPATTUR JN', 12.497951, 78.561419, 2, 'Salem', 'SR'),
    ('DDC', 'Dum Dum Cantt.', 22.636349000000003, 88.411641, 2, 'Sealdah', 'ER'),
    ('SPE', 'SULLURUPETA', 13.696463, 80.018161, 2, 'Chennai', 'SR'),
    ('JMKT', 'JAMIKUNTA', 18.290021, 79.476918, 2, 'Secunderabad', 'SCR'),
    ('HIJ', 'HIJILLI', 22.319921, 87.32016899999999, 2, 'Kharagpur', 'SER'),
    ('RDL', 'RUDAULI', 26.762188000000002, 81.754202, 2, 'Lucknow NER', 'NER'),
    ('GRRU', 'GURARU', 24.811113, 84.791831, 2, 'Danapur', 'ECR'),
    ('RTGH', 'Ratangarh Junction', 28.0665867073, 74.6236025668, 2, 'Bikaner', 'NWR'),
    ('RAIR', 'RAIRAKHOL', 21.046744999999998, 84.333562, 2, 'Sambalpur', 'ECoR'),
    ('KHED', 'KHED', 17.712059, 73.40881499999999, 2, 'Ratnagiri', 'KR'),
    ('BKI', 'BANDIKUI JN', 27.039271, 76.56672300000001, 2, 'Jaipur', 'NWR'),
    ('NBD', 'NAJIBABAD JN', 29.603540000000002, 78.335733, 2, 'Moradabad', 'NR'),
    ('TORI', 'TORI', 23.680808, 84.739774, 2, 'Ranchi', 'SER'),
    ('ORAI', 'ORAI', 25.9825370076, 79.459533963, 2, 'Jhansi', 'NCR'),
    ('BHW', 'BARHARWA JN', 24.857748, 87.77449299999999, 2, 'Malda', 'ER'),
    ('PGT', 'PALAKKAD', 10.802091, 76.641926, 2, 'Palakkad', 'SR'),
    ('HTC', 'HATHRAS CITY', 27.599816899999997, 78.05506869999999, 2, 'Agra', 'NCR'),
    ('BTT', 'BHATNI JN', 26.381257, 83.934035, 2, 'Danapur', 'ECR'),
    ('CBE', 'COIMBATORE JN', 10.997639, 76.966298, 2, 'Palakkad', 'SR'),
    ('PAN', 'PANAGARH', 23.443034, 87.439587, 2, 'Asansol', 'ER'),
    ('ABP', 'AKBARPUR', 26.429818, 82.539073, 2, 'Varanasi', 'NER'),
    ('NWU', 'NAVAPUR', 21.166844, 73.771183, 2, 'Vadodara', 'WR'),
    ('DGR', 'DURGAPUR', 23.495046000000002, 87.297902, 2, 'Asansol', 'ER'),
    ('FBD', 'FARRUKHABAD', 27.38236, 79.57173700000001, 2, 'Izzatnagar', 'NER'),
    ('DHNE', 'DHONE', 15.396729, 77.865727, 2, 'Guntakal', 'SCR'),
    ('BRJN', 'BRAJRAJNAGAR', 21.822718000000002, 83.923653, 2, 'Sambalpur', 'ECoR'),
    ('BDC', 'BANDEL JN', 22.9236565, 88.3793623, 2, 'Howrah', 'ER'),
    ('RJT', 'RAJKOT JN', 22.312206, 70.803446, 2, 'Rajkot', 'WR'),
    ('NH', 'NAIHATI JN', 22.888555, 88.4185, 2, 'Howrah', 'ER'),
    ('DOS', 'DEHRI ON SONE', 24.914894999999998, 84.185434, 2, 'Danapur', 'ECR'),
    ('STR', 'SATARA', 17.688361, 74.063727, 2, 'Pune', 'CR'),
    ('MDR', 'MADHIRA', 16.921826, 80.366849, 2, 'Vijayawada', 'SCR'),
    ('SBPY', 'SAMBALPUR CITY', 21.4770222859, 84.0076171613, 2, 'Sambalpur', 'ECoR'),
    ('BPF', 'BANAPURA', 22.4703575471, 77.4807316095, 2, 'Bhopal', 'WCR'),
    ('PGW', 'PHAGWARA JN', 31.217555749800002, 75.7655019775, 2, 'Firozpur', 'NR'),
    ('DOE', 'DEORI', 23.298434999999998, 80.009808, 2, 'Jabalpur', 'WCR'),
    ('SSPN', 'SATYA SAI P NILAYAM', 14.160468, 77.757559, 2, 'Guntakal', 'SCR'),
    ('ANV', 'ANNAVARAM', 17.269633, 82.41967700000001, 2, 'Waltair', 'ECoR'),
    ('KJM', 'KRISHNARAJAPURAM', 13.000534, 77.674016, 2, 'Bengaluru', 'SWR'),
    ('DTO', 'DALTONGANJ', 24.033075, 84.07484299999999, 2, 'Ranchi', 'SER'),
    ('RJP', 'RAZAMPETA', 14.184524999999999, 79.15274099999999, 2, 'Chennai', 'SR'),
    ('TTR', 'TIPTUR', 13.256152, 76.475987, 2, 'Mysuru', 'SWR'),
    ('KGM', 'KATHGODAM', 29.266583, 79.54633, 2, 'Izzatnagar', 'NER'),
    ('DPJ', 'Dharmapuri', 12.126595, 78.154742, 2, 'Bengaluru', 'SWR'),
    ('PAR', 'PANDHURNA', 21.589996, 78.525394, 2, 'Nagpur', 'CR'),
    ('MNGD', 'MUNIGUDA', 19.62753, 83.488343, 2, 'Sambalpur', 'ECoR'),
    ('CTO', 'CHITTOOR', 13.219857, 79.103252, 2, 'Chennai', 'SR'),
    ('DBRG', 'DIBRUGARH', 27.463606565899997, 94.93525791020001, 2, 'Tinsukia', 'NFR'),
    ('LTT', 'LOKMANYA TILAK TERM', 19.070320000000002, 72.89173899999999, 2, 'Mumbai CSMT', 'CR'),
    ('VKB', 'VIKARABAD JN', 17.337132, 77.90940900000001, 2, 'Hyderabad', 'SCR'),
    ('UMR', 'UMARIA', 23.52273, 80.823244, 2, 'Jabalpur', 'WCR'),
    ('TPJ', 'TIRUCHIRAPPALLI', 10.794067, 78.685355, 2, 'Trichy', 'SR'),
    ('DMV', 'DIMAPUR', 25.905701999999998, 93.72781599999999, 2, 'Lumding', 'NFR'),
    ('AMG', 'ALAMNAGAR', 26.84708, 80.86031200000001, 2, 'Lucknow NR', 'NR'),
    ('CPH', 'CHAMPA', 22.034731, 82.665149, 2, 'Bilaspur', 'SECR'),
    ('AKT', 'AKALTARA', 22.029121, 82.422049, 2, 'Bilaspur', 'SECR'),
    ('PDPL', 'PEDDAPALLI', 18.613795999999997, 79.39208, 2, 'Secunderabad', 'SCR'),
    ('BYR', 'BHAYANDAR', 19.311766, 72.85303900000001, 2, 'Mumbai Central', 'WR'),
    ('CLJ', 'COLONELGANJ', 27.137698, 81.69417800000001, 2, 'Lucknow NER', 'NER'),
    ('NSP', 'NALLA SOPARA', 19.418238000000002, 72.819464, 2, 'Mumbai Central', 'WR'),
    ('NWD', 'NAWADIH', 24.886758, 85.54864500000001, 2, 'Sonpur', 'ECR'),
    ('CGL', 'CHENGALPATTU', 12.692863999999998, 79.981519, 2, 'Chennai', 'SR'),
    ('SBB', 'SAHIBABAD', 28.674037, 77.364182, 2, 'Delhi', 'NR'),
    ('BCY', 'VARANASI CITY', 25.3341176, 83.0141142, 2, 'Varanasi', 'NER'),
    ('BARH', 'BARH', 25.46165, 85.70942600000001, 2, 'Samastipur', 'ECR'),
    ('KTYM', 'KOTTAYAM', 9.594177, 76.532168, 2, 'Trivandrum', 'SR'),
    ('VRI', 'VRIDHACHALAM JN', 11.534965, 79.316073, 2, 'Trichy', 'SR'),
    ('KPP', 'KALAPIPAL', 23.332775, 76.834002, 2, 'Bhopal', 'WCR'),
    ('SLI', 'SANGLI', 16.858669000000003, 74.588939, 2, 'Solapur', 'CR'),
    ('ATE', 'ATARRA', 25.291367, 80.576491, 2, 'Prayagraj', 'NCR'),
    ('MUR', 'MANKAPUR JN', 27.039058, 82.227648, 2, 'Lucknow NER', 'NER'),
    ('DPA', 'DURGAPURA', 26.855947, 75.786436, 2, 'Jaipur', 'NWR'),
    ('SUNR', 'SURENDRANAGAR', 22.7443, 71.630056, 2, 'Rajkot', 'WR'),
    ('WKR', 'WANKANER JN', 22.622552, 70.96561700000001, 2, 'Rajkot', 'WR'),
    ('GTS', 'GHATSILA', 22.58616, 86.479768, 2, 'Chakradharpur', 'SER'),
    ('BNDA', 'BANDA JN', 25.477677, 80.336246, 2, 'Prayagraj', 'NCR'),
    ('BMKI', 'BAPUDHAM MOTIHARI', 26.655732999999998, 84.90529000000001, 2, 'Sonpur', 'ECR'),
    ('HSR', 'Hisar', 29.152341, 75.724305, 2, 'Jaipur', 'NWR'),
    ('DRD', 'DAHANU ROAD', 19.991217, 72.74336799999999, 2, 'Mumbai Central', 'WR'),
    ('KKDE', 'KURUKSHETRA JN', 29.969440000000002, 76.852795, 2, 'Ambala', 'NR'),
    ('JOP', 'JAUNPUR CITY', 25.734125, 82.666999, 2, 'Varanasi', 'NER'),
    ('URI', 'URULI', 18.494237, 74.13682, 2, 'Pune', 'CR'),
    ('APR', 'ANUPPUR JN', 23.117312, 81.695967, 2, 'Bilaspur', 'SECR'),
    ('DKAE', 'DANKUNI', 22.677422, 88.291491, 2, 'Howrah', 'ER'),
    ('MFKA', 'MUSAFIR KHANA', 26.379585, 81.79981699999999, 2, 'Prayagraj', 'NCR'),
    ('DBR', 'DABHAURA', 25.11793, 81.30312500000001, 2, 'Prayagraj', 'NCR'),
    ('BNCE', 'BANGALORE EAST', 13.001479999999999, 77.6184701, 2, 'Bengaluru', 'SWR'),
    ('MRJ', 'MIRAJ JN', 16.819946, 74.638839, 2, 'Solapur', 'CR'),
    ('HYB', 'HYDERABAD DECCAN', 17.393362999999997, 78.467377, 2, 'Hyderabad', 'SCR'),
    ('SIR', 'SIRHIND JN', 30.624222, 76.383194, 2, 'Ambala', 'NR'),
    ('TKMG', 'Tikamgarh', 24.7672962666, 78.8406655457, 2, 'Jhansi', 'NCR'),
    ('ZNA', 'ZAMANIA', 25.373856, 83.54365, 2, 'Pt Deen Dayal Upadhyaya', 'ECR'),
    ('SNI', 'SINDI', 20.816446, 78.883342, 2, 'Nagpur', 'CR'),
    ('PLP', 'PHULPUR', 25.552533999999998, 82.091535, 2, 'Lucknow NR', 'NR'),
    ('PVP', 'PARVATIPURAM', 18.770670000000003, 83.42696600000001, 2, 'Waltair', 'ECoR'),
    ('MJA', 'MEJA ROAD', 25.221545, 82.089337, 2, 'Prayagraj', 'NCR'),
    ('NOK', 'NOKHA', 27.556203, 73.47484800000001, 2, 'Bikaner', 'NWR'),
    ('MML', 'MADAN MAHAL', 23.159475, 79.920425, 2, 'Jabalpur', 'WCR'),
    ('CUPJ', 'CUDDALORE PORT', 11.715119, 79.766287, 2, 'Trichy', 'SR'),
    ('GWD', 'GADWAL', 16.22509, 77.80967199999999, 2, 'Guntakal', 'SCR'),
    ('MTY', 'MULTAI', 21.783543, 78.26283000000001, 2, 'Nagpur', 'CR'),
    ('MDU', 'MADURAI JN', 9.919907, 78.11031399999999, 5, 'Madurai', 'SR'),
    ('PAK', 'PAKALA JN', 13.451133, 79.11408, 2, 'Chennai', 'SR'),
    ('PGRL', 'PIDUGURALLA', 16.477787000000003, 79.876294, 2, 'Guntur', 'SCR'),
    ('EKMA', 'EKMA', 25.967099, 84.53637, 2, 'Danapur', 'ECR'),
    ('BTW', 'BARSI TOWN', 18.240993, 75.718169, 2, 'Solapur', 'CR'),
    ('MGN', 'MEGHNAGAR', 22.907459, 74.539834, 2, 'Ratlam', 'WR'),
    ('CKB', 'CHAUTH KA BARWARA', 26.051333, 76.14905300000001, 2, 'Kota', 'WCR'),
    ('CPA', 'KANPUR ANWARGANJ', 26.456232999999997, 80.328444, 2, 'Lucknow NR', 'NR'),
    ('AMH', 'AZAMGARH', 26.038607, 83.160614, 2, 'Varanasi', 'NER'),
    ('HG', 'HOTGI', 17.565668000000002, 75.989943, 2, 'Solapur', 'CR'),
    ('BIRD', 'BHIWANDI ROAD', 19.268544000000002, 73.045654, 2, 'Mumbai CSMT', 'CR'),
]

from .models import (
    Zone, Division, Station, Train, TrainRoute, User, Department,
    Staff, StaffDutyAssignment, StaffGpsLocation, PnrBooking, ComplaintCategory, Complaint,
    Feedback, ComplaintStatusHistory, OtpVerification, Notification
)


def parse_date(date_str):
    if not date_str:
        return None
    for fmt in ("%Y-%m-%d", "%d-%m-%Y", "%d/%m/%Y"):
        try:
            return datetime.strptime(date_str.strip(), fmt).date()
        except ValueError:
            continue
    return None

def parse_time(time_str):
    if not time_str:
        return None
    for fmt in ("%H:%M:%S", "%H:%M"):
        try:
            return datetime.strptime(time_str.strip(), fmt).time()
        except ValueError:
            continue
    return None

def parse_datetime(dt_str):
    if not dt_str:
        return None
    for fmt in ("%Y-%m-%d %H:%M:%S", "%d-%m-%Y %H:%M:%S", "%d/%m/%Y %H:%M:%S", "%Y-%m-%d %H:%M"):
        try:
            return datetime.strptime(dt_str.strip(), fmt)
        except ValueError:
            continue
    return None

def clean_station_name(name_raw):
    if not name_raw:
        return "New Delhi", "NDLS"
    name_raw = name_raw.strip()
    clean_name = re.sub(r'\(.*?\)', '', name_raw).strip()
    match = re.search(r'\(([^)]+)\)', name_raw)
    code = match.group(1).upper().strip() if match else clean_name[:4].upper()
    return clean_name, code

from sqlalchemy import text

def seed_database():
    # Use raw connection to drop tables cleanly
    with engine.begin() as conn:
        conn.execute(text("SET FOREIGN_KEY_CHECKS = 0;"))
        result = conn.execute(text("SHOW TABLES;"))
        tables = [row[0] for row in result]
        for table in tables:
            conn.execute(text(f"DROP TABLE IF EXISTS `{table}`"))
        conn.execute(text("SET FOREIGN_KEY_CHECKS = 1;"))
        
    Base.metadata.create_all(bind=engine, checkfirst=True)
    
    db: Session = SessionLocal()
    try:
        print("--- DATABASE INITIAL SEEDING START ---")
        
        # 1. Seed Zones (with their Headquarters)
        zones_data = [
            ("CR", "Central Railway", "Mumbai CSMT"),
            ("ER", "Eastern Railway", "Kolkata"),
            ("ECR", "East Central Railway", "Hajipur"),
            ("ECoR", "East Coast Railway", "Bhubaneswar"),
            ("NR", "Northern Railway", "New Delhi"),
            ("NCR", "North Central Railway", "Prayagraj"),
            ("NER", "North Eastern Railway", "Gorakhpur"),
            ("NFR", "Northeast Frontier Railway", "Maligaon (Guwahati)"),
            ("NWR", "North Western Railway", "Jaipur"),
            ("SR", "Southern Railway", "Chennai Central"),
            ("SCR", "South Central Railway", "Secunderabad"),
            ("SER", "South Eastern Railway", "Garden Reach (Kolkata)"),
            ("SECR", "South East Central Railway", "Bilaspur"),
            ("SWR", "South Western Railway", "Hubballi"),
            ("WR", "Western Railway", "Mumbai (Churchgate)"),
            ("WCR", "West Central Railway", "Jabalpur"),
            ("METRO", "Metro Railway Kolkata", "Kolkata"),
            ("KR", "Konkan Railway", "Navi Mumbai")
        ]
        zones_map = {}
        for z_code, z_name, hq in zones_data:
            zone = Zone(zone_code=z_code, zone_name=z_name, headquarters=hq)
            db.add(zone)
            db.flush()
            zones_map[z_code] = zone.zone_code

        # 2. Seed Divisions (with their administrative codes)
        divisions_data = [
            ("Mumbai CSMT", "CR", "CSTM"), ("Bhusawal", "CR", "BSL"), ("Nagpur", "CR", "NGP"), ("Solapur", "CR", "SUR"), ("Pune", "CR", "PUNE"),
            ("Howrah", "ER", "HWH"), ("Sealdah", "ER", "SDAH"), ("Asansol", "ER", "ASN"), ("Malda", "ER", "MLDT"),
            ("Danapur", "ECR", "DNR"), ("Dhanbad", "ECR", "DHN"), ("Pt Deen Dayal Upadhyaya", "ECR", "DDU"), ("Samastipur", "ECR", "SPJ"), ("Sonpur", "ECR", "SEE"),
            ("Khurda Road", "ECoR", "KUR"), ("Sambalpur", "ECoR", "SBP"), ("Waltair", "ECoR", "WAT"),
            ("Delhi", "NR", "DLI"), ("Ambala", "NR", "UMB"), ("Firozpur", "NR", "FZR"), ("Lucknow NR", "NR", "LKO"), ("Moradabad", "NR", "MB"),
            ("Prayagraj", "NCR", "PRYJ"), ("Agra", "NCR", "AGC"), ("Jhansi", "NCR", "JHS"),
            ("Izzatnagar", "NER", "IZN"), ("Lucknow NER", "NER", "LJN"), ("Varanasi", "NER", "BSB"),
            ("Katihar", "NFR", "KIR"), ("Alipurduar", "NFR", "APDJ"), ("Rangiya", "NFR", "RNY"), ("Lumding", "NFR", "LMG"), ("Tinsukia", "NFR", "TSK"),
            ("Jaipur", "NWR", "JP"), ("Ajmer", "NWR", "AII"), ("Bikaner", "NWR", "BKN"), ("Jodhpur", "NWR", "JU"),
            ("Chennai", "SR", "MAS"), ("Trichy", "SR", "TPJ"), ("Madurai", "SR", "MDU"), ("Palakkad", "SR", "PGT"), ("Salem", "SR", "SA"), ("Trivandrum", "SR", "TVC"),
            ("Secunderabad", "SCR", "SC"), ("Hyderabad", "SCR", "HYB"), ("Vijayawada", "SCR", "BZA"), ("Guntakal", "SCR", "GTL"), ("Guntur", "SCR", "GNT"), ("Nanded", "SCR", "NED"),
            ("Kharagpur", "SER", "KGP"), ("Adra", "SER", "ADRA"), ("Chakradharpur", "SER", "CKP"), ("Ranchi", "SER", "RNC"),
            ("Bilaspur", "SECR", "BSP"), ("Raipur", "SECR", "R"), ("Nagpur SECR", "SECR", "NGP_SECR"),
            ("Hubballi", "SWR", "UBL"), ("Bengaluru", "SWR", "SBC"), ("Mysuru", "SWR", "MYS"),
            ("Mumbai Central", "WR", "MMCT"), ("Vadodara", "WR", "BRC"), ("Ratlam", "WR", "RTM"), ("Ahmedabad", "WR", "ADI"), ("Rajkot", "WR", "RJT"), ("Bhavnagar", "WR", "BVP"),
            ("Jabalpur", "WCR", "JBP"), ("Bhopal", "WCR", "BPL"), ("Kota", "WCR", "KOTA"),
            ("Kolkata Metro", "METRO", "KOLKATA_METRO"),
            ("Karwar", "KR", "KAWR"), ("Ratnagiri", "KR", "RN")
        ]
        divisions_map = {}
        for d_name, z_code, d_code in divisions_data:
            division = Division(division_code=d_code, division_name=d_name, zone_code=zones_map[z_code])
            db.add(division)
            db.flush()
            divisions_map[d_name.lower()] = division.division_code

        # 3. Seed Stations (Top 500 Real Stations with exact divisions)
        stations_map = {}
        for s_code, s_name, lat, lon, plat, div_name, z_code in STATIONS_DATA:
            station = Station(
                station_code=s_code,
                station_name=s_name,
                division_code=divisions_map[div_name.lower()],
                latitude=lat,
                longitude=lon,
                platforms_count=plat
            )
            db.add(station)
            db.flush()
            stations_map[s_name.lower()] = station.station_code
            stations_map[s_code.lower()] = station.station_code

        # 4. Seed Departments (with standard CRIS codes)
        departments_list = [
            ("Security (RPF)", "RPF"),
            ("Mechanical (Cleanliness)", "MECH_CLEAN"),
            ("Commercial (Catering)", "COMM_CATER"),
            ("Electrical", "ELEC"),
            ("Mechanical (Coaching)", "MECH_COACH"),
            ("Medical", "MED"),
            ("Commercial (Staff)", "COMM_STAFF"),
            ("Operating", "OPER"),
            ("Engineering", "ENG"),
            ("Other", "OTHER")
        ]
        depts_map = {}
        for d_name, d_code in departments_list:
            dept = Department(department_code=d_code, department_name=d_name)
            db.add(dept)
            db.flush()
            depts_map[d_name] = dept.department_code

        # Seed Users & Default Accounts
        admin_user = User(
            user_id="USR_ADMIN",
            username="admin",
            password_hash="admin123",
            role="Admin",
            email="admin@railsathi.gov.in"
        )
        db.add(admin_user)
        db.flush()

        admin_staff = Staff(
            staff_id="STF_ADMIN",
            user_id=admin_user.user_id,
            name="System Administrator",
            is_on_duty=True
        )
        db.add(admin_staff)
        db.flush()

        # Seed Complaint Management Officers
        officer1 = User(
            user_id="USR_OFFICER1",
            username="officer1",
            password_hash="officer123",
            role="ComplaintOfficer",
            email="officer1@railsathi.gov.in"
        )
        officer2 = User(
            user_id="USR_OFFICER2",
            username="officer2",
            password_hash="officer123",
            role="ComplaintOfficer",
            email="officer2@railsathi.gov.in"
        )
        db.add_all([officer1, officer2])
        db.flush()

        # Seed Departmental Staff Accounts
        staff_elec = User(user_id="USR_STAFF_ELEC", username="staff_elec", password_hash="staff123", role="Staff", email="elec@railsathi.gov.in")
        staff_hyg  = User(user_id="USR_STAFF_HYG",  username="staff_hyg",  password_hash="staff123", role="Staff", email="hyg@railsathi.gov.in")
        staff_sec  = User(user_id="USR_STAFF_SEC",  username="staff_sec",  password_hash="staff123", role="Staff", email="sec@railsathi.gov.in")
        db.add_all([staff_elec, staff_hyg, staff_sec])
        db.flush()

        stf_elec_profile = Staff(staff_id="STF_ELEC1", user_id=staff_elec.user_id, name="Rajesh Kumar (Electrical)", department_code="ELEC",       division_code="DLI", is_on_duty=True)
        stf_hyg_profile  = Staff(staff_id="STF_HYG1",  user_id=staff_hyg.user_id,  name="Suresh Verma (Hygiene)",    department_code="MECH_CLEAN", division_code="DLI", is_on_duty=True)
        stf_sec_profile  = Staff(staff_id="STF_SEC1",  user_id=staff_sec.user_id,  name="Vikram Singh (Security)",   department_code="RPF",        division_code="DLI", is_on_duty=True)
        db.add_all([stf_elec_profile, stf_hyg_profile, stf_sec_profile])
        db.flush()

        # 5. Seed Complaint Categories ( Taxonomy mapping )
        category_tuples = [
            # Bed Roll
            ("Bed Roll", "Dirty / Torn", "Mechanical (Coaching)", "Low"),
            ("Bed Roll", "Non Availability", "Mechanical (Coaching)", "Medium"),
            ("Bed Roll", "Others", "Mechanical (Coaching)", "Low"),
            ("Bed Roll", "Overcharging", "Mechanical (Coaching)", "Medium"),
            # Catering & Vending Services
            ("Catering & Vending Services", "E-Catering", "Commercial (Catering)", "Low"),
            ("Catering & Vending Services", "Food & Water Not Available", "Commercial (Catering)", "High"),
            ("Catering & Vending Services", "Food Quality", "Commercial (Catering)", "Medium"),
            ("Catering & Vending Services", "Food Quality & Quantity", "Commercial (Catering)", "Medium"),
            ("Catering & Vending Services", "Food Quantity", "Commercial (Catering)", "Low"),
            ("Catering & Vending Services", "Hygiene", "Commercial (Catering)", "Medium"),
            ("Catering & Vending Services", "Others", "Commercial (Catering)", "Low"),
            ("Catering & Vending Services", "Overcharging", "Commercial (Catering)", "Medium"),
            ("Catering & Vending Services", "Service Quality", "Commercial (Catering)", "Low"),
            ("Catering & Vending Services", "Service Quality & Hygiene", "Commercial (Catering)", "Medium"),
            # Coach - Cleanliness
            ("Coach - Cleanliness", "Coach Exterior", "Mechanical (Cleanliness)", "Low"),
            ("Coach - Cleanliness", "Coach Interior", "Mechanical (Cleanliness)", "Low"),
            ("Coach - Cleanliness", "Cockroach / Rodents", "Mechanical (Cleanliness)", "Medium"),
            ("Coach - Cleanliness", "Others", "Mechanical (Cleanliness)", "Low"),
            ("Coach - Cleanliness", "Toilet", "Mechanical (Cleanliness)", "Medium"),
            ("Coach - Cleanliness", "Washbasin", "Mechanical (Cleanliness)", "Low"),
            # Cleanliness (Station)
            ("Cleanliness", "Others", "Mechanical (Cleanliness)", "Low"),
            ("Cleanliness", "Platform", "Mechanical (Cleanliness)", "Low"),
            ("Cleanliness", "Stalls", "Mechanical (Cleanliness)", "Low"),
            ("Cleanliness", "Station Entrance / Building", "Mechanical (Cleanliness)", "Low"),
            ("Cleanliness", "Toilet", "Mechanical (Cleanliness)", "Medium"),
            ("Cleanliness", "Waiting Room / Retiring Room", "Mechanical (Cleanliness)", "Low"),
            # Coach - Maintenance
            ("Coach - Maintenance", "Broken/Missing Toilet Fittings", "Mechanical (Coaching)", "Medium"),
            ("Coach - Maintenance", "Jerks/Abnormal Sound", "Mechanical (Coaching)", "High"),
            ("Coach - Maintenance", "Others", "Mechanical (Coaching)", "Low"),
            ("Coach - Maintenance", "Tap leaking/Tap not working", "Mechanical (Coaching)", "Medium"),
            ("Coach - Maintenance", "Window/Door locking problem", "Mechanical (Coaching)", "High"),
            ("Coach - Maintenance", "Window/Seat Broken", "Mechanical (Coaching)", "Medium"),
            # Corruption / Bribery
            ("Corruption / Bribery", "Corruption / Bribery", "Commercial (Staff)", "High"),
            # Divyangjan Facilities
            ("Divyangjan Facilities", "Braille signage in coach", "Mechanical (Coaching)", "Low"),
            ("Divyangjan Facilities", "Divyangjan coach unavailability", "Mechanical (Coaching)", "High"),
            ("Divyangjan Facilities", "Divyangjan toilet /washbasin", "Mechanical (Coaching)", "Medium"),
            ("Divyangjan Facilities", "Others", "Other", "Low"),
            ("Divyangjan Facilities", "Low height ticket counter", "Other", "Low"),
            ("Divyangjan Facilities", "Low height water booth", "Other", "Low"),
            ("Divyangjan Facilities", "Low seat toilet", "Other", "Low"),
            ("Divyangjan Facilities", "Parking", "Other", "Low"),
            ("Divyangjan Facilities", "Ramp at Entry/Exit gates", "Other", "Medium"),
            ("Divyangjan Facilities", "Seating arrangement at Station/Waiting area", "Other", "Low"),
            ("Divyangjan Facilities", "Tactile Pathway", "Other", "Low"),
            ("Divyangjan Facilities", "Travel Concession", "Other", "Low"),
            ("Divyangjan Facilities", "Wheel Chair/Battery operated car/Divyang Sahayak (On Payment, Feasible)", "Other", "Medium"),
            # Electrical Equipment
            ("Electrical Equipment", "Air Conditioner", "Electrical", "High"),
            ("Electrical Equipment", "Charging Points", "Electrical", "Low"),
            ("Electrical Equipment", "Fans", "Electrical", "Medium"),
            ("Electrical Equipment", "Lights", "Electrical", "Medium"),
            ("Electrical Equipment", "Others", "Electrical", "Low"),
            ("Electrical Equipment", "Display / Coach Indicator Board", "Electrical", "Medium"),
            ("Electrical Equipment", "Fans / Lights", "Electrical", "Medium"),
            ("Electrical Equipment", "Lifts / Escalators", "Electrical", "Medium"),
            # Facilities for Women with Special needs
            ("Facilities for Women with Special needs", "Baby Food", "Other", "High"),
            ("Facilities for Women with Special needs", "Others", "Other", "Low"),
            ("Facilities for Women with Special needs", "Segregated area for lactating mothers in waiting hall", "Other", "Medium"),
            # Goods
            ("Goods", "Booking", "Other", "Low"),
            ("Goods", "Delivery", "Other", "Low"),
            ("Goods", "Demurrage / Wharfage", "Other", "Low"),
            ("Goods", "Freight Facilitation", "Other", "Low"),
            ("Goods", "Others", "Other", "Low"),
            ("Goods", "Overcharging", "Other", "Low"),
            ("Goods", "Staff Not Available", "Other", "Low"),
            ("Goods", "Touts", "Other", "Low"),
            # Luggage / Parcels
            ("Luggage / Parcels", "Booking", "Other", "Low"),
            ("Luggage / Parcels", "Delivery", "Other", "Low"),
            ("Luggage / Parcels", "Others", "Other", "Low"),
            ("Luggage / Parcels", "Overcharging", "Other", "Low"),
            ("Luggage / Parcels", "Parcel Facilitation", "Other", "Low"),
            ("Luggage / Parcels", "Staff Not Available", "Other", "Low"),
            ("Luggage / Parcels", "Touts", "Other", "Low"),
            # Medical Assistance
            ("Medical Assistance", "Medical Assistance", "Medical", "Critical"),

            # Miscellaneous
            ("Miscellaneous", "Miscellaneous", "Other", "Low"),
            # Passenger Amenities
            ("Passenger Amenities", "139", "Other", "Low"),
            ("Passenger Amenities", "Benches/Sheds", "Other", "Low"),
            ("Passenger Amenities", "Enquiry Office/Inadequate Counter", "Other", "Low"),
            ("Passenger Amenities", "Foot over/under Bridge", "Other", "Medium"),
            ("Passenger Amenities", "Others", "Other", "Low"),
            ("Passenger Amenities", "PA (Public Announcement) System", "Other", "Medium"),
            ("Passenger Amenities", "Parking", "Other", "Low"),
            ("Passenger Amenities", "Wi-Fi", "Other", "Low"),
            # Punctuality
            ("Punctuality", "Late Running", "Operating", "Low"),
            ("Punctuality", "NTES APP", "Operating", "Low"),
            ("Punctuality", "Others", "Operating", "Low"),
            # Refund of Tickets
            ("Refund of Tickets", "Counter Ticket", "Other", "Low"),
            ("Refund of Tickets", "Online Ticket", "Other", "Low"),
            ("Refund of Tickets", "Others", "Other", "Low"),
            # Reserved Ticketing
            ("Reserved Ticketing", "E-Ticketing", "Other", "Low"),
            ("Reserved Ticketing", "Inadequate Counters", "Other", "Low"),
            ("Reserved Ticketing", "Others", "Other", "Low"),
            ("Reserved Ticketing", "Overcharging", "Other", "Low"),
            ("Reserved Ticketing", "Tatkal", "Other", "Low"),
            ("Reserved Ticketing", "touts", "Other", "Medium"),
            # Security
            ("Security", "Dacoity/Robbery/Murder/Riots", "Security (RPF)", "Critical"),
            ("Security", "Eve-teasing", "Security (RPF)", "Critical"),
            ("Security", "Eveteasing/Misbehaviour with lady passengers/Rape", "Security (RPF)", "Critical"),
            ("Security", "Harassment/Extortion by Security Personnel/Railway personnel", "Security (RPF)", "High"),
            ("Security", "Luggage Left Behind/Unclaimed/Suspected Articles", "Security (RPF)", "High"),
            ("Security", "Misbehaviour", "Security (RPF)", "Medium"),
            ("Security", "Misbehaviour with lady passenger", "Security (RPF)", "Critical"),
            ("Security", "Misbehaviour with lady passengers", "Security (RPF)", "Critical"),
            ("Security", "Nuisance by Hawkers/Beggar/Eunuch", "Security (RPF)", "Medium"),
            ("Security", "Nuisance by passenger", "Security (RPF)", "Medium"),
            ("Security", "Others", "Security (RPF)", "Low"),
            ("Security", "Passenger Missing/Not responding call", "Security (RPF)", "Critical"),
            ("Security", "Passenger fallen down", "Security (RPF)", "Critical"),
            ("Security", "Quarrelling/Hooliganism", "Security (RPF)", "Critical"),
            ("Security", "Rape", "Security (RPF)", "Critical"),
            ("Security", "Smoking/Drinking Alcohol/Narcotics", "Security (RPF)", "High"),
            ("Security", "Theft of Passengers Belongings/Snatching", "Security (RPF)", "High"),
            ("Security", "Unauthorized person in Ladies/Disabled Coach/SLR/Reserve Coach", "Security (RPF)", "Critical"),

            # Staff Behaviour
            ("Staff Behaviour", "Staff Behaviour", "Commercial (Staff)", "Medium"),
            # Unreserved Ticketing
            ("Unreserved Ticketing", "ATVM", "Other", "Low"),
            ("Unreserved Ticketing", "Inadequate Counters", "Other", "Low"),
            ("Unreserved Ticketing", "MST", "Other", "Low"),
            ("Unreserved Ticketing", "Others", "Other", "Low"),
            ("Unreserved Ticketing", "Overcharging", "Other", "Low"),
            ("Unreserved Ticketing", "UTS App Login Issue", "Other", "Low"),
            ("Unreserved Ticketing", "UTS App Mobile Handset Change", "Other", "Low"),
            ("Unreserved Ticketing", "UTS RWallet", "Other", "Low"),
            ("Unreserved Ticketing", "UTS/ATVM - Digital Payment", "Other", "Low"),
            # Water Availability
            ("Water Availability", "Others", "Mechanical (Cleanliness)", "Low"),
            ("Water Availability", "Packaged Drinking Water / Rail Neer", "Mechanical (Cleanliness)", "Medium"),
            ("Water Availability", "Toilet", "Mechanical (Cleanliness)", "High"),
            ("Water Availability", "Washbasin", "Mechanical (Cleanliness)", "Medium"),
            ("Water Availability", "Drinking Water at Platform", "Mechanical (Cleanliness)", "High"),
            ("Water Availability", "Retiring Room / Waiting Room", "Mechanical (Cleanliness)", "Low"),
            ("Water Availability", "Water Vending Machines", "Mechanical (Cleanliness)", "Low"),
        ]

        categories_map = {}
        seen_pairs = set()
        seen_codes = set()
        import re as _re
        def _make_cat_code(cat_name, sub_name, existing_codes=None):
            key = (cat_name.lower().strip(), sub_name.lower().strip())
            if key in CATEGORY_CODE_MAP:
                code = CATEGORY_CODE_MAP[key]
                if existing_codes is not None:
                    existing_codes.add(code)
                return code
            def clean(s):
                s = s.upper().strip()
                s = _re.sub(r'[^A-Z0-9/]', '_', s)
                s = _re.sub(r'_+', '_', s).strip('_')
                return s
            base = f"{clean(cat_name)[:12]}_{clean(sub_name)[:20]}"
            code = base
            counter = 2
            if existing_codes is not None:
                while code in existing_codes:
                    suffix = str(counter)
                    code = f"{base[:(32-len(suffix))]}_{suffix}"
                    counter += 1
                existing_codes.add(code)
            return code

        for cat_name, sub_name, dept_name, priority in category_tuples:
            pair_key = (cat_name.lower(), sub_name.lower())
            if pair_key in seen_pairs:
                continue
            seen_pairs.add(pair_key)
            cat_code = _make_cat_code(cat_name, sub_name, seen_codes)
            cat = ComplaintCategory(
                category_code=cat_code,
                category_name=cat_name,
                subcategory_name=sub_name,
                department_code=depts_map[dept_name],
                default_priority=priority
            )
            db.add(cat)
            db.flush()
            categories_map[pair_key] = (cat.category_code, cat.default_priority)

        # 7. Scan and pre-process CSV files for bulk insertion
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        pnr_path = os.path.join(base_dir, "data", "pnr_database.csv")
        complaints_path = os.path.join(base_dir, "data", "complaints.csv")
        
        unique_trains = {} # number -> name
        unique_stations = {} # name -> (cl_name, code)
        pnr_rows = []
        complaint_rows = []

        # 7.1 Pre-scan PNR database file
        if os.path.exists(pnr_path):
            with open(pnr_path, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    train_num = row["train_number"].strip()
                    train_name = row["train_name"].strip()
                    pnr_rows.append(row)
                    unique_trains[train_num] = train_name
                    
                    for st_col in ["boarding_station", "destination_station"]:
                        val = row.get(st_col)
                        if val:
                            cl_name, code = clean_station_name(val)
                            unique_stations[cl_name.lower()] = (cl_name, code)

        # 7.2 Pre-scan complaints file
        if os.path.exists(complaints_path):
            with open(complaints_path, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    complaint_rows.append(row)
                    
                    train_num_raw = row.get("train_number", "").strip() or None
                    if train_num_raw:
                        if " - " in train_num_raw:
                            parts = train_num_raw.split(" - ")
                            unique_trains[parts[0].strip()] = parts[1].strip()
                        else:
                            t_num = train_num_raw.strip()
                            if t_num not in unique_trains:
                                unique_trains[t_num] = None
                                
                    csv_station = row.get("station_name")
                    if csv_station:
                        cl_name, code = clean_station_name(csv_station)
                        unique_stations[cl_name.lower()] = (cl_name, code)

        # 7.3 Bulk insert missing stations
        codes_seen = set()
        for s in db.query(Station).all():
            codes_seen.add(s.station_code.lower())

        stations_to_add = []
        for cl_name_lower, (cl_name, code) in unique_stations.items():
            code_lower = code.lower()
            if cl_name_lower not in stations_map and code_lower not in codes_seen:
                stations_to_add.append({
                    "station_code": code.upper(),
                    "station_name": cl_name,
                    "division_code": divisions_map["delhi"],
                    "latitude": 28.6143,
                    "longitude": 77.2090,
                    "platforms_count": 2
                })
                codes_seen.add(code_lower)

        if stations_to_add:
            db.bulk_insert_mappings(Station, stations_to_add)
            db.flush()

        stations_map = {s.station_name.lower(): s.station_code for s in db.query(Station).all()}
        for s in db.query(Station).all():
            stations_map[s.station_code.lower()] = s.station_code

        # 7.4 Load and bulk insert trains and routes from real dataset
        import json
        from datetime import time
        trains_json_path = os.path.join(base_dir, "data", "real_trains_and_routes.json")
        if os.path.exists(trains_json_path):
            with open(trains_json_path, "r", encoding="utf-8") as f:
                real_trains_data = json.load(f)
        else:
            real_trains_data = []

        # Load train_master.json if available
        train_master_path = os.path.join(base_dir, "data", "train_master.json")
        train_master = {}
        if os.path.exists(train_master_path):
            with open(train_master_path, "r", encoding="utf-8") as f:
                train_master = json.load(f)

        # Ensure PNR and complaint trains are in the list with valid official names
        existing_numbers = {t["train_number"] for t in real_trains_data}
        for t_num, t_name in unique_trains.items():
            if t_num not in existing_numbers:
                valid_name = t_name if (t_name and t_name not in ["Express", "Superfast Express", "Passenger"]) else f"Train {t_num} Express"
                src_code = "NDLS"
                dest_code = "BPL"
                
                match = None
                for cand in (t_num, t_num.lstrip("0"), t_num.zfill(5), "0"+t_num, "1"+t_num, "2"+t_num, "5"+t_num, "6"+t_num):
                    if cand in train_master:
                        match = train_master[cand]
                        break
                
                if match:
                    src_code = match["source_station_code"]
                    dest_code = match["destination_station_code"]
                    if match.get("train_name") and not match["train_name"].startswith("Train "):
                        valid_name = match["train_name"]

                real_trains_data.append({
                    "train_number": t_num,
                    "train_name": valid_name,
                    "source_station_code": src_code,
                    "destination_station_code": dest_code,
                    "stops": []
                })


        # Get existing division code fallback
        default_division = db.query(Division).first()
        default_div_code = default_division.division_code if default_division else "delhi"

        # Ensure all stations used in source, destination, or route exist in database
        seeded_station_codes = {s.station_code.upper() for s in db.query(Station).all()}
        
        # Prepare missing stations to insert
        new_stations_to_add = []
        station_codes_to_add = set()
        
        for t in real_trains_data:
            src = t["source_station_code"].upper().strip()
            dest = t["destination_station_code"].upper().strip()
            if src not in seeded_station_codes and src not in station_codes_to_add:
                station_codes_to_add.add(src)
                new_stations_to_add.append({
                    "station_code": src,
                    "station_name": src,
                    "division_code": default_div_code,
                    "latitude": 28.6143,
                    "longitude": 77.2090,
                    "platforms_count": 2
                })
            if dest not in seeded_station_codes and dest not in station_codes_to_add:
                station_codes_to_add.add(dest)
                new_stations_to_add.append({
                    "station_code": dest,
                    "station_name": dest,
                    "division_code": default_div_code,
                    "latitude": 28.6143,
                    "longitude": 77.2090,
                    "platforms_count": 2
                })
            for s in t["stops"]:
                st_code = s["station_code"].upper().strip()
                if st_code not in seeded_station_codes and st_code not in station_codes_to_add:
                    station_codes_to_add.add(st_code)
                    new_stations_to_add.append({
                        "station_code": st_code,
                        "station_name": s["station_name"] or st_code,
                        "division_code": default_div_code,
                        "latitude": 28.6143,
                        "longitude": 77.2090,
                        "platforms_count": 2
                    })

        if new_stations_to_add:
            db.bulk_insert_mappings(Station, new_stations_to_add)
            db.flush()

        # Re-fetch stations map
        stations_map = {s.station_name.lower(): s.station_code for s in db.query(Station).all()}
        for s in db.query(Station).all():
            stations_map[s.station_code.lower()] = s.station_code

        trains_to_add = []
        train_routes_to_add = []
        
        def parse_time(t_str):
            if not t_str:
                return None
            try:
                parts = [int(x) for x in t_str.split(":")]
                if len(parts) >= 2:
                    return time(parts[0], parts[1])
            except Exception:
                pass
            return None

        for t in real_trains_data:
            train_number = t["train_number"].strip()
            trains_to_add.append({
                "train_number": train_number,
                "train_name": t["train_name"],
                "source_station_code": t["source_station_code"].upper().strip(),
                "destination_station_code": t["destination_station_code"].upper().strip()
            })
            
            for stop in t["stops"]:
                train_routes_to_add.append({
                    "train_number": train_number,
                    "station_code": stop["station_code"].upper().strip(),
                    "stop_sequence": stop["stop_sequence"],
                    "arrival_time": parse_time(stop["arrival_time"]),
                    "departure_time": parse_time(stop["departure_time"]),
                    "distance_km": stop["distance_km"],
                    "halt_duration_minutes": stop["halt_duration_minutes"]
                })

        if trains_to_add:
            db.bulk_insert_mappings(Train, trains_to_add)
            db.flush()
        if train_routes_to_add:
            db.bulk_insert_mappings(TrainRoute, train_routes_to_add)
            db.flush()
            
        trains_map = {t.train_number: t.train_number for t in db.query(Train).all()}

        # 7.5 Bulk insert PNR Bookings
        pnr_seen = set()
        pnr_bookings_to_add = []
        for row in pnr_rows:
            pnr_num = row["pnr_number"].strip()
            if pnr_num in pnr_seen:
                continue
            pnr_seen.add(pnr_num)
            
            phone_dummy = f"99999{pnr_num[-5:]}"
            train_num = row["train_number"].strip()
            
            boarding_st_name, _ = clean_station_name(row.get("boarding_station"))
            dest_st_name, _ = clean_station_name(row.get("destination_station"))
            
            pnr_bookings_to_add.append({
                "pnr_number": pnr_num,
                "train_number": trains_map[train_num],
                "passenger_name": "Passenger A",
                "phone_number": phone_dummy,
                "coach_number": row.get("coach_number", "S1"),
                "seat_number": row.get("berth_number", "25"),
                "gender": "M",
                "age": 35,
                "journey_date": parse_date(row.get("journey_date")) or date.today(),
                "boarding_station_code": stations_map.get(boarding_st_name.lower(), stations_map["ndls"]),
                "destination_station_code": stations_map.get(dest_st_name.lower(), stations_map["bpl"]),
                "journey_class": row.get("journey_class", "SL")
            })

        if pnr_bookings_to_add:
            db.bulk_insert_mappings(PnrBooking, pnr_bookings_to_add)
            db.flush()

        # 7.6 Bulk insert complaints, feedbacks, and status history logs
        complaints_to_add = []
        feedbacks_to_add = []
        histories_to_add = []
        complaint_seen = set()

        for idx, row in enumerate(complaint_rows):
            comp_id = row["complaint_id"]
            if comp_id in complaint_seen:
                continue
            complaint_seen.add(comp_id)
            
            phone = row["phone_number"].strip()
            pnr = row.get("pnr_number", "").strip() or None
            train_num_raw = row.get("train_number", "").strip() or None
            
            # Ensure PNR ticket stub exists if not loaded
            if pnr and pnr not in pnr_seen:
                pnr_seen.add(pnr)
                stub_train_num = train_num_raw.split(" - ")[0].strip() if train_num_raw else "12002"
                db.execute(PnrBooking.__table__.insert().values(
                    pnr_number=pnr,
                    train_number=trains_map[stub_train_num],
                    passenger_name="Passenger A",
                    phone_number=phone,
                    coach_number=row.get("coach_number", "S1"),
                    seat_number="12",
                    gender="F",
                    age=28,
                    journey_date=date.today(),
                    boarding_station_code=stations_map["ndls"],
                    destination_station_code=stations_map["bpl"],
                    journey_class="SL"
                ))
            
            train_num_str = None
            if train_num_raw:
                train_number_clean = train_num_raw.split(" - ")[0].strip()
                train_num_str = trains_map.get(train_number_clean)

            csv_station = row.get("station_name")
            station_code_val = None
            if csv_station:
                st_cl, _ = clean_station_name(csv_station)
                station_code_val = stations_map.get(st_cl.lower(), stations_map["ndls"])
            else:
                station_code_val = stations_map["ndls"]

            # Map category and subcategory to consolidated row
            csv_dept_to_db_dept = {
                "Security (RPF)": "Security (RPF)",
                "Security": "Security (RPF)",
                "Sanitation / Cleanliness": "Mechanical (Cleanliness)",
                "Cleanliness": "Mechanical (Cleanliness)",
                "Coach - Cleanliness": "Mechanical (Cleanliness)",
                "Catering / Vending (Commercial)": "Commercial (Catering)",
                "Catering & Vending Services": "Commercial (Catering)",
                "Electrical Equipment": "Electrical",
                "Coach Maintenance (Coaching)": "Mechanical (Coaching)",
                "Coach - Maintenance": "Mechanical (Coaching)",
                "Bed Roll": "Mechanical (Coaching)",
                "Medical Assistance": "Medical",
                "Passenger Amenities": "Other",
                "Staff Behavior (Commercial)": "Commercial (Staff)",
                "Staff Behaviour": "Commercial (Staff)",
                "Operating Concerns": "Operating",
                "Punctuality": "Operating",
                "Engineering Issues": "Engineering",
                "Divyangjan Facilities": "Other",
                "Facilities for Women with Special needs": "Other",
                "Corruption / Bribery": "Commercial (Staff)",
                "Water Availability": "Mechanical (Cleanliness)",
                "Goods": "Other",
                "Luggage / Parcels": "Other",
                "Refund of Tickets": "Other",
                "Reserved Ticketing": "Other",
                "Unreserved Ticketing": "Other",
                "Miscellaneous": "Other",
                "Other": "Other"
            }

            main_class_val = row.get("main_class", "Other").strip()
            sub_name = row.get("sub_class", "General Complaint").strip()
            
            cat_info = categories_map.get((main_class_val.lower(), sub_name.lower()))
            if not cat_info:
                db_dept_name = csv_dept_to_db_dept.get(main_class_val, "Other")
                new_cat_code = _make_cat_code(main_class_val, sub_name, seen_codes)
                new_cat = ComplaintCategory(
                    category_code=new_cat_code,
                    category_name=main_class_val,
                    subcategory_name=sub_name,
                    department_code=depts_map[db_dept_name],
                    default_priority="Medium"
                )
                db.add(new_cat)
                db.flush()
                categories_map[(main_class_val.lower(), sub_name.lower())] = (new_cat.category_code, new_cat.default_priority)
                category_code_val = new_cat.category_code
                priority = new_cat.default_priority
            else:
                category_code_val, priority = cat_info

            dept_code_val = depts_map[csv_dept_to_db_dept.get(main_class_val, "Other")]
            csv_div = row.get("division_name", "Delhi").strip()
            div_code_val = divisions_map.get(csv_div.lower(), divisions_map["delhi"])

            status_str = row.get("complaint_status", "Assigned")
            status_map = {
                "Open": "Assigned",
                "Pending Review": "Assigned",
                "Under Review": "Assigned",
                "Assigned": "Assigned",
                "In Progress": "In Progress",
                "Reassignment Requested": "Reassignment Requested",
                "Escalated": "Escalated",
                "Resolved": "Resolved",
                "Closed": "Closed"
            }
            internal_stat = status_map.get(status_str, "Assigned")

            created_at = parse_datetime(row.get("created_at")) or datetime.now()

            resolved_at = None
            assigned_at = None
            if internal_stat in ["In Progress", "Resolved", "Closed"]:
                assigned_at = created_at
            if internal_stat in ["Resolved", "Closed"]:
                resolved_at = created_at

            complaints_to_add.append({
                "complaint_id": comp_id,
                "complaint_type": row["complaint_type"],
                "phone_number": phone,
                "pnr_number": pnr,
                "train_number": train_num_str,
                "coach_number": row.get("coach_number"),
                "station_code": station_code_val,
                "platform_number": row.get("platform_number") or None,
                "category_code": category_code_val,
                "incident_date": parse_date(row.get("incident_date")) or created_at.date(),
                "incident_time": parse_time(row.get("incident_time")),
                "complaint_description": row.get("complaint_description", "No description"),
                "internal_status": internal_stat,
                "assigned_department_code": dept_code_val,
                "assigned_division_code": div_code_val,
                "priority": priority,
                "complaint_source": "Passenger Portal",
                "created_at": created_at,
                "updated_at": created_at,
                "assigned_at": assigned_at,
                "resolved_at": resolved_at
            })

            histories_to_add.append({
                "complaint_id": comp_id,
                "from_status": None,
                "to_status": internal_stat,
                "updated_by_user_id": admin_user.user_id,
                "remarks": "Grievance registered automatically.",
                "updated_at": created_at
            })

            feedback_text = row.get("feedback", "").strip()
            rating_text = row.get("rating", "").strip()
            if feedback_text or rating_text:
                feedbacks_to_add.append({
                    "complaint_id": comp_id,
                    "rating": rating_text or "Satisfactory",
                    "feedback_text": feedback_text,
                    "created_at": created_at
                })

        if complaints_to_add:
            db.bulk_insert_mappings(Complaint, complaints_to_add)
            db.bulk_insert_mappings(ComplaintStatusHistory, histories_to_add)
        if feedbacks_to_add:
            db.bulk_insert_mappings(Feedback, feedbacks_to_add)
        db.flush()

        # 8. Seed Staff Accounts, duty rosters, and GPS Telemetry locations
        inspect_user = User(
            user_id="USR_INSPECTOR",
            username="inspector",
            password_hash="inspector123",
            role="Inspector",
            email="inspector@railsathi.gov.in"
        )
        db.add(inspect_user)
        db.flush()

        inspector_staff = Staff(
            staff_id="STF_INSPECTOR",
            user_id=inspect_user.user_id,
            name="Rajesh Kumar (TTE)",
            department_code=depts_map["Commercial (Staff)"],
            division_code=divisions_map["delhi"],
            is_on_duty=True,
            active_train_number=trains_map.get("12002")
        )
        db.add(inspector_staff)
        db.flush()

        # Seed demo user accounts for all major roles with Department & Division FKs
        demo_accounts = [
            ("USR_ZH_NR", "zone_head_nr", "zone123", "ZoneHead", "Ramesh Chandra Sharma", "zonehead.nr@railsathi.gov.in", "+91 98765 11001", "STF_ZH_NR", None, divisions_map.get("delhi"), None),
            ("USR_DH_DLI", "div_head_dli", "div123", "DivisionHead", "Anil Kumar Verma", "divhead.dli@railsathi.gov.in", "+91 98765 22001", "STF_DH_DLI", None, divisions_map.get("delhi"), None),
            ("USR_DH_ELEC", "dept_head_elec", "dept123", "DepartmentHead", "Dr. Priya Sundaram", "depthead.elec@railsathi.gov.in", "+91 98765 33001", "STF_DH_ELEC", depts_map["Electrical"], divisions_map.get("delhi"), None)
        ]

        for uid, uname, pwd, urole, fname, uemail, uphone, stfid, dcode, divcode, trnno in demo_accounts:
            existing_u = db.query(User).filter(User.username == uname).first()
            if not existing_u:
                nu = User(
                    user_id=uid,
                    username=uname,
                    password_hash=pwd,
                    role=urole,
                    full_name=fname,
                    email=uemail,
                    phone_number=uphone,
                    department_code=dcode,
                    division_code=divcode,
                    is_active=True
                )
                db.add(nu)
                db.flush()
                if stfid:
                    nstf = Staff(
                        staff_id=stfid,
                        user_id=nu.user_id,
                        name=fname,
                        department_code=dcode,
                        division_code=divcode,
                        is_on_duty=True,
                        active_train_number=trnno
                    )
                    db.add(nstf)
                    db.flush()
            else:
                existing_u.full_name = fname
                existing_u.department_code = dcode
                existing_u.division_code = divcode
                existing_u.phone_number = uphone

        # 6. Seed Onboarded Staff System
        seed_onboarded_staff_system(db)

        db.commit()
        print("--- DATABASE INITIAL SEEDING COMPLETED SUCCESSFULLY ---")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()


def seed_onboarded_staff_system(db: Session):
    print("--- SEEDING ONBOARDED STAFF SYSTEM DATA ---")

    # 1. Ensure essential departments exist
    dept_mappings = {
        "RPF": "Railway Protection Force",
        "COMMERCIAL": "Commercial & Ticket Checking",
        "OPERATING": "Operating & Train Operations",
        "MECH_CLEAN": "Mechanical & Housekeeping",
        "MECH_COACH": "Mechanical (Coaching)",
        "ELEC": "Electrical & AC Maintenance",
        "CATERING": "Catering & Vending Services",
        "S&T": "Signal & Telecommunication",
        "CIVIL": "Civil Engineering & Works"
    }
    for code, name in dept_mappings.items():
        existing_dept = db.query(Department).filter(Department.department_code == code).first()
        if not existing_dept:
            db.add(Department(department_code=code, department_name=name, description=name))
            db.flush()


    # 2. Get list of actual trains & stations from DB
    trains = db.query(Train).all()
    stations = db.query(Station).all()

    target_trains = ["12801", "12002", "12301", "12951", "10215", "12424", "12260", "12626", "12724", "12622"]
    for t in trains[:20]:
        if t.train_number not in target_trains:
            target_trains.append(t.train_number)

    target_stations = ["NDLS", "PUNE", "CSMT", "HWH", "MAS", "ADI", "CNB", "BSB", "LKO", "GKP"]
    for s in stations[:20]:
        if s.station_code not in target_stations:
            target_stations.append(s.station_code)

    train_numbers = target_trains
    station_codes = target_stations


    staff_created_count = 0

    def upsert_staff_member(staff_id, name, designation, dept_code, train_num=None, stn_code=None):
        nonlocal staff_created_count
        user_id = f"USR_{staff_id}"
        username = staff_id.lower()

        user = db.query(User).filter(User.user_id == user_id).first()
        if not user:
            user = User(
                user_id=user_id,
                username=username,
                password_hash="staff123",
                role="Staff",
                full_name=name,
                department_code=dept_code,
                email=f"{username}@railsathi.gov.in",
                phone_number=f"98765{staff_created_count:05d}",
                is_active=True
            )
            db.add(user)
            db.flush()

        staff = db.query(Staff).filter(Staff.staff_id == staff_id).first()
        if not staff:
            staff = Staff(
                staff_id=staff_id,
                user_id=user.user_id,
                name=name,
                designation=designation,
                department_code=dept_code,
                is_on_duty=True,
                duty_status="ON_DUTY",
                active_train_number=train_num,
                assigned_station_code=stn_code
            )
            db.add(staff)
            staff_created_count += 1
        else:
            staff.name = name
            staff.designation = designation
            staff.department_code = dept_code
            staff.is_on_duty = True
            staff.duty_status = "ON_DUTY"
            staff.active_train_number = train_num
            staff.assigned_station_code = stn_code

        db.flush()

        duty_type = "TRAIN" if train_num else "STATION"
        duty = db.query(StaffDutyAssignment).filter(StaffDutyAssignment.staff_id == staff_id).first()
        if not duty:
            duty = StaffDutyAssignment(
                staff_id=staff_id,
                train_number=train_num,
                station_code=stn_code,
                duty_type=duty_type,
                duty_status="ON_DUTY"
            )
            db.add(duty)
        else:
            duty.train_number = train_num
            duty.station_code = stn_code
            duty.duty_type = duty_type
            duty.duty_status = "ON_DUTY"

    train_staff_templates = [
        ("RPF", "STF_RPF", "RPF Constable", "Rajesh Kumar"),
        ("RPF", "STF_RPF_SI", "RPF Sub-Inspector", "Vikram Singh"),
        ("COMMERCIAL", "STF_TTE", "TTE", "Amit Sharma"),
        ("COMMERCIAL", "STF_STE", "Senior Ticket Examiner", "Rakesh Verma"),
        ("OPERATING", "STF_GUARD", "Train Manager / Guard", "Anil Sharma"),
        ("OPERATING", "STF_PILOT", "Loco Pilot", "Dinesh Kumar"),
        ("OPERATING", "STF_APILOT", "Assistant Loco Pilot", "Sanjay Gupta"),
        ("MECH_CLEAN", "STF_HYG", "Coach Attendant", "Neha Singh"),
        ("MECH_CLEAN", "STF_OBHS", "OBHS Cleaning Staff", "Suresh Verma"),
        ("MECH_CLEAN", "STF_CLEAN", "Sanitation Supervisor", "Manoj Tiwari"),
        ("ELEC", "STF_ELEC", "AC Maintenance Technician", "Ramesh Chander"),
        ("ELEC", "STF_ELEC_ATT", "Train Electrical Attendant", "Vijay Kumar"),
        ("CATERING", "STF_CAT", "Pantry Manager", "Praveen Yadav"),
        ("CATERING", "STF_CAT_SUP", "Catering Service Supervisor", "Sunil Joshi"),
    ]

    for t_num in train_numbers[:20]:
        for dept_code, prefix, desig, base_name in train_staff_templates:
            sid = f"{prefix}_{t_num}"
            sname = f"{base_name} ({t_num})"
            upsert_staff_member(sid, sname, desig, dept_code, train_num=t_num)

    station_staff_templates = [
        ("OPERATING", "STF_SM", "Station Master", "Rajendra Prasad"),
        ("OPERATING", "STF_ASM", "Assistant Station Master", "Alok Pandey"),
        ("OPERATING", "STF_PN", "Pointsman", "Karan Bahadur"),
        ("COMMERCIAL", "STF_COMM_SUP", "Commercial Inspector", "Mahesh Babu"),
        ("COMMERCIAL", "STF_TICKET", "Station Ticket Inspector", "Sunita Rao"),
        ("COMMERCIAL", "STF_PARCEL", "Parcel Clerk", "Deepak Saxena"),
        ("RPF", "STF_RPF_STN", "RPF Station Inspector", "Harish Chandra"),
        ("RPF", "STF_RPF_CONST", "RPF Station Constable", "Bhagwan Das"),
        ("MECH_CLEAN", "STF_HYG_STN", "Station Cleaning Supervisor", "Ravi Shankar"),
        ("MECH_CLEAN", "STF_SAN_STN", "Sanitation Staff", "Santosh Kumar"),
        ("ELEC", "STF_ELEC_STN", "Station Electrical Tech", "Manish Malhotra"),
        ("ELEC", "STF_LIFT_STN", "Escalator & Lift Technician", "Girish Sharma"),
        ("S&T", "STF_ST_STN", "Signal & Telecom Inspector", "Venkatesh Rao"),
    ]

    for s_code in station_codes[:20]:
        for dept_code, prefix, desig, base_name in station_staff_templates:
            sid = f"{prefix}_{s_code}"
            sname = f"{base_name} ({s_code})"
            upsert_staff_member(sid, sname, desig, dept_code, stn_code=s_code)

    db.flush()
    print(f"[OK] Onboarded staff system seeded successfully: {staff_created_count} staff records.")

