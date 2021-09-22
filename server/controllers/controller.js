const party = [];

module.exports = {
    getParty: (req, res) => {
        res.status(200).send(party)
    },
    addChar: (req, res) => {
        const {newCharacter} = req.body;
        party.push(newCharacter);
        res.status(200).send(party);
    },
    deleteChar: (req, res) => {
        const {id} = req.params;
        const characterRemove = party.findIndex(char => char.id === +id);
        party.splice(characterRemove, 1);
        res.status(200).send(party);
    }
};