/**
 * Created by fyang on 1/23/2017.
 */
// Code goes here
var equalOperatorPool = ["Make", "Model"];
var items = [];
var operatorPool=[
    {
        "OperatorCate":"L",//lookup
        "Operators":['=','!=']
    },
    {
        "OperatorCate":"N",//Numeric
        "Operators":['=','!=','&gt','&gt=','&lt','&lt=']
    },
    {
        "OperatorCate":"T",//Text
        "Operators":['=','!=','like','end with','start with']
    }

];

var fieldData=[];

var removeBtn = " <button type='button' class='btn btn-danger btn-xs remove pull-right'> <span class='glyphicon glyphicon-remove'></span></button>";
var isFieldValid=true;
var counter=1;


var myGroups={"Groups":[
    {
        "Group": "Crash",
        "id":"1",
        "Fields":
            [{"Variable":"SCI Case Type","SelectType":"MultiSelect","DBField":"SCI.Case_Type.TypeID","OperatorType":"L", "id":"11",
                "Values":[{"Value":4,"ValueText":"Adaptive Vehicle"},
                    {"Value":5,"ValueText":"Advanced Air Bag - NHTSA"},
                    {"Value":6,"ValueText":"Advanced Occupant Protection System - AOPS"},
                    {"Value":7,"ValueText":"Air Bag Related Adult Driver"},
                    {"Value":8,"ValueText":"Air Bag Related Adult Passenger"},
                    {"Value":9,"ValueText":"Air Bag Related Children in RFCSS"},
                    {"Value":10,"ValueText":"Air Bag Related Children NOT in RFCSS"},
                    {"Value":11,"ValueText":"Alternative Fuel"},
                    {"Value":12,"ValueText":"Ambulance"},
                    {"Value":13,"ValueText":"Child Safety Seat"},
                    {"Value":14,"ValueText":"Crash Avoidance Technology"},
                    {"Value":15,"ValueText":"Electric Vehicle"},
                    {"Value":16,"ValueText":"Front Center Air Bag"},
                    {"Value":17,"ValueText":"Guardrail End Treatment"},
                    {"Value":18,"ValueText":"Inflatable Seat Belt"},
                    {"Value":19,"ValueText":"Limousine Crash"},
                    {"Value":20,"ValueText":"Motorcoach Fire"},
                    {"Value":21,"ValueText":"Motorcoach Rollover"},
                    {"Value":22,"ValueText":"NITS - Backover"},
                    {"Value":23,"ValueText":"NITS - CO Poisoning"},
                    {"Value":24,"ValueText":"NITS - Hyper/Hypothermia"},
                    {"Value":25,"ValueText":"NITS - Other"},
                    {"Value":26,"ValueText":"NITS - Power Window"},
                    {"Value":27,"ValueText":"NITS - Roll Away"},
                    {"Value":28,"ValueText":"NITS - Trunk Entrapment"},
                    {"Value":29,"ValueText":"Not In Transport"},
                    {"Value":30,"ValueText":"ODI"},
                    {"Value":31,"ValueText":"Other"},
                    {"Value":32,"ValueText":"Other Government Partners"},
                    {"Value":33,"ValueText":"Redesigned Air Bag - NHTSA"},
                    {"Value":34,"ValueText":"Redesigned Air Bag - Partners"},
                    {"Value":35,"ValueText":"Rollover"},
                    {"Value":36,"ValueText":"School Bus"},
                    {"Value":37,"ValueText":"Self-Driving Vehicle"},
                    {"Value":38,"ValueText":"Side Air Bag"},
                    {"Value":39,"ValueText":"Small Overlap/Oblique"},
                    {"Value":40,"ValueText":"Unintended Acceleration (UA)"},
                    {"Value":41,"ValueText":"Unknown"}]},


                {"Variable":"Year","SelectType":"Dropdown","DBField":"CISS.CRASH.CASEYEAR","OperatorType":"N","id":"12",
                    "Values":[{"Value":"2016","ValueText":"2016"},
                        {"Value":"2015","ValueText":"2015"}]},

                {"Variable":"Month","SelectType":"Dropdown","DBField":"month(CISS.CRASH.crashdate)","OperatorType":"N","id":"13",
                    "Values":[{"Value":"Jan","ValueText":"Jan"},
                        {"Value":"Feb","ValueText":"Feb"},
                        {"Value":"Mar","ValueText":"Mar"},
                        {"Value":"Apr","ValueText":"Apr"},
                        {"Value":"May","ValueText":"May"},
                        {"Value":"Jun","ValueText":"Jun"},
                        {"Value":"Jul","ValueText":"Jul"},
                        {"Value":"Aug","ValueText":"Aug"},
                        {"Value":"Sep","ValueText":"Sep"},
                        {"Value":"Oct","ValueText":"Oct"},
                        {"Value":"Nov","ValueText":"Nov"},
                        {"Value":"Dec","ValueText":"Dec"}]},

                {"Variable":"State","SelectType":"Dropdown","DBField":"SCI.Case_State.State","OperatorType":"L","id":"14",
                    "Values":[
                        {
                            "ValueText": "Alabama",
                            "Value": "AL"
                        },
                        {
                            "ValueText": "Alaska",
                            "Value": "AK"
                        },
                        {
                            "ValueText": "American Samoa",
                            "Value": "AS"
                        },
                        {
                            "ValueText": "Arizona",
                            "Value": "AZ"
                        },
                        {
                            "ValueText": "Arkansas",
                            "Value": "AR"
                        },
                        {
                            "ValueText": "California",
                            "Value": "CA"
                        },
                        {
                            "ValueText": "Colorado",
                            "Value": "CO"
                        },
                        {
                            "ValueText": "Connecticut",
                            "Value": "CT"
                        },
                        {
                            "ValueText": "Delaware",
                            "Value": "DE"
                        },
                        {
                            "ValueText": "District Of Columbia",
                            "Value": "DC"
                        },
                        {
                            "ValueText": "Federated States Of Micronesia",
                            "Value": "FM"
                        },
                        {
                            "ValueText": "Florida",
                            "Value": "FL"
                        },
                        {
                            "ValueText": "Georgia",
                            "Value": "GA"
                        },
                        {
                            "ValueText": "Guam",
                            "Value": "GU"
                        },
                        {
                            "ValueText": "Hawaii",
                            "Value": "HI"
                        },
                        {
                            "ValueText": "Idaho",
                            "Value": "ID"
                        },
                        {
                            "ValueText": "Illinois",
                            "Value": "IL"
                        },
                        {
                            "ValueText": "Indiana",
                            "Value": "IN"
                        },
                        {
                            "ValueText": "Iowa",
                            "Value": "IA"
                        },
                        {
                            "ValueText": "Kansas",
                            "Value": "KS"
                        },
                        {
                            "ValueText": "Kentucky",
                            "Value": "KY"
                        },
                        {
                            "ValueText": "Louisiana",
                            "Value": "LA"
                        },
                        {
                            "ValueText": "Maine",
                            "Value": "ME"
                        },
                        {
                            "ValueText": "Marshall Islands",
                            "Value": "MH"
                        },
                        {
                            "ValueText": "Maryland",
                            "Value": "MD"
                        },
                        {
                            "ValueText": "Massachusetts",
                            "Value": "MA"
                        },
                        {
                            "ValueText": "Michigan",
                            "Value": "MI"
                        },
                        {
                            "ValueText": "Minnesota",
                            "Value": "MN"
                        },
                        {
                            "ValueText": "Mississippi",
                            "Value": "MS"
                        },
                        {
                            "ValueText": "Missouri",
                            "Value": "MO"
                        },
                        {
                            "ValueText": "Montana",
                            "Value": "MT"
                        },
                        {
                            "ValueText": "Nebraska",
                            "Value": "NE"
                        },
                        {
                            "ValueText": "Nevada",
                            "Value": "NV"
                        },
                        {
                            "ValueText": "New Hampshire",
                            "Value": "NH"
                        },
                        {
                            "ValueText": "New Jersey",
                            "Value": "NJ"
                        },
                        {
                            "ValueText": "New Mexico",
                            "Value": "NM"
                        },
                        {
                            "ValueText": "New York",
                            "Value": "NY"
                        },
                        {
                            "ValueText": "North Carolina",
                            "Value": "NC"
                        },
                        {
                            "ValueText": "North Dakota",
                            "Value": "ND"
                        },
                        {
                            "ValueText": "Northern Mariana Islands",
                            "Value": "MP"
                        },
                        {
                            "ValueText": "Ohio",
                            "Value": "OH"
                        },
                        {
                            "ValueText": "Oklahoma",
                            "Value": "OK"
                        },
                        {
                            "ValueText": "Oregon",
                            "Value": "OR"
                        },
                        {
                            "ValueText": "Palau",
                            "Value": "PW"
                        },
                        {
                            "ValueText": "Pennsylvania",
                            "Value": "PA"
                        },
                        {
                            "ValueText": "Puerto Rico",
                            "Value": "PR"
                        },
                        {
                            "ValueText": "Rhode Island",
                            "Value": "RI"
                        },
                        {
                            "ValueText": "South Carolina",
                            "Value": "SC"
                        },
                        {
                            "ValueText": "South Dakota",
                            "Value": "SD"
                        },
                        {
                            "ValueText": "Tennessee",
                            "Value": "TN"
                        },
                        {
                            "ValueText": "Texas",
                            "Value": "TX"
                        },
                        {
                            "ValueText": "Utah",
                            "Value": "UT"
                        },
                        {
                            "ValueText": "Vermont",
                            "Value": "VT"
                        },
                        {
                            "ValueText": "Virgin Islands",
                            "Value": "VI"
                        },
                        {
                            "ValueText": "Virginia",
                            "Value": "VA"
                        },
                        {
                            "ValueText": "Washington",
                            "Value": "WA"
                        },
                        {
                            "ValueText": "West Virginia",
                            "Value": "WV"
                        },
                        {
                            "ValueText": "Wisconsin",
                            "Value": "WI"
                        },
                        {
                            "ValueText": "Wyoming",
                            "Value": "WY"
                        }
                    ]},

                {"Variable":"In-Transport Vehicles","SelectType":"Range","DBField":"count(CISS.VEH.VEHID) where Transport=In-Transport","OperatorType":"N","id":"15",
                    "Values":[{"Value":1,"ValueText":1},
                        {"Value":2,"ValueText":2},
                        {"Value":3,"ValueText":3},
                        {"Value":4,"ValueText":4},
                        {"Value":5,"ValueText":5},
                        {"Value":6,"ValueText":6},
                        {"Value":7,"ValueText":7},
                        {"Value":8,"ValueText":8},
                        {"Value":9,"ValueText":9},
                        {"Value":10,"ValueText":10},
                        {"Value":11,"ValueText":11}]},

                {"Variable":"Mortality/Injury Severity","SelectType":"Dropdown","DBField":"N/A","OperatorType":"L","id":"16",
                    "Values":[{"Value":1,"ValueText":"Fatalities"},
                        {"Value":2,"ValueText":"Serious Injuries"},
                        {"Value":3,"ValueText":"Minor/Moderate Injuries"},
                        {"Value":4,"ValueText":"No Injuries"}]}]
    },
    {
        "Group":"Vehicle",
        "id":"2",
        "Fields":[{"Variable":"Make","SelectType":"MultiSelect","DBField":"CISS.VEH.MAKE","OperatorType":"L", "id":"21"},
            {"Variable":"Model","SelectType":"MultiSelect","DBField":"CISS.VEH.MODEL","OperatorType":"L","id":"22"},
            {"Variable":"Body Category","SelectType":"Dropdown","DBField":"CISS.VEH.BODYCAT","OperatorType":"L","id":"23",
                "Values":[{"Value":1,"ValueText":"Automobiles"},
                    {"Value":2,"ValueText":"Automobile Derivatives"},
                    {"Value":3,"ValueText":"Utility Vehicles"},
                    {"Value":4,"ValueText":"Van Based Light Trucks"},
                    {"Value":5,"ValueText":"Light Conventional Trucks"},
                    {"Value":6,"ValueText":"Other Light Trucks"},
                    {"Value":7,"ValueText":"Buses (Excludes Van Based GVWR  = 4,536 kgs)"},
                    {"Value":8,"ValueText":"Medium/heavy Trucks"},
                    {"Value":9,"ValueText":"Motored Cycles"},
                    {"Value":10,"ValueText":"Other Vehicles"},
                    {"Value":11,"ValueText":"Motor Homes"},
                    {"Value":-9999,"ValueText":"Unknown Body Type"}]},

            {"Variable":"Model Year","SelectType":"MultiSelect","DBField":"CISS.VEH.MODELYEAR","OperatorType":"N","id":"24",
                "Values":[{"Value":-1      ,"ValueText":"Blanks"},
                    {"Value":9999 ,"ValueText":"Unknown"},
                    {"Value":9998 ,"ValueText":"Not Reported"},
                    {"Value":2017 ,"ValueText":2017},
                    {"Value":2016 ,"ValueText":2016},
                    {"Value":2015 ,"ValueText":2015},
                    {"Value":2014 ,"ValueText":2014},
                    {"Value":2013 ,"ValueText":2013},
                    {"Value":2012 ,"ValueText":2012},
                    {"Value":2011 ,"ValueText":2011},
                    {"Value":2010 ,"ValueText":2010},
                    {"Value":2009 ,"ValueText":2009},
                    {"Value":2008 ,"ValueText":2008},
                    {"Value":2007 ,"ValueText":2007},
                    {"Value":2006 ,"ValueText":2006},
                    {"Value":2005 ,"ValueText":2005},
                    {"Value":2004 ,"ValueText":2004},
                    {"Value":2003 ,"ValueText":2003},
                    {"Value":2002 ,"ValueText":2002},
                    {"Value":2001 ,"ValueText":2001},
                    {"Value":2000 ,"ValueText":2000},
                    {"Value":1999 ,"ValueText":1999},
                    {"Value":1998 ,"ValueText":1998},
                    {"Value":1997 ,"ValueText":1997},
                    {"Value":1996 ,"ValueText":1996},
                    {"Value":1995 ,"ValueText":1995},
                    {"Value":1994 ,"ValueText":1994},
                    {"Value":1993 ,"ValueText":1993},
                    {"Value":1992 ,"ValueText":1992},
                    {"Value":1991 ,"ValueText":1991},
                    {"Value":1990 ,"ValueText":1990},
                    {"Value":1989 ,"ValueText":1989},
                    {"Value":1988 ,"ValueText":1988},
                    {"Value":1987 ,"ValueText":1987},
                    {"Value":1986 ,"ValueText":1986},
                    {"Value":1985 ,"ValueText":1985},
                    {"Value":1984 ,"ValueText":1984},
                    {"Value":1983 ,"ValueText":1983},
                    {"Value":1982 ,"ValueText":1982},
                    {"Value":1981 ,"ValueText":1981},
                    {"Value":1980 ,"ValueText":1980},
                    {"Value":1979 ,"ValueText":1979},
                    {"Value":1978 ,"ValueText":1978},
                    {"Value":1977 ,"ValueText":1977},
                    {"Value":1976 ,"ValueText":1976},
                    {"Value":1975 ,"ValueText":1975},
                    {"Value":1974 ,"ValueText":1974},
                    {"Value":1973 ,"ValueText":1973},
                    {"Value":1972 ,"ValueText":1972},
                    {"Value":1971 ,"ValueText":1971},
                    {"Value":1970 ,"ValueText":1970},
                    {"Value":1969 ,"ValueText":1969},
                    {"Value":1968 ,"ValueText":1968},
                    {"Value":1967 ,"ValueText":1967},
                    {"Value":1966 ,"ValueText":1966},
                    {"Value":1965 ,"ValueText":1965},
                    {"Value":1964 ,"ValueText":1964},
                    {"Value":1963 ,"ValueText":1963},
                    {"Value":1962 ,"ValueText":1962},
                    {"Value":1961 ,"ValueText":1961},
                    {"Value":1960 ,"ValueText":1960},
                    {"Value":1959 ,"ValueText":1959},
                    {"Value":1958 ,"ValueText":1958},
                    {"Value":1957 ,"ValueText":1957},
                    {"Value":1956 ,"ValueText":1956},
                    {"Value":1955 ,"ValueText":1955},
                    {"Value":1954 ,"ValueText":1954},
                    {"Value":1953 ,"ValueText":1953},
                    {"Value":1952 ,"ValueText":1952},
                    {"Value":1951 ,"ValueText":1951},
                    {"Value":1950 ,"ValueText":1950},
                    {"Value":1949 ,"ValueText":1949},
                    {"Value":1948 ,"ValueText":1948},
                    {"Value":1947 ,"ValueText":1947},
                    {"Value":1946 ,"ValueText":1946},
                    {"Value":1945 ,"ValueText":1945},
                    {"Value":1944 ,"ValueText":1944},
                    {"Value":1943 ,"ValueText":1943},
                    {"Value":1942 ,"ValueText":1942},
                    {"Value":1941 ,"ValueText":1941},
                    {"Value":1940 ,"ValueText":1940},
                    {"Value":1939 ,"ValueText":1939},
                    {"Value":1938 ,"ValueText":1938},
                    {"Value":1937 ,"ValueText":1937},
                    {"Value":1936 ,"ValueText":1936},
                    {"Value":1935 ,"ValueText":1935},
                    {"Value":1934 ,"ValueText":1934},
                    {"Value":1933 ,"ValueText":1933},
                    {"Value":1932 ,"ValueText":1932},
                    {"Value":1931 ,"ValueText":1931},
                    {"Value":1930 ,"ValueText":1930},
                    {"Value":1929 ,"ValueText":1929},
                    {"Value":1928 ,"ValueText":1928},
                    {"Value":1927 ,"ValueText":1927},
                    {"Value":1926 ,"ValueText":1926},
                    {"Value":1925 ,"ValueText":1925},
                    {"Value":1924 ,"ValueText":1924},
                    {"Value":1923 ,"ValueText":1923},
                    {"Value":1922 ,"ValueText":1922},
                    {"Value":1921 ,"ValueText":1921},
                    {"Value":1920 ,"ValueText":1920}]}]
    },




    {
        "Group":"Vehicle Damage",
        "id":"3",
        "Fields":
            [{"Variable":"Plane of Impact","SelectType":"Dropdown","DBField":"CISS.DEFORM.Defloc","OperatorType":"L","id":"31",
                "Values":[{"Value":1,"ValueText":"F Front"},
                    {"Value":2,"ValueText":"B Back (rear)"},
                    {"Value":3,"ValueText":"L Left side"},
                    {"Value":4,"ValueText":"R Right side"},
                    {"Value":5,"ValueText":"T Top"},
                    {"Value":6,"ValueText":"U Undercarriage"},
                    {"Value":9,"ValueText":"9 Unknown"},
                    {"Value":36,"ValueText":"School Bus"},
                    {"Value":37,"ValueText":"Self-Driving Vehicle"},
                    {"Value":38,"ValueText":"Side Air Bag"},
                    {"Value":39,"ValueText":"Small Overlap/Oblique"},
                    {"Value":40,"ValueText":"Unintended Acceleration (UA)"},
                    {"Value":41,"ValueText":"Unknown"}]},

                {"Variable":"Plane Sub-Section","SelectType":"Dropdown","DBField":"CISS.DEFORM.Longlatloc","OperatorType":"L","id":"32",
                    "Values":[{"Value":3,"ValueText":"C  Center - front or rear"},
                        {"Value":1,"ValueText":"D  Distributed-side or end"},
                        {"Value":2,"ValueText":"L  Left - front or rear"},
                        {"Value":4,"ValueText":"R  Right - front or rear"},
                        {"Value":8,"ValueText":"Y  Side (F + P) or end (L + C)"},
                        {"Value":9,"ValueText":"Z  Side (P + B) or end (C + R)"},
                        {"Value":6,"ValueText":"P  Side center section - L or R"},
                        {"Value":5,"ValueText":"F  Side Front - left or right"},
                        {"Value":7,"ValueText":"B  Side rear - left or right"},
                        {"Value":-9999,"ValueText":"9 Unknown"}]},

                {"Variable":"PDOF","SelectType":"Range","DBField":"CISS.DEFORM.DOF","OperatorType":"N","id":"33","Units":
                    ["degrees"],"Validation":"1"},
                {"Variable":"Delta V","SelectType":"Range","DBField":"CISS.Deform.DVTotal","OperatorType":"N","id":"34","Validation":"1",
                    "Units":["mph","kmph"]},
                {"Variable":"Barrier Equivalent Speed","SelectType":"Range","DBField":"DEFORM.DVBARRIER","OperatorType":"N","id":"35","Validation":"1",
                    "Units":["mph","kmph"]},
                {"Variable":"Rollover","SelectType":"Dropdown","DBField":"CISS.DEFORM.Distribution=","OperatorType":"L","id":"36",
                    "Values":[
                        {"Value":1,"ValueText":"True"},
                        {"Value":0,"ValueText":"False"}
                    ]
                },
                {"Variable":"Electronic Data Recorder","SelectType":"Dropdown","DBField":"N/A","OperatorType":"L","id":"37",
                    "Values":[
                        {"Value":1,"ValueText":"True"},
                        {"Value":0,"ValueText":"False"}
                    ]},
                {"Variable":"Crash Avoidance Equipment Available","SelectType":"Dropdown","DBField":"N/A","OperatorType":"L","id":"38",
                    "Values":[{"Value":1,"ValueText":"Assisted Braking"},
                        {"Value":3,"ValueText":"Blind Spot Detection"},
                        {"Value":5,"ValueText":"FCW with Auto Braking"},
                        {"Value":6,"ValueText":"FCW without Auto Braking"},
                        {"Value":7,"ValueText":"LDW with Lane Keeping"},
                        {"Value":8,"ValueText":"LDW without Lane Keeping"}]},
                {"Variable":"Crash Avoidance Equipment Activated","SelectType":"Dropdown","DBField":"N/A","OperatorType":"L","id":"39",
                    "Values":[{"Value":1,"ValueText":"Assisted Braking"},
                        {"Value":3,"ValueText":"Blind Spot Detection"},
                        {"Value":5,"ValueText":"FCW with Auto Braking"},
                        {"Value":6,"ValueText":"FCW without Auto Braking"},
                        {"Value":7,"ValueText":"LDW with Lane Keeping"},
                        {"Value":8,"ValueText":"LDW without Lane Keeping"}]}]
    },


    {
        "Group": "Occupant",
        "id":"4",
        "Fields":
            [{"Variable":"Age","SelectType":"Range","DBField":"CISS.OCC.AGE","OperatorType":"N","Validation":"1","id":"41",
                "Units":["Months","Year"]},
                {"Variable":"Sex","SelectType":"MultiSelect","DBField":"CISS.OCC.GENDER","OperatorType":"L","id":"42",
                    "Values":[{"Value":1,"ValueText":"Female"},
                        {"Value":2,"ValueText":"Male"},
                        {"Value":4,"ValueText":"Unknown"},
                        {"Value":5,"ValueText":"Female, pregnant - 1st trimester (1st-3rd month)"},
                        {"Value":6,"ValueText":"Female, pregnant - 2nd trimester (4th-6th month)"},
                        {"Value":7,"ValueText":"Female, pregnant - 3rd trimester (7th-9th month)"},
                        {"Value":8,"ValueText":"Female, pregnant - trimester unknown"}]},
                {"Variable":"Mortality/Injury Severity","SelectType":"Dropdown","DBField":"N/A","OperatorType":"L","id":"43",
                    "Values":[{"Value":1,"ValueText":"Fatality"},
                        {"Value":2,"ValueText":"Serious Injury"},
                        {"Value":3,"ValueText":"Minor/Moderate Injury"},
                        {"Value":4,"ValueText":"No Injury"}]},
                {"Variable":"Seat Position","SelectType":"Dropdown","DBField":"CISS.SEATLOC.SEATLOCATION","OperatorType":"L","id":"44",
                    "Values":[{"Value":1,"ValueText":"Front Row Left "},
                        {"Value":2,"ValueText":"Front Row Middle"},
                        {"Value":3,"ValueText":"Front Row Right "},
                        {"Value":4,"ValueText":"Second Row Left"},
                        {"Value":5,"ValueText":"Second Row Middle "},
                        {"Value":6,"ValueText":"Second Row Right "},
                        {"Value":7,"ValueText":"Third Row Left"},
                        {"Value":8,"ValueText":"Third Row Middle"},
                        {"Value":9,"ValueText":"Third Row Right"},
                        {"Value":10,"ValueText":"Fourth Row Left"},
                        {"Value":11,"ValueText":"Fourth Row Middle"},
                        {"Value":12,"ValueText":"Fourth Row Right"},
                        {"Value":13,"ValueText":"Fifth Row Left "},
                        {"Value":14,"ValueText":"Fifth Row Middle"},
                        {"Value":15,"ValueText":"Fifth Row Right"}]},
                {"Variable":"Height","SelectType":"Range","DBField":"CISS.OCC.HEIGHT","OperatorType":"N","Validation":"1","id":"45",
                    "Units":["cm","in"]},
                {"Variable":"Weight","SelectType":"Range","DBField":"CISS.OCC.WEIGHT","OperatorType":"N","Validation":"1","id":"46",
                    "Units":["kg","lb"]}]
    },



    {
        "Group": "Injury",
        "id":"5",
        "Fields":[{"Variable":"Body Region","SelectType":"Dropdown","DBField":"BRI","OperatorType":"L","id":"51",
            "Values":[{"Value":1,"ValueText":"Abdomen"},
                {"Value":2,"ValueText":"Ankle - foot"},
                {"Value":3,"ValueText":"Arm (upper)"},
                {"Value":4,"ValueText":"Back - thoracolumbar spine"},
                {"Value":5,"ValueText":"Chest"},
                {"Value":6,"ValueText":"Elbow"},
                {"Value":7,"ValueText":"Face"},
                {"Value":8,"ValueText":"Forearm"},
                {"Value":9,"ValueText":"Head - skull"},
                {"Value":10,"ValueText":"Injured, unknown region"},
                {"Value":11,"ValueText":"Knee"},
                {"Value":12,"ValueText":"Leg (lower)"},
                {"Value":13,"ValueText":"Lower limb(s) (whole or unknown part)"},
                {"Value":14,"ValueText":"Neck - cervical spine"},
                {"Value":15,"ValueText":"Pelvic - hip"},
                {"Value":16,"ValueText":"Shoulder"},
                {"Value":17,"ValueText":"Thigh"},
                {"Value":18,"ValueText":"Upper limb(s) (whole or unknown part)"},
                {"Value":19,"ValueText":"Wrist - hand"}]},
            {"Variable":"AIS/NASS Code","SelectType":"Textbox","DBField":"AIS.Code","OperatorType":"T","id":"52","Validation":"1"},
            {"Variable":"Max AIS","SelectType":"Range","DBField":"This is from VAID (only the 7th digit of the AIS Code)","OperatorType":"N","id":"53","Validation":"1"},
            {"Variable":"ISS(injury Severity Score)","SelectType":"Range","DBField":"N/A","OperatorType":"N","id":"54","Validation":"1"}]
    },

    {
        "Group":"Restraint Use",
        "id":"6",
        "Fields":[{"Variable":"Air Bag location","SelectType":"Dropdown","DBField":"CISS.AIRBAG.LOCATION","OperatorType":"L","id":"61",
            "Values":[{"Value":1,"ValueText":"Bottom Instrument Panel"},
                {"Value":2,"ValueText":"Door/Panel"},
                {"Value":3,"ValueText":"Mid Instrument Panel"},
                {"Value":4,"ValueText":"Other"},
                {"Value":5,"ValueText":"Roof Side Rail"},
                {"Value":6,"ValueText":"Seat Back"},
                {"Value":7,"ValueText":"Steering Wheel Hub"},
                {"Value":8,"ValueText":"Top Instrument Panel"},
                {"Value":11,"ValueText":"Unknown"}]},
            {"Variable":"Air Bag Deployed","SelectType":"Dropdown","DBField":"CISS.AIRBAG.DEPLOY","OperatorType":"L","id":"62",
                "Values":[{"Value":1,"ValueText":"Deployed during crash (as a result of impact)"},
                    {"Value":2,"ValueText":"Deployed inadvertently just prior to crash"},
                    {"Value":3,"ValueText":"Deployed, details unknown"},
                    {"Value":4,"ValueText":"Non-collision deployment"},
                    {"Value":5,"ValueText":"Not deployed"},
                    {"Value":-8871,"ValueText":"No air bag available for this crash (disconnected/not reinstalled)"},
                    {"Value":-8870,"ValueText":"Unknown status if air bag available for this crash"},
                    {"Value":6,"ValueText":"Unknown if Deployed"}]},
            {"Variable":"Child Seat Used","SelectType":"Dropdown","DBField":"CISS.CISS.CHILDSEAT.","OperatorType":"L","id":"63",
                "Values":[{"Value":1,"ValueText":"No"},
                    {"Value":2,"ValueText":"Yes"},
                    {"Value":3,"ValueText":"Unknown"}]}]
    }
]};


