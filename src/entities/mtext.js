
import * as helpers from '../ParseHelpers'

export default function EntityParser() {}

EntityParser.ForEntityName = 'MTEXT';

EntityParser.prototype.parseEntity = function(scanner, curr) {
	console.log("-------1-begin-------")
	console.log("scanner")
	console.log(scanner)
	console.log("--------1-end------")
    var entity = { type: curr.value };
		curr = scanner.next();
    while(curr !== 'EOF') {
        if(curr.code === 0) break;

        switch(curr.code) {
            case 3:
                entity.text ? entity.text += curr.value : entity.text = curr.value;
                break;
            case 1:
                entity.text ? entity.text += curr.value : entity.text = curr.value;
                break;
            case 10:
			console.log("-------2-begin-------")
	console.log("case 10")
	console.log(scanner)
	console.log("--------2-end------")
                entity.position = helpers.parsePoint(scanner);
                break;
            case 40:
                //Note: this is the text height
                entity.height = curr.value;
                break;
            case 41:
                entity.width = curr.value;
                break;
            case 50:
                entity.rotation = curr.value;
                break;
            case 71:
                entity.attachmentPoint = curr.value;
                break;
            case 72:
                entity.drawingDirection = curr.value;
                break;
            default:
                helpers.checkCommonEntityProperties(entity, curr);
                break;
        }
        curr = scanner.next();
    }
    return entity;
};
