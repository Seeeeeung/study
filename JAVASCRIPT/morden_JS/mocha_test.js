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

	// 중첩 describe
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

describe('test', function() {
	before(() => alert('테스트를 시작 - 시작 전'));
	after(() => alert('테스트 종료 - 종료 후'));

	beforeEach(() => alert('단일 테스트 시작 - 시작 전'));
	afterEach(() => alert('단일테스트 종료 - 종료 후'));

	it('test 1', () => alert(1));
	it('test 2', () => alert(2));
});