//Form the json object for single condition
function getSingleConditionData(condition) {
    var fieldTxt = condition.find('.field').attr('value');
    var operatorTxt = "";
    var operator = condition.find('.operator');
    var right = condition.find('.right');
    var rightTxt = "";
    var data={};

    operatorTxt = operator.find('option:selected').text();


    var selected=right.find('option:selected');
    if(selected.length>1)//mutiSelect
    {
        var rigthtTxtArray=[];
        $.each(selected,function (i,s) {
            rigthtTxtArray.push($(s).attr('value'));
        });
        rightTxt='('+rigthtTxtArray.join(',')+')';
        if(operatorTxt=='=')
        {
            operatorTxt='IN';
        }
        else
        {
            operatorTxt='NOT IN';
        }

    }
    else if(selected.length==1)
    {
        rightTxt = right.find('option:selected').attr('value');
    }else
    {
        rightTxt=right.val();
    }


    data.type='condition';
    data.id=fieldTxt;
    data.relation=operatorTxt;
    data.value=rightTxt;
    data.variable=condition.find('.field').text();
    return data;
}


function generateTransportData(condition) {
    var dataAaray=[];
    var data={};
    condition.children('div').each(function() {

        var current = $(this);

        var isGroup = current.hasClass('group');
        var temp = {};
        if (current.hasClass('andor')){
            //find the andor select
            var andorselect = current.find('.andorSelect');
            var value = andorselect.find('option:selected').text();

            temp.type='operator';
            temp.value=value;
        } else if (!isGroup && current.hasClass('condition')) //straight single condition
        {
            temp = getSingleConditionData(current);
        } else if (isGroup) //group recurse
        {
            //temp = "{'type':'group','conditions':["+generateTransportData(current)+"]}";
            temp.type='group';
            temp.conditions= generateTransportData(current);

        }
        if(!$.isEmptyObject(temp))
            dataAaray.push(temp);

    });


    return dataAaray;
}


