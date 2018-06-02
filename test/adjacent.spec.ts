// Test Utilities:
import { expect } from './index';

// Dependencies:
import { simpleProgram } from './fixtures';

// Under test:
import { tsquery } from '../src/index';

describe('tsquery:', () => {
    describe('tsquery - adjacent:', () => {
        it('should find any nodes that is a directly after of another node', () => {
            const ast = tsquery.ast(simpleProgram);
            const result = tsquery(ast, 'VariableStatement + ExpressionStatement');

            expect(result).to.deep.equal([
                ast.statements[2]
            ]);
        });
    });
});
