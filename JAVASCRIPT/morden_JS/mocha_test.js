describe("pow", function() {

  it("주어진 숫자의 n 제곱", function() {
    assert.equal(pow(2, 3), 8);
		// assert.equal(pow(3, 4), 81);
  });

	// it블록을 하나 더 추가하면 위와 같은 동작을 수행한다 / 블록을 분리해서 테스트하는 방법이 추천
	it('3을 네번 곱하면 81입니다', function() {
		assert.equal(pow(3, 4), 81);
	});

	// 수동으로 여러개의 it을 만드는 대신 for문을 사용해 자동으로 it블록을 만들어 사용할 수 있다
	function makeText(x) {
		let expected = x * x * x;
		it(`${x}을/를 세번 곱하면 ${expected}입니다`, function() {
			assert.equal(pow(x, 3), expected);
		});
	}

	for (let x=1; x<=5; x++) {
		makeText(x);
	}

	// 중첩 describe (위 pow와 같은 동작을 실행)
	describe('x를 세번 곱합니다.', function() {
		function makeText2(x) {
			let expected2 = x * x * x;
			it(`${x}을/를 세번 곱하면 ${expected2}입니다.`, function() {
				assert.equal(pow(x, 3), expected2);
			});
		}

		for (let x=1; x<=5; x++) {
			makeText2(x);
		}
	});
});

/* 대개 초기화 용도로 사용
describe('test', function() { 
	before(() => alert('테스트를 시작 - 시작 전'));
	after(() => alert('테스트 종료 - 종료 후'));

	beforeEach(() => alert('단일 테스트 시작 - 시작 전'));
	afterEach(() => alert('단일테스트 종료 - 종료 후'));

	it('test 1', () => alert(1));
	it('test 2', () => alert(2));
}); */

describe('pow', function() { // n이 조건에 맞지않을때 NaN를 반환하는지 아닌지 검사

	it('n이 음수일때 결과는 NaN입니다', function() {
		assert.isNaN(pow(2, -1));
	});

	it('n이 정수가 아닐 때 결과는 NaN입니다', function() {
		assert.isNaN(pow(2, 1.5));
	});
});

// 예제
// 아래 테스트 코드는 잘못되었다 (문법오류는 없고 테스트는 문제없이 통과함)
describe('pow_test', function() {
	it('주어진 숫자의 n 제곱', function() {
		let x = 5;
		let result = x;
		assert.equal(pow(x, 1), result);

		result *= x;
		assert.equal(pow(x, 2), result);

		result *= x;
		assert.equal(pow(x, 3), result);
	});
});

// 위 함수식은 3개지만 실행하는 동작은 하나이고 복잡하게 되어있기때문에 it구문을 분리해서 적는것이 좋다
describe('주어진 숫자의 n제곱', function() {
	it('5를 1제곱하면 5', function() {
		assert.equal(pow(5, 1), 5);
	});
	// Mocha는 아래 블록만 실행합니다.
	// it.only('5를 2제곱하면 25', function() {
	// 	assert.equal(pow(5, 2), 25);
	// });
	it('5를 3제곱하면 125', function() {
		assert.equal(pow(5, 3), 125);
	});
});