$(document).ready(function() {


    getAllVehicleMakes();
    getAllVehicleModels();

    populateFields();

    $('#getJson').prop('disabled',true);
    $('#getJson').click(function () {
        var jarray = generateTransportData($('#container'));
        var data = {"conditions": []};
        data.conditions = jarray;



        console.log(data);
        //console.log(getSqlQueryFromJson(data));
        //console.log(JSON.stringify(data));
        $('#erroMsg').empty();
        if (validateGroups()&&$('form').valid()) {

        $.post("http://localhost:49468/api/AdvancedSearch", data, function (data) {
            var query = data;
            $('#select').text(query.select);
            $('#select').css('color', 'black');
            $('#from').text(query.from);
            $('#where').text(query.where);
           // $('#queryModal').modal('show');
        }).fail(function (xhr, textStatus, erroThrown) {
            $('#select').text('Fail to generate query.').css('color', 'red');

            $('#queryModal').modal('show');
        });
        }
        else if(!validateGroups()){

            $('#groupErrorMsg').modal('show');

        }

    });


    $('form').validate(
        {
            rules:{
                'input_text[]':"required",
                'multiselect[]':"required"
            },
            submitHandler:function(){
                return false;
            }
        }
    );



    function validateGroups() {

        var groups=$('#container').find('.group');
        var isValid=true;


        $.each(groups, function (i,g) {
           var conditions=$(g).find('.condition');
           if(conditions.length==0) {
               isValid = false;

               return false;
           }
        });

        return isValid;
    }

    $('#fields').on('click','.field-group-heading',function () {
        $('.field-group-heading-selected').removeClass('field-group-heading-selected');
        $(this).addClass('field-group-heading-selected');

    });

    $('#addGroup').click(function() {
        var selectedGroup=$('.selected');
        var newGroup=addBlankGroup(selectedGroup);
        addAndOrOptions(newGroup);
        $('.andorSelect').select2({
            minimumResultsForSearch: -1
        });
       // updateQuery();
    });





  /*  $('#getConditionString').click(function() {

        updateQuery();
    });*/

    $('#removeAll').click(function () {
      $('#removeAllModal').modal('show');
    });

    $('#removeConfirmBtn').click(function () {
        $('#container').empty().addClass('selected');
        $('#query').empty();
        $('#removeAllModal').modal('hide');
        $('#getJson').prop('disabled',true);
    });




   /* //Event delegate to select change, then update query.
    $('#container').on('change','select',function (e) {
        updateQuery();
    });*/



    //Event delegate. Add click event dynamically
    $('#container').on('click', '.group', function(e) {
        $('.selected').removeClass('selected');
        $(this).addClass("selected");
      //  updateQuery();
        e.stopPropagation();

    });

  /*  //Required field validation
    $('#container').on('blur keyup change','.right-textbox',function(e){
        if($(this).val().length>0)
        {
            $(this).next().remove();
            isValid=true;
        }
        else
        {

            $(this).after(requiredMsg);
            isValid=false;
        }

        updateQuery();
    });*/



    //Event delegate for remove button click
    $('#container').on('click', '.remove', function(e) {
        var prev;
        //Check if remove is in the group
        var group=$(this).parent().parent();
        var parent=$(this).parent();
        //Remove btn on group.
        if(group.hasClass('group')&&!parent.hasClass('condition'))
        {
            prev=group.prev();
            parent=group;
            group.parent().addClass('selected');
        }
        else
        {
            prev= $(this).parent().prev();
            parent=$(this).parent();
        }
        //If previous element is andor, remove it.

        if (prev.hasClass('andor')) {
            prev.remove();
        }

        //If it's the first element or 2nd but 1st is remove btn, delete operator
        if (!prev.length || prev.hasClass('removeRow')) {
            var next =parent.next();
            next.remove();
        }

        parent.remove();
       // updateQuery();
        e.stopPropagation();
        if($('#container').is(':empty')){
            $('#getJson').prop('disabled',true);
        }
    });

    $('#container').click(function() {
        $('.selected').removeClass('selected');
        $(this).addClass("selected");
    });

    //Field add click
    $('#fields').on('click','.btn-add',function(e) {
        var field=$(this).parent().parent().data('field');
        var condition = getCondition(field);
        $('.selected').append(condition);
        addAndOrOptions(condition);

        //Bueatify select
       setHtmlBehavior(field,condition);



       // updateQuery();
        e.stopPropagation();
        $('#getJson').prop('disabled',false);
    });






  /*  //Save search click
    $('#saveSearch').click(function (e) {
        e.preventDefault();
        $('#saveModal').modal('show');

    });
*/


    $('#saveSearchModal').click(function (){
       var search={};
        search.searchData=generateTransportData($('#container'));
       // search.searchContent=$('#container').html();
      var searches={};

       if(localStorage.getItem('maxId')==null)
       {
           localStorage.setItem('maxId',0);
       }

       if(JSON.parse(localStorage.getItem('searches'))==null)
       {
         searches={
            "searches":[]
        };

         localStorage.setItem('searches',JSON.stringify(searches));
       }

       searches=JSON.parse(localStorage.getItem('searches'));
       var maxId=localStorage.getItem('maxId');
       search.id=++maxId;
       localStorage.setItem('maxId',maxId);
       search.name=$('#searchName').val();
       if(search.name.length=='')
       {
           search.name='Search name unspecified';
       }

       //Tell if the search exists
       /* var exSearch=_.findWhere(searches,{id:search.id});
        if(exSearch!=null)
        {
            _.extend(_.findWhere(searches,{id:search.id}),search);
        }
*/


       searches.searches.push(search);
       localStorage.setItem('searches',JSON.stringify(searches));

       var savedSearchContainer=$("<tr class='row'>" +
           "<td class='col-xs-8 search-name'>"+search.name+"</td>" +
           "<td class='col-xs-2 btn btn-default btn-sm edit-search'><span class='glyphicon glyphicon-edit'></span></td>" +
           "<td class='col-xs-2 btn btn-default btn-sm remove-search'><span class='glyphicon glyphicon-remove'></span></td>" +
           "</tr>");

       savedSearchContainer.data('search',search);
       $('#savedSearches').append(savedSearchContainer);

       $('#saveModal').modal('hide');
    });




    $('#saveModal').on('hidden.bs.modal',function (e) {
       $(this).find('input').val('').end();
    });

    $('#queryModal').on('hidden.bs.modal',function (e) {
        $('#select').text('');

        $('#from').text('');
        $('#where').text('');
    });

    function setHtmlBehavior(field,condition) {
        $('.andorSelect').select2({
            minimumResultsForSearch: -1
        });
        $('.operator').select2({
            minimumResultsForSearch: -1
        });

        var select=condition.find('.right');
        if(field.SelectType=='MultiSelect')
        {
            select.select2({
                allowClear:true,
                closeOnSelect:false
            });
        }else if(field.SelectType=='Dropdown')
        {
            select.select2({
                minimumResultsForSearch: -1
            });
        }

        $('select').on("select2:select", function (e) {
            $(window).scroll();
        });

        if(field.OperatorType=='N')
            condition.find('.right').keyup(function () {
                this.value = this.value.replace(/[^0-9\.]/g,'');
            });

    }


    /*$('#savedSearches').on('click','.remove-search',function (e) {

          var search=$(this).parent().data('search');

          var searches=JSON.parse(localStorage.getItem('searches'));
          searches.searches=_.without(searches.searches,_.findWhere(searches.searches,{id:search.id}));
          localStorage.setItem('searches',JSON.stringify(searches));
          $(this).parent().remove();
    });

    $('#savedSearches').on('click','.edit-search',function (e) {
         var search=$(this).parent().data('search');
         $('#container').empty();
         loadSavedGroup($('#container'),search.searchData.conditions);


    });*/

    /*loadSavedSearches();
    //Load the saved searches from localstorage
    function  loadSavedSearches() {
        var searches=JSON.parse(localStorage.getItem('searches'));
        if(searches!=null)
        {
            $.each(searches.searches,function (i,s) {
                var savedSearchContainer=$("<tr class='row'>" +
                    "<td class='col-xs-8 search-name'>"+s.name+"</td>" +
                    "<td class='col-xs-2 btn btn-default btn-sm edit-search'><span class='glyphicon glyphicon-edit'></span></td>" +
                    "<td class='col-xs-2 btn btn-default btn-sm remove-search'><span class='glyphicon glyphicon-remove'></span></td>" +
                    "</tr>");

                savedSearchContainer.data('search',s);
                $('#savedSearches').append(savedSearchContainer);
            })
        }
    }





    function loadSavedGroup(currGroup,conditions) {
        $.each(conditions,function (i,condition) {
            var type=condition.type;
            if(type=='condition')
            {

                var variable=condition.variable;
                //find the field to fill the condition
                var field=_.find(fieldData,function (f) {
                    return f.Variable==variable;
                });
                var conditionHtml=getCondition(field);

                //Pre fill selected
                if(condition.relation=='IN'){
                    var multiString=condition.value.slice(1,-1);
                    conditionHtml.find('.right').val(multiString.split(','));

                }
                else if(condition.relation=='NOT IN'){
                    var multiString=condition.value.slice(1,-1);
                    conditionHtml.find('.right').val(multiString.split(','));
               }else
                {
                    conditionHtml.find('.right').val(condition.value);
                }

                conditionHtml.find('.operator').val(condition.relation);
                currGroup.append(conditionHtml);
                setHtmlBehavior(field,conditionHtml);


            }
            else if(type=='operator')
            {
                var andOrOptions = $("<div class='andor row'><select class=andorSelect><option class=and>AND</option><option class=or>OR</option><select></div>");
                andOrOptions.find('select').val(condition.value);
                currGroup.append(andOrOptions);
                $('.andorSelect').select2({
                    minimumResultsForSearch: -1
                });
            }
            else if(type=='group'){
                var newGroup=addBlankGroup(currGroup);
                var conditionsInGroup=condition.conditions;
                loadSavedGroup(newGroup,conditionsInGroup.conditions);
            }
        });

    }



    function updateQuery() {
        var condition = $('#container');
        var query = getConditionStringsFromGroup(condition);
        $('#query').text(query);
    }

    function getConditionStringsFromGroup(condition) {
        var query = '';
        condition.children('div').each(function() {

            var current = $(this);

            var isGroup = current.hasClass('group');
            var temp = '';
            if (current.hasClass('andor')){
                //find the andor select
                var andorselect = current.find('.andorSelect');
                temp = andorselect.find('option:selected').text();
            } else if (!isGroup && current.hasClass('condition')) //straight single condition
            {
                temp = getSingleConditionString(current);
            } else if (isGroup) //group recurse
            {
                temp = '(' + getConditionStringsFromGroup(current) + ')';
            }
            query = query + '  ' + temp;

        });

        return query;
    }


    function getSqlQueryFromJson(data) {
        var query='';
        var conditions=data;
        $.each(conditions,function (i,condition) {
            var temp='';
            switch(condition.type){
                case "condition":
                    temp=getSingleConditionJson(condition);
                    break;
                case "operator":
                    temp=condition.value;
                    break;
                case "group":
                    temp= '(' + getSqlQueryFromJson(condition.conditions)+ ')';
                    break;
            }

            query=query+' '+temp;
        });

        return query;
    }




    //get the condition string from condition div
    function getSingleConditionString(condition) {
        var fieldTxt = condition.find('.field').attr('value');
        var operatorTxt = "";
        var operator = condition.find('.operator');
        var right = condition.find('.right');
        var rightTxt = "";

        operatorTxt = operator.find('option:selected').text();


        if (right.is('input')) {
            rightTxt = right.val();
            switch(operatorTxt){
                case 'LIKE':
                    rightTxt='%'+rightTxt+'%';

                    break;
                case 'end with':
                    rightTxt='%'+rightTxt;
                    operatorTxt='LIKE';
                    break;
                case 'start with':
                    rightTxt=rightTxt+'%';
                    operatorTxt='LIKE';
                    break;
            }
        } else {

            var selected=right.find('option:selected');
            if(selected.length>1)//mutiSelect
            {
                var rigthtTxtArray=[];
                $.each(selected,function (i,s) {
                    rigthtTxtArray.push($(s).attr('value'));
                });
                rightTxt='('+rigthtTxtArray.join(',')+')';
                if(operatorTxt=='=')
                {
                    operatorTxt='IN';
                }else
                {
                    operatorTxt='NOT IN';
                }

            }
            else
            {
                rightTxt = right.find('option:selected').attr('value');
            }



        }

        return fieldTxt +' '+ operatorTxt +' '+ rightTxt;
    }



     function getSingleConditionJson(condition ) {
         return condition.id+' '+condition.relation+' '+condition.value;
     }
*/
});