import type { ModuleWithLesson } from "$lib/server/courses"
import { p } from "$lib/server/prisma"
import { t } from "$lib/trpc/t"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { zfd } from "zod-form-data"

export const CreateModuleSchema = zfd.formData({
	title: zfd.text(),
	sortOrder: zfd.numeric(),
	courseId: zfd.numeric(),
})

export const modules = t.router({
	get: t.procedure
		.input(z.number())
		.query(({ input }) => p.module.findUniqueOrThrow({ where: { id: input } })),
	create: t.procedure
		.input(CreateModuleSchema)
		.mutation(({ input }) => p.module.create({ data: input })),
	delete: t.procedure
		.input(z.number())
		.mutation(({ input }) => p.module.delete({ where: { id: input } })),
})

export type ModuleRouter = typeof modules
