(module
	(func $matrix_add_f64 (param $lhs_ptr i32) (param $rhs_ptr i32) (param $length i32) (param $out_ptr i32)
		(local $i i32)
		(local $offset i32)
		(local.set $i (i32.const 0))
		(block
			(loop				
				(local.set $offset (i32.mul (local.get $i) (i32.const 8)))

				(i32.add (local.get $out_ptr) (local.get $offset)) ;;out addr on stack
				(f64.add ;;result on stack
					(f64.load (i32.add (local.get $lhs_ptr) (local.get $offset))) 
					(f64.load (i32.add (local.get $rhs_ptr) (local.get $offset))))

				(f64.store)

				(local.set $i (i32.add (local.get $i) (i32.const 1)))
				(br_if 1 (i32.eq (local.get $i) (local.get $length)))
				(br 0)
			)
		)
	)
	(func $matrix_add_simd_f64 (param $lhs_ptr i32) (param $rhs_ptr i32) (param $length i32) (param $out_ptr i32)
		(local $i i32)
		(local $offset i32)
		(local.set $i (i32.const 0))
		(block
			(loop				
				(local.set $offset (i32.mul (local.get $i) (i32.const 8))) ;;moving in 128-bit blocks

				(i32.add (local.get $out_ptr) (local.get $offset)) ;;out addr on stack

				(f64x2.add 
					(v128.load (i32.add (local.get $lhs_ptr) (local.get $offset))) 
					(v128.load (i32.add (local.get $rhs_ptr) (local.get $offset)))) ;;result on stack

				(v128.store)

				(local.set $i (i32.add (local.get $i) (i32.const 2)))
				(br_if 1 (i32.ge_u (local.get $i) (local.get $length)))
				(br 0)
			)
		)
	)
	(func $matrix_add_simd_f32 (param $lhs_ptr i32) (param $rhs_ptr i32) (param $length i32) (param $out_ptr i32)
		(local $i i32)
		(local $offset i32)
		(local.set $i (i32.const 0))
		(block
			(loop				
				(local.set $offset (i32.mul (local.get $i) (i32.const 8))) ;;moving in 128-bit blocks

				(i32.add (local.get $out_ptr) (local.get $offset)) ;;out addr on stack

				(f32x4.add 
					(v128.load (i32.add (local.get $lhs_ptr) (local.get $offset))) 
					(v128.load (i32.add (local.get $rhs_ptr) (local.get $offset)))) ;;result on stack

				(v128.store)

				(local.set $i (i32.add (local.get $i) (i32.const 2)))
				(br_if 1 (i32.ge_u (local.get $i) (local.get $length)))
				(br 0)
			)
		)
	)
	(func $matrix_add_simd_i32 (param $lhs_ptr i32) (param $rhs_ptr i32) (param $length i32) (param $out_ptr i32)
		(local $i i32)
		(local $offset i32)
		(local.set $i (i32.const 0))
		(block
			(loop				
				(local.set $offset (i32.mul (local.get $i) (i32.const 8))) ;;moving in 128-bit blocks

				(i32.add (local.get $out_ptr) (local.get $offset)) ;;out addr on stack

				(i32x4.add 
					(v128.load (i32.add (local.get $lhs_ptr) (local.get $offset))) 
					(v128.load (i32.add (local.get $rhs_ptr) (local.get $offset)))) ;;result on stack

				(v128.store)

				(local.set $i (i32.add (local.get $i) (i32.const 2)))
				(br_if 1 (i32.ge_u (local.get $i) (local.get $length)))
				(br 0)
			)
		)
	)
	(export "addMatrixF64" (func $matrix_add_f64))
	(export "addMatrixSimdF64" (func $matrix_add_simd_f64))
	(export "addMatrixSimdF32" (func $matrix_add_simd_f32))
	(export "addMatrixSimdI32" (func $matrix_add_simd_i32))
	(memory (export "memory") 24)
)