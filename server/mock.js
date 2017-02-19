var data = [
    {
        transcript: "Google is an American multinational technology company specializing in Internet-related services and products that include online advertising technologies, search, cloud computing, software, and hardware Google was founded in 1996 by Larry Page and Sergey Brin while they were students at Stanford University, California. Together, they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a privately held company on September 4, 1998. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its new headquarters in Mountain View, California, nicknamed the Googleplex. Google was founded in 1996 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University, California. Together, they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a privately held company on September 4, 1998. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its new headquarters in Mountain View, California, nicknamed the Googleplex.",
        word_confidence: {
            length: 100
        },
        timestamps: [
            ['if', '3.84', '4.01'],
            ['if', '29.19', '29.19'],
        ]
    },
    {
        transcript: "Apple is an American multinational technology company headquartered in Cupertino, California, a suburb of San Jose, that designs, develops, and sells consumer electronics, computer software, and online services. Its hardware products include the iPhone smartphone, the iPad tablet computer, the Mac personal computer, the iPod portable media player, the Apple Watch smartwatch, and the Apple TV digital media player.",
        word_confidence: {
            length: 100
        },
        timestamps: [
            ['if', '29.19', '29.19'],
            ['if', '45.67', '45.76'],
        ]
    },
    {
        transcript: "Amazon.com (/ˈæməzɒn/ or /ˈæməzən/), also called Amazon, is an American electronic commerce and cloud computing company that was founded on July 5, 1994 by Jeff Bezos and is based in Seattle, Washington. It is the largest Internet-based retailer in the world by total sales and market capitalization.[14] Amazon.com started as an online bookstore, later diversifying to sell DVDs, Blu-rays, CDs, video downloads/streaming, MP3 downloads/streaming, audiobook downloads/streaming, software, video games, electronics, apparel, furniture, food, toys, and jewelry. ",
        word_confidence: {
            length: 100
        },
        timestamps: [
            ['if', '45.67', '45.76'],
            ['if', '65.19', '65.60'],
        ]
    },
    {
        transcript: "Intel Corporation (also known as Intel, stylized as intel) is an American multinational corporation and technology company headquartered in Santa Clara, California (colloquially referred to as 'Silicon Valley') that was founded by Gordon Moore (of Moore's law fame) and Robert Noyce. It is the world's largest and highest valued semiconductor chip makers based on revenue,[3] and is the inventor of the x86 series of microprocessors: the processors found in most personal computers (PCs). ",
        word_confidence: {
            length: 100
        },
        timestamps: [
            ['if', '65.84', '65.01'],
            ['if', '80.19', '80.19'],
        ]
    }
]

var _data = [{
    description: "A bicycle, often called a bike or cycle, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.A bicycle rider is called a cyclist, or bicyclist.Bicycles were introduced in the 19th century in Europe and as of 2003, more than 1 billion have been produced worldwide, twice as many as the number of automobiles that have been produced.",
    entity: "",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Campana_cl%C3%A1sica_de_bicicleta_%28sonido%29_02.wav",
    shortDescription: "A bicycle, often called a bike or cycle, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.",
    source: "Wikipedia",
    topic: "Bicycle"
}, {
    description: "This article is not about Gamo subsidiary BSA Guns Limited or BSA Company or its successors.↵The Birmingham Small Arms Company Limited was a major British industrial combine, a group of businesses manufacturing military and sporting firearms; bicycles; motorcycles; cars; buses and bodies; steel; iron castings; hand, power, and machine tools; coal cleaning and handling plants; sintered metals; and hard chrome process.↵",
    entity: "Thing",
    imgUrl: "",
    shortDescription: "Small arms manufacturing company",
    source: "KnowledgeGraph",
    topic: "Birmingham Small Arms Company"
},
{
    description: "A bicycle, often called a bike or cycle, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.A bicycle rider is called a cyclist, or bicyclist.Bicycles were introduced in the 19th century in Europe and as of 2003, more than 1 billion have been produced worldwide, twice as many as the number of automobiles that have been produced.",
    entity: "",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Campana_cl%C3%A1sica_de_bicicleta_%28sonido%29_02.wav",
    shortDescription: "A bicycle, often called a bike or cycle, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.",
    source: "Wikipedia",
    topic: "Bicycle"
}]

module.exports = {
    data: data,
    _data: _data
